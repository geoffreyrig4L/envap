"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineDesktopComputer } from "react-icons/hi";

const VirtualMachinesDisplayer = () => {
  const [virtualMachines, setVirtualMachines] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get-virtual-machines")
      .then((res) => {
        setVirtualMachines(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div>
      {virtualMachines.length !== 0 ? (
        <div>
          <p className="flex flex-row items-center mb-[3vh]">
            <HiOutlineDesktopComputer className="text-2xl mr-[5px]" />
            {virtualMachines.length}
          </p>
          <div className="flex flex-row overflow-x-auto w-full scroller scroller-thumb pb-[5vh]">
            {virtualMachines.map((vm) => (
              <div
                className="p-8 rounded-xl xs-shadow bg-slate-50 mr-[3vw]"
                key={vm.username}
              >
                <p>
                  <span className="opacity-60 text-gray-500">Nom : </span>
                  {vm.username}
                </p>
                <p>
                  <span className="opacity-60 text-gray-500">
                    Adresse IP :{" "}
                  </span>
                  {vm.ip}
                </p>
                <p>
                  <span className="opacity-60 text-gray-500">
                    Mot de passe :{" "}
                  </span>
                  {vm.password}
                </p>
                <p>
                  <span className="opacity-60 text-gray-500">
                    Système d'exploitation :{" "}
                  </span>
                  {vm.os}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Vous n'avez pas de machines virtuelles.</p>
      )}
    </div>
  );
};

export default VirtualMachinesDisplayer;
