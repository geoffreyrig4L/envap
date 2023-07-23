import pino from "pino";
import { DefaultAzureCredential } from "@azure/identity";
import { ComputeManagementClient } from "@azure/arm-compute";
import { ResourceManagementClient } from "@azure/arm-resources";
import { StorageManagementClient } from "@azure/arm-storage";
import { NetworkManagementClient } from "@azure/arm-network";
import util from "util";

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: { colorize: true },
  },
});

// * deleting vm time in ms, you can change it
//const deleteTime = 600000; // ? default: 600000 (10 minutes)
const deleteTime = 45000;

export const createAndDeleteVmFunction = async (req) => {
  const { publisher, offer, sku } = req;

  //***************** Store function output to be used elsewhere *****************//
  let randomIds = {};
  let subnetInfo = null;
  let publicIPInfo = null;
  let vmImageInfo = null;
  let nicInfo = null;

  //*********** Random number generator for service names and settings ***********//
  let resourceGroupName = _generateRandomId("resource-group", randomIds);
  let vmName = _generateRandomId("vm-name", randomIds);
  let storageAccountName = _generateRandomId("storageaccount", randomIds);
  let vnetName = _generateRandomId("vnet", randomIds);
  let subnetName = _generateRandomId("subnet", randomIds);
  let publicIPName = _generateRandomId("publicip", randomIds);
  let networkInterfaceName = _generateRandomId("networkinterface", randomIds);
  let ipConfigName = _generateRandomId("ipconfig", randomIds);
  let domainNameLabel = _generateRandomId("domain", randomIds);
  let osDiskName = _generateRandomId("osdisk", randomIds);

  //****************************** Resource configs ******************************//
  const location = "francecentral";
  const accType = "Standard_LRS";

  //****************************** Config for VM ********************************//
  const adminUsername = "EnvapAdmin";
  const adminPassword = "&z22$dnV@p";

  //*********************** Azure platform authentication ***********************//
  const clientId = process.env.AZURE_CLIENT_ID;
  const domain = process.env.AZURE_TENANT_ID;
  const secret = process.env.AZURE_CLIENT_SECRET;
  const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

  if (!clientId || !domain || !secret || !subscriptionId) {
    logger.error(
      "Azure client id, domain, secret or subscription id is missing"
    );
  }
  const credentials = new DefaultAzureCredential();

  //****************************** Azure services ******************************//
  const resourceClient = new ResourceManagementClient(
    credentials,
    subscriptionId
  );
  const computeClient = new ComputeManagementClient(
    credentials,
    subscriptionId
  );
  const storageClient = new StorageManagementClient(
    credentials,
    subscriptionId
  );
  const networkClient = new NetworkManagementClient(
    credentials,
    subscriptionId
  );

  //*************** Create resources then manage them (on/off) ******************//
  const createVm = async () => {
    try {
      await createResources();
      await manageResources();

      const deletionDate = new Date(Date.now() + deleteTime);
      logger.info("This virtual machine will be deleted: " + deletionDate);

      setTimeout(() => {
        deleteResourceGroup();
      }, deleteTime);

      logger.info("The VM is created");
      return { status: 201, message: "Your VM is created" };
    } catch (err) {
      logger.error(err);
      return { status: 500, message: "An error occured while creating the VM" };
    }
  };

  const createResources = async () => {
    let result;
    let accountInfo;
    let vnetInfo;
    let subnetInfo;
    let publicIPInfo;
    let nicInfo;
    let vmImageInfo;
    let nicResult;
    let vmInfo;
    try {
      result = await createResourceGroup();
      accountInfo = await createStorageAccount();
      vnetInfo = await createVnet();
      subnetInfo = await getSubnetInfo();
      publicIPInfo = await createPublicIP();
      nicInfo = await createNIC(subnetInfo, publicIPInfo);
      vmImageInfo = await findVMImage();
      nicResult = await getNICInfo();
      vmInfo = await createVirtualMachine(nicInfo.id, vmImageInfo[0].name);
    } catch (err) {
      logger.error(err);
      return { status: 500, message: "An error occured while creating the VM" };
    }
  };

  const createResourceGroup = async () => {
    const groupParameters = {
      location: location,
      tags: { sampletag: "sampleValue" },
    };
    logger.info("\n1.Creating resource group: " + resourceGroupName);
    return await resourceClient.resourceGroups.createOrUpdate(
      resourceGroupName,
      groupParameters
    );
  };

  const createStorageAccount = async () => {
    logger.info("\n2.Creating storage account: " + storageAccountName);
    const createParameters = {
      location: location,
      sku: {
        name: accType,
      },
      kind: "Storage",
      tags: {
        tag1: "val1",
        tag2: "val2",
      },
    };
    return await storageClient.storageAccounts.beginCreateAndWait(
      resourceGroupName,
      storageAccountName,
      createParameters
    );
  };
  const createVnet = async () => {
    const vnetParameters = {
      location: location,
      addressSpace: {
        addressPrefixes: ["10.0.0.0/16"],
      },
      dhcpOptions: {
        dnsServers: ["10.1.1.1", "10.1.2.4"],
      },
      subnets: [{ name: subnetName, addressPrefix: "10.0.0.0/24" }],
    };
    logger.info("\n3.Creating vnet: " + vnetName);
    return await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(
      resourceGroupName,
      vnetName,
      vnetParameters
    );
  };

  const getSubnetInfo = async () => {
    logger.info("\nGetting subnet info for: " + subnetName);
    return await networkClient.subnets.get(
      resourceGroupName,
      vnetName,
      subnetName
    );
  };
  const createPublicIP = async () => {
    const publicIPParameters = {
      location: location,
      publicIPAllocationMethod: "Dynamic",
      dnsSettings: {
        domainNameLabel: domainNameLabel,
      },
    };
    logger.info("\n4.Creating public IP: " + publicIPName);
    return await networkClient.publicIPAddresses.beginCreateOrUpdateAndWait(
      resourceGroupName,
      publicIPName,
      publicIPParameters
    );
  };

  const createNIC = async (subnetInfo, publicIPInfo) => {
    const nicParameters = {
      location: location,
      ipConfigurations: [
        {
          name: ipConfigName,
          privateIPAllocationMethod: "Dynamic",
          subnet: subnetInfo,
          publicIPAddress: publicIPInfo,
        },
      ],
    };
    logger.info("\n5.Creating Network Interface: " + networkInterfaceName);
    return await networkClient.networkInterfaces.beginCreateOrUpdateAndWait(
      resourceGroupName,
      networkInterfaceName,
      nicParameters
    );
  };
  const findVMImage = async () => {
    logger.info(
      util.format(
        "\nFinding a VM Image for location %s from " +
          "publisher %s with offer %s and sku %s",
        location,
        publisher,
        offer,
        sku
      )
    );
    return await computeClient.virtualMachineImages.list(
      location,
      publisher,
      offer,
      sku,
      { top: 1 }
    );
  };
  const getNICInfo = async () => {
    return await networkClient.networkInterfaces.get(
      resourceGroupName,
      networkInterfaceName
    );
  };

  const createVirtualMachine = async (nicId, vmImageVersionNumber) => {
    const vmParameters = {
      location: location,
      osProfile: {
        computerName: vmName,
        adminUsername: adminUsername,
        adminPassword: adminPassword,
      },
      hardwareProfile: {
        vmSize: "Standard_B1ls",
      },
      storageProfile: {
        imageReference: {
          publisher: publisher,
          offer: offer,
          sku: sku,
          version: vmImageVersionNumber,
        },
        osDisk: {
          name: osDiskName,
          caching: "None",
          createOption: "fromImage",
          vhd: {
            uri:
              "https://" +
              storageAccountName +
              ".blob.core.windows.net/nodejscontainer/osnodejslinux.vhd",
          },
        },
      },
      networkProfile: {
        networkInterfaces: [
          {
            id: nicId,
            primary: true,
          },
        ],
      },
    };
    logger.info("6.Creating Virtual Machine: " + vmName);
    logger.info(
      " VM create parameters: " + util.inspect(vmParameters, { depth: null })
    );
    await computeClient.virtualMachines.beginCreateOrUpdateAndWait(
      resourceGroupName,
      vmName,
      vmParameters
    );
  };

  const deleteResourceGroup = async () => {
    logger.info("\nDeleting resource group: " + resourceGroupName);
    return await resourceClient.resourceGroups.beginDeleteAndWait(
      resourceGroupName
    );
  };

  const manageResources = async () => {
    await getVirtualMachines();
    await turnOffVirtualMachines(resourceGroupName, vmName, computeClient);
    await startVirtualMachines(resourceGroupName, vmName);
  };
  const getVirtualMachines = async () => {
    logger.info(`Get VM Info about ${vmName}`);
    return await computeClient.virtualMachines.get(resourceGroupName, vmName);
  };
  const turnOffVirtualMachines = async () => {
    logger.info(`Turn off the VM ${vmName}`);
    return await computeClient.virtualMachines.beginDeallocate(
      resourceGroupName,
      vmName
    );
  };
  const startVirtualMachines = async () => {
    logger.info(`Start the VM ${vmName}`);
    return await computeClient.virtualMachines.beginStart(
      resourceGroupName,
      vmName
    );
  };

  function _generateRandomId(prefix, existIds) {
    let newNumber;
    while (true) {
      newNumber = prefix + Math.floor(Math.random() * 10000);
      if (!existIds || !(newNumber in existIds)) {
        break;
      }
    }
    return newNumber;
  }

  return new Promise(async (resolve) => {
    const result = await createVm();
    resolve(result);
  });
};

const getAllIPAddress = async (
  computeClient,
  resourceGroupName,
  vmName,
  networkClient
) => {
  try {
    const vm = await computeClient.virtualMachines.get(
      resourceGroupName,
      vmName
    );
    const networkInterfaces = vm.networkProfile.networkInterfaces;

    if (networkInterfaces.length > 0) {
      const primaryNIC = networkInterfaces.find((nic) => nic.primary);
      if (primaryNIC) {
        const nic = await networkClient.networkInterfaces.get(
          resourceGroupName,
          getNicName(primaryNIC.id)
        );
        if (nic && nic.ipConfigurations.length > 0) {
          const ipConfig = nic.ipConfigurations[0];
          if (ipConfig.publicIPAddress && ipConfig.publicIPAddress.id) {
            const publicIP = await networkClient.publicIPAddresses.get(
              resourceGroupName,
              getPublicIpName(ipConfig.publicIPAddress.id)
            );
            if (publicIP && publicIP.ipAddress) {
              return publicIP.ipAddress;
            }

            logger.info("No IP address found for the VM's public IP.");
            return "noIpFound";
          }

          logger.info(
            "No public IP address associated with the VM's primary network interface."
          );
        } else {
          logger.info(
            "No IP configurations found for the VM's primary network interface."
          );
        }
      } else {
        logger.info("No primary network interface found for the VM.");
      }
    }
    logger.info("No network interfaces found for the VM.");
  } catch (error) {
    logger.error(
      "An error occurred while retrieving the VM IP address:",
      error
    );
  }
};

const getNicName = (nicId) => {
  // Extract the NIC name from its resource ID
  const parts = nicId.split("/");
  return parts[parts.length - 1];
};

const getPublicIpName = (publicIpId) => {
  // Extract the public IP name from its resource ID
  const parts = publicIpId.split("/");
  return parts[parts.length - 1];
};

export const getVirtualMachines = async () => {
  const clientId = process.env["AZURE_CLIENT_ID"];
  const domain = process.env["AZURE_TENANT_ID"];
  const secret = process.env["AZURE_CLIENT_SECRET"];
  const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];
  let VMlist = [];

  if (!clientId || !domain || !secret || !subscriptionId) {
    logger.error("Default credentials couldn't be found");

    return { status: 400, error: "Default credentials couldn't be found" };
  }

  const credentials = new DefaultAzureCredential();
  const computeClient = new ComputeManagementClient(
    credentials,
    subscriptionId
  );
  const networkClient = new NetworkManagementClient(
    credentials,
    subscriptionId
  );

  const dataVmList = [];
  for await (const vm of computeClient.virtualMachines.listAll()) {
    dataVmList.push(vm);
  }

  const promises = dataVmList.map(async (vm) => {
    const resourceGroup = vm.id.split("/")[4].toLowerCase();

    const IPAddress = await getAllIPAddress(
      computeClient,
      resourceGroup,
      vm.name,
      networkClient
    );

    return {
      ip: IPAddress,
      username: "AdminSudo",
      password: "SudoMDP1993!",
      os: vm.storageProfile.osDisk.osType,
    };
  });

  VMlist = await Promise.all(promises);

  return { status: 200, data: VMlist };
};
