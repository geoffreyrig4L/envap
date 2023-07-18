"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { GiSettingsKnobs } from "react-icons/gi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import SessionContext from "./context/session";

export default function Home() {
  const { user } = useContext(SessionContext);
  const router = useRouter();

  useEffect(() => {
    const buttons = document.getElementsByClassName("buttonHome");
    if (Object.keys(user).length !== 0) {
      Array.from(buttons).forEach((button) => {
        button.classList.remove("disabled");
        button.classList.add("enabled");
        button.removeAttribute("disabled");
      });
    } else {
      Array.from(buttons).forEach((button) => {
        button.setAttribute("disabled", "");
      });
    }
  }, [user]);

  return (
    <div className="w-[60%] m-auto flex flex-row justify-around pt-12">
      <button
        onClick={() => {
          router.push("./create-machine");
        }}
        className="buttonHome disabled big-shadow"
      >
        <h3 className="text-xl font-semibold">Créer une machine virtuelle</h3>
        <HiOutlineDesktopComputer className="text-[4em]" />
      </button>
      <button
        onClick={() => {
          router.push("./manage-machines");
        }}
        className="buttonHome disabled big-shadow"
      >
        <h3 className="text-xl font-semibold">Gérer ses machines</h3>
        <GiSettingsKnobs className="text-[4em]" />
      </button>
    </div>
  );
}
