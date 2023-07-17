import Link from "next/link";
import { BiLogInCircle } from "react-icons/bi";

const Navbar = () => {
  return (
    <div>
      <ul className="flex flex-row w-full justify-between items-center p-12 bg-white">
        <li>
          <Link href={"/"} className="font-bold text-3xl text-[#40E0D0]">
            Envap
          </Link>
        </li>
        <li className="flex flex-row w-36 justify-between">
          <p className="font-semibold italic">jetons</p>
          <Link href="./signIn">
            <BiLogInCircle
              title="Se connecter"
              className="text-3xl hover:text-[#40E0D0] transition-all duration-300"
            />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
