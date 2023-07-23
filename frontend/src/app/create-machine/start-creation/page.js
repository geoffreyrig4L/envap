"use client";
import {
  displayMessageWhenButtonClick,
  disableButton,
} from "@/app/utils/functionsCreateMachine";
import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import SessionContext from "@/app/context/session";

export default function StartCreationPage() {
  const { setUser } = useContext(SessionContext);
  const [env, setEnv] = useState(undefined);
  const router = useRouter();

  async function handleClick() {
    disableButton("createButton");
    const detailsElement = document.getElementById("detailsCreation");
    detailsElement.classList.remove("hide");
    await Promise.all([
      displayMessageWhenButtonClick("spendNotification"),
      createVirtualMachine(env),
    ]);
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
    setEnv(event.currentTarget.value);
  };

  const createVirtualMachine = async (env) => {
    let data = {};
    switch (env) {
      case "Ubuntu":
        data = {
          publisher: "Canonical",
          offer: "UbuntuServer",
          sku: "18.04-LTS",
        };
        break;
      case "CentOS":
        data = {
          publisher: "OpenLogic",
          offer: "CentOS",
          sku: "7.5",
        };
        break;
      case "Debian":
        data = {
          publisher: "Debian",
          offer: "debian-10",
          sku: "10",
        };
        break;
      default:
        break;
    }
    setUser((previousState) => {
      return {
        ...previousState,
        tokens: previousState.tokens - 1000,
      };
    });
    await axios
      .post("http://localhost:3001/create", data)
      .then((res) => {
        console.log(res);
        router.push("../manage-machines");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div>
      <h1 className="mb-[1vh]">Création d&apos;une machine virtuelle</h1>
      <h1 className="title">Selectionner une environnement</h1>
      <div className="ml-6 w-[22vw]">
        <ul className="w-full bg-white shadow rounded-xl p-3">
          <li className="flex flex-row justify-around items-center w-full py-[2vh]">
            <label className="w-[40%]" htmlFor="Ubuntu">
              Ubuntu
            </label>
            <input
              type="radio"
              onChange={radioHandler}
              className="z-50"
              name="env"
              value="Ubuntu"
              id="Ubuntu"
            />
          </li>
          <li className="flex flex-row justify-around items-center w-full py-[2vh]">
            <label className="w-[40%]" htmlFor="CentOS">
              CentOS
            </label>
            <input
              type="radio"
              onChange={radioHandler}
              className="z-50"
              name="env"
              value="CentOS"
              id="CentOS"
            />
          </li>
          <li className="flex flex-row justify-around items-center w-full py-[2vh]">
            <label className="w-[40%]" htmlFor="Debian">
              Debian
            </label>
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
            className="button enabled my-7 p-[2vh] w-full shadow"
          >
            Créer
          </button>
          <p
            id="spendNotification"
            className="transition-opacity duration-[500ms] font-bold text-red-600 absolute hide right-[-8vw] not-selectable"
          >
            -1000 jetons
          </p>
        </div>
      </div>
      <div
        id="detailsCreation"
        className="flex flex-col items-center absolute left-[50%] top-[50%] bg-slate-100 py-4 px-12 shadow rounded-lg hide"
      >
        <span
          id="loadingCreation"
          className="loading loading-dots loading-lg transition-opacity duration-[500ms]"
        ></span>
        <p className="font-semibold text-gray-600">Création de la machine</p>
      </div>
    </div>
  );
}
