"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import SessionContext from "./context/session";
import { useContext, useEffect } from "react";

export default function Home() {
  const { user } = useContext(SessionContext);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      const buttons = document.getElementsByClassName("buttonHome");
      Array.from(buttons).forEach((button) => {
        button.classList.remove("enabled");
        button.classList.add("disabled");
        button.setAttribute("disabled", "");
      });
    }
  }, [user]);

  return (
    <div className="w-[60%] m-auto flex flex-row justify-around">
      <button className="buttonHome enabled big-shadow">
        <h3 className="text-xl font-semibold">Créer une machine virtuelle</h3>
        <HiOutlineDesktopComputer className="text-[4em]" />
      </button>
      <button className="buttonHome enabled big-shadow">
        <h3 className="text-xl font-semibold">Gérer ses machines</h3>
        <GiSettingsKnobs className="text-[4em]" />
      </button>
    </div>
  );
}
