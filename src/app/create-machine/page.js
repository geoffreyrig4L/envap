"use client";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import SessionContext from "../context/session";
import {
  displayMessageWhenButtonClick,
  disableCreateButton,
} from "../utils/functionsCreateMachine";

export default function CreateMachinePage() {
  const { user } = useContext(SessionContext);
  const router = useRouter();

  useEffect(() => {
    if (user.tokens < 1000) {
      disableCreateButton();
      const requirementParagraph = document.getElementById("requirement");
      requirementParagraph.classList.add("text-red-500");
    }
  }, [user]);

  async function handleClick() {
    disableCreateButton();
    await Promise.all([
      displayMessageWhenButtonClick("loading"),
      displayMessageWhenButtonClick("spendNotification"),
    ]);
    router.push("/create-machine/start-creation");
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center w-full mb-[40px]">
        <h1 className="title">Créer une machine</h1>
        <Link href="/manage-machines">
          <div className="flex flex-row justify-between items-center button enabled p-4 w-[120%] shadow text-center">
            <p>Gérer</p>
            <BsArrowRightShort className="text-2xl" />
          </div>
        </Link>
      </div>
      <p>
        Ici, vous pouvez créer une machine virtuelle avec <b>Azure</b>.
      </p>
      <p id="requirement">
        L&apos;opération requiert <b>1000 jetons</b>.
      </p>

      <div className="flex flex-row items-center relative w-[150px]">
        <button
          id="createButton"
          onClick={handleClick}
          className="button enabled my-7 p-2 w-full shadow"
        >
          Créer
        </button>
        <p
          id="spendNotification"
          className="transition-opacity duration-[500ms] font-bold text-red-600 absolute hide right-[-125px] not-selectable"
        >
          -1000 jetons
        </p>
      </div>
      <span
        id="loading"
        className="loading loading-dots loading-lg hide transition-opacity duration-[500ms]"
      ></span>
    </div>
  );
}
