"use client";

import Link from "next/link";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import SessionContext from "@/app/context/session";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, setUser } = useContext(SessionContext);

  const router = useRouter();

  return (
    <div>
      <ul className="flex flex-row w-full justify-between items-center p-12 bg-white">
        <li>
          <Link href={"/"} className="font-bold text-3xl text-[#40E0D0]">
            Envap
          </Link>
        </li>
        <li className="flex flex-row justify-between">
          {Object.keys(user).length === 0 ? (
            <div className="flex flex-row">
              <p className="font-semibold italic text-lg mr-[50px] text-[#cd6155]/80">
                Connectez-vous pour créer des machines
              </p>
              <button
                onClick={() => {
                  router.push("./signIn");
                }}
              >
                <BiLogInCircle
                  title="Se connecter"
                  className="text-3xl hover:text-[#40E0D0] transition-all duration-300"
                />
              </button>
            </div>
          ) : (
            <div className="flex flex-row">
              <div className="flex flex-row w-[300px] justify-around">
                <p>
                  <b>username</b> : {user.username}
                </p>
                <p>
                  {user.tokens} <b>jetons</b>
                </p>
              </div>
              <button
                onClick={() => {
                  setUser({});
                }}
              >
                <BiLogOutCircle
                  title="Se déconnecter"
                  className="text-3xl hover:text-red-500 transition-all duration-300"
                />
              </button>
            </div>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
