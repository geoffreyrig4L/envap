"use client";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import SessionContext from "../context/session";
import { displayMessageWhenButtonClick } from "../utils/functionsCreateMachine";

export default function CreateMachinePage() {
  const { user, setUser } = useContext(SessionContext);
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
          <div className="flex flex-row justify-between items-center button p-4 w-[120%] shadow text-center">
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

      <button
        onClick={() => {
          setUser((previousState) => {
            return {
              ...previousState,
              tokens: previousState.tokens - 1000,
            };
          });
          displayMessageWhenButtonClick("spendNotification");
        }}
        className="button my-7 p-2 w-[150px] shadow relative"
      >
        <p
          id="spendNotification"
          className="transition-opacity duration-[500ms] font-bold text-red-600 absolute hide right-[-125px]"
        >
          -1000 jetons
        </p>
        Créer
      </button>
    </div>
  );
}
