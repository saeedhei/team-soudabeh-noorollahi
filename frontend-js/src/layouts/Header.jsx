import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/verbpro-logo-cyan.png";

import { FaHome, FaBookOpen } from "react-icons/fa";

function Header() {
  const location = useLocation();

  return (
    <header className="bg-gradient-to-b from-gray-100 to-white border-t backdrop-blur-md shadow-sm sticky top-0 z-30 w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="VerbPro C1 Logo"
            className="h-12 sm:h-16 w-auto object-contain"
          />
        </Link>

        {/* Nav Links */}
        <nav className="flex space-x-6 sm:space-x-8 items-center">
          {location.pathname === "/" && (
            <Link
              to="/cards"
              className="text-sm sm:text-base font-medium text-cyan-700 hover:text-cyan-800 transition flex items-center"
            >
              <FaBookOpen className="mr-2 text-lg sm:text-xl" />
              Cards
            </Link>
          )}
          {location.pathname === "/cards" && (
            <Link
              to="/"
              className="text-sm sm:text-base font-medium text-cyan-700 hover:text-cyan-800 transition flex items-center"
            >
              <FaHome className="mr-2 text-lg sm:text-xl" />
              Home
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
