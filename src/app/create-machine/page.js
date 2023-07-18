"use client";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import SessionContext from "../context/session";

export default function CreateMachinePage() {
  const { user } = useContext(SessionContext);
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      router.push("/");
    }
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-full mb-[40px]">
        <h1 className="title">Créer une machine</h1>
        <Link href="/manage-machines">
          <div className="flex flex-row justify-between items-center button p-4 w-[120%] shadow text-center font-semibold">
            <p>Gérer</p>
            <BsArrowRightShort className="text-2xl" />
          </div>
        </Link>
      </div>
      <p>
        Ici, vous pouvez créer une machine virtuelle avec <b>Azure</b>.
      </p>
      <p>
        L&apos;opération requiert <b>1000 jetons</b>.
      </p>
    </div>
  );
}