"use client";

import SessionContext from "@/app/context/session";
import Link from "next/link";
import { useContext } from "react";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../../public/logo_with_text.png";

const Navbar = () => {
  const { user, setUser } = useContext(SessionContext);
  const router = useRouter();

  return (
    <div>
      <ul className="flex flex-row w-full justify-between items-center py-6 px-24 bg-white">
        <li>
          <Link href={"/"} className="font-bold text-3xl text-[#40E0D0]">
            <Image
              src={logo}
              className="w-full h-[8vh] max-h-[70px]"
              alt="logo"
            />
          </Link>
        </li>
        <li>
          {Object.keys(user).length === 0 ? (
            <Link
              className="flex flex-row justify-around items-center shadow button enabled p-[2vh] hover:text-[#40E0D0]"
              href="/sign-in"
            >
              <p className="italic mr-[2vw]">
                Connectez-vous pour créer des machines
              </p>
              <BiLogInCircle title="Se connecter" className="text-2xl" />
            </Link>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row justify-around">
                <p className="mr-[4vw]">
                  <b>username</b> : {user.username}
                </p>
                <p className="mr-[4vw]">
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
