"use client";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { GiSettingsKnobs } from "react-icons/gi";

export default function Home() {
  return (
    <div className="w-[60%] m-auto flex flex-row justify-around">
      <button className="buttonHome big-shadow">
        <h3 className="text-xl font-semibold">Créer une machine virtuelle</h3>
        <HiOutlineDesktopComputer className="text-[4em]" />
      </button>
      <button className="buttonHome big-shadow">
        <h3 className="text-xl font-semibold">Gérer ses machines</h3>
        <GiSettingsKnobs className="text-[4em]" />
      </button>
    </div>
  );
}
