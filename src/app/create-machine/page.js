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

  useEffect(() => {
    if (user.tokens < 1000) {
      const createButton = document.getElementById("createButton");
      createButton.setAttribute("disabled", "");
      createButton.classList.add("disabled");
      createButton.classList.remove("enabled");
      const requirementParagraph = document.getElementById("requirement");
      requirementParagraph.classList.add("text-red-500");
    }
  }, [user]);

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
          onClick={() => {
            setUser((previousState) => {
              return {
                ...previousState,
                tokens: previousState.tokens - 1000,
              };
            });
            displayMessageWhenButtonClick("spendNotification");
          }}
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
    </div>
  );
}
