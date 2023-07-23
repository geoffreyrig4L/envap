"use client";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import SessionContext from "../context/session";
import VirtualMachinesDisplayer from "@/components/VirtualMachineDisplayer";

export default function ManageMachinesPage() {
  const { user } = useContext(SessionContext);
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      router.push("/");
    }
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-full">
        <h1 className="title">Vos machines virtuelles</h1>
        <Link href="/create-machine">
          <div className="flex flex-row justify-between items-center button enabled p-4 w-[120%] shadow text-center">
            <p>Créer</p>
            <BsArrowRightShort className="text-2xl" />
          </div>
        </Link>
      </div>
      <VirtualMachinesDisplayer />
    </div>
  );
}
