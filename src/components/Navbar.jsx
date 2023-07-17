import { BiLogInCircle } from "react-icons/bi";

const Navbar = () => {
  return (
    <div>
      <ul className="flex flex-row w-full justify-between p-12 bg-white">
        <li>
          <h1 className="font-bold text-3xl text-[#40E0D0]">Envap</h1>
        </li>
        <li className="flex flex-row w-36 justify-between">
          <p className="font-semibold italic">jetons</p>
          <button>
            <BiLogInCircle className="text-3xl hover:text-blue-400 transition-all duration-300" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
