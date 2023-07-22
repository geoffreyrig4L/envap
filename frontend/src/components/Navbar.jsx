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
            <Image src={logo} width={120} height={120} alt="logo" />
          </Link>
        </li>
        <li>
          {Object.keys(user).length === 0 ? (
            <Link
              className="flex flex-row justify-around items-center shadow button enabled p-2 hover:text-[#40E0D0] w-[400px]"
              href="/sign-in"
            >
              <p className="italic">Connectez-vous pour créer des machines</p>
              <BiLogInCircle title="Se connecter" className="text-2xl" />
            </Link>
          ) : (
            <div className="flex flex-row justify-between items-center">
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
