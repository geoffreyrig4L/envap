"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const VirtualMachinesDisplayer = () => {
  const [virtualMachines, setVirtualMachines] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get-virtual-machines")
      .then((res) => {
        setVirtualMachines(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 className="mb-[4vh] font-semibold">Vos machines :</h1>
      <div className="flex flex-row overflow-x-auto">
        {virtualMachines.map((vm) => {
          <div>
            <h1>
              Nom : <b>{vm.username}</b>
            </h1>
          </div>;
        })}
      </div>
    </div>
  );
};

export default VirtualMachinesDisplayer;
