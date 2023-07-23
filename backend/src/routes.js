import { createAndDeleteVmFunction, getVirtualMachines } from "./azureVm.js";

const route = ({ app }) => {
  app.get("/get-virtual-machines", async (req, res) => {
    try {
      const virtualMachines = await getVirtualMachines();
      if (virtualMachines.status !== 200) {
        return res.status(virtualMachines.status).send(virtualMachines.error);
      }

      res.status(200).send(virtualMachines.data);
    } catch (err) {
      logger.error(err);
      return res.status(500).send("Internal server error");
    }
  });

  app.post("/create", async (req, res) => {
    try {
      createAndDeleteVmFunction(req.body)
        .then((result) => {
          console.log("result", result);
          return res.status(result.status).send(result.message || result.error);
        })
        .catch((err) => {
          logger.error(err);
          return res.status(400).send("An error occured");
        });
    } catch (err) {
      return res.status(500).send("Internal server error");
    }
  });
};

export default route;
