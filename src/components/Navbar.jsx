"use client";

import SessionContext from "@/app/context/session";
import Link from "next/link";
import { useContext } from "react";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
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
        <li>
          {Object.keys(user).length === 0 ? (
            <Link
              className="flex flex-row justify-around items-center shadow button p-2 hover:text-[#40E0D0] w-[500px]"
              href="/sign-in"
            >
              <p className="italic text-lg">
                Connectez-vous pour créer des machines
              </p>
              <BiLogInCircle title="Se connecter" className="text-3xl" />
            </Link>
          ) : (
            <div className="flex flex-row justify-between">
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
                  router.push("/");
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
