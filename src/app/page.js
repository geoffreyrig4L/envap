"use client";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { GiSettingsKnobs } from "react-icons/gi";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="p-24">
        <div className="w-[60%] m-auto flex flex-row justify-around">
          <button className="buttonHome big-shadow">
            <h3 className="text-xl font-semibold">
              Créer une machine virtuelle
            </h3>
            <HiOutlineDesktopComputer className="text-[4em] font-extralight" />
          </button>
          <button className="buttonHome big-shadow">
            <h3 className="text-xl font-semibold">Gérer ses machines</h3>
            <GiSettingsKnobs className="text-[4em] font-extralight" />
          </button>
        </div>
      </div>
    </div>
  );
}
