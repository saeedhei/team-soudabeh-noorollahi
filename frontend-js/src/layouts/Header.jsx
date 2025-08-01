import { Link } from "react-router-dom";
import { FaHome, FaBookOpen } from "react-icons/fa";

function Header() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center z-10">
      <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
        VerbPro C1
      </h1>
      <div className="space-x-6 flex items-center">
        <Link
          to="/"
          className="text-lg font-medium text-gray-600 hover:text-indigo-700 transition duration-300 ease-in-out flex items-center"
        >
          <FaHome className="mr-2 text-xl" /> Home
        </Link>
        <Link
          to="/cards"
          className="text-lg font-medium text-gray-600 hover:text-indigo-700 transition duration-300 ease-in-out flex items-center"
        >
          <FaBookOpen className="mr-2 text-xl" /> Cards
        </Link>
      </div>
    </nav>
  );
}

export default Header;
