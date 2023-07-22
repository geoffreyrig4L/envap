"use client";
import {
  displayMessageWhenButtonClick,
  disableButton,
} from "@/app/utils/functionsCreateMachine";
import { useEffect, useState } from "react";

export default function StartCreationPage() {
  const [env, setEnv] = useState(undefined);

  async function handleClick() {
    disableButton("createButton");
    await Promise.all([
      displayMessageWhenButtonClick("loadingCreation"),
      displayMessageWhenButtonClick("spendNotification"),
    ]);
    //router.push("/create-machine/start-creation");
  }

  useEffect(() => {
    if (env === undefined) {
      disableButton("createButton");
    } else {
      const createButton = document.getElementById("createButton");
      createButton.classList.remove("disabled");
      createButton.classList.add("enabled");
      createButton.removeAttribute("disabled");
    }
  }, [env]);

  const radioHandler = (event) => {
    console.log(event.currentTarget.value);
    setEnv(event.currentTarget.value);
  };

  return (
    <div>
      <h1 className="mb-[15px]">Création d&apos;une machine virtuelle</h1>
      <h1 className="title mb-[40px]">Selectionner une environnement</h1>
      <div className="ml-6 w-56">
        <ul className="w-full bg-white shadow p-4 rounded-sm">
          <li className="flex flex-row justify-around items-center w-full">
            <label for="Ubuntu">Ubuntu</label>
            <input
              type="radio"
              onChange={radioHandler}
              className="z-50"
              name="env"
              value="Ubuntu"
              id="Ubuntu"
            />
          </li>
          <li className="flex flex-row justify-around items-center w-full">
            <label for="CentOS">CentOS</label>
            <input
              type="radio"
              onChange={radioHandler}
              className="z-50"
              name="env"
              value="CentOS"
              id="CentOS"
            />
          </li>
          <li className="flex flex-row justify-around items-center w-full">
            <label for="Debian">Debian</label>
            <input
              type="radio"
              onChange={radioHandler}
              className="z-50"
              name="env"
              value="Debian"
              id="Debian"
            />
          </li>
        </ul>
        <div className="flex flex-row items-center relative w-[70%]">
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
          id="loadingCreation"
          className="loading loading-dots loading-lg hide transition-opacity duration-[500ms]"
        ></span>
      </div>
    </div>
  );
}
