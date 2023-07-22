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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 className="mb-[15px] font-semibold">Vos machines :</h1>
      <div className="flex flex-row overflow-x-auto">
        {virtualMachines.map((vm) => {
          <h1>{vm}</h1>;
        })}
      </div>
    </div>
  );
};

export default VirtualMachinesDisplayer;
