import { Link } from "next/link";
import { Image } from "next/image";

const Navbar = () => {
  return (
    <ul className="flex flex-row justify-between items-center px-4">
      <Image src="/logo.jpg" alt="logo" width={50} height={50} />
      <li className="flex flex-row w-[200px] justify-between">
        <Link href={"/signIn"}>
          <button className="buttonNavbar">Sign in</button>
        </Link>
      </li>
    </ul>
  );
};

export default Navbar;
