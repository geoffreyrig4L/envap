"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import SessionContext from "../context/session";
import {
  disableButton,
  displayMessageWhenButtonClick,
} from "../utils/functionsCreateMachine";

export default function CreateMachinePage() {
  const { user } = useContext(SessionContext);
  const router = useRouter();

  useEffect(() => {
    if (user.tokens < 1000) {
      disableButton("startButton");
      const requirementParagraph = document.getElementById("requirement");
      requirementParagraph.classList.add("text-red-500");
    }
  }, [user]);

  async function handleClick() {
    disableButton("startButton");
    await displayMessageWhenButtonClick("loadingStart");
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
      <div className="flex flex-col relative">
        <button
          id="startButton"
          onClick={handleClick}
          className="button enabled my-7 p-2 w-[250px] shadow"
        >
          Débuter la création
        </button>
        <span
          id="loadingStart"
          className="loading loading-dots loading-lg hide transition-opacity duration-[500ms]"
        ></span>
      </div>
    </div>
  );
}
