import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header({ userType, setUserType }) {
  const navigate = useNavigate();
  const navLinkClass = ({ isActive }) =>
    (isActive
      ? "bg-white/15 text-white"
      : "text-white/90 hover:text-white hover:bg-white/10") +
    " px-3 py-2 rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40";

  return (
    <header className="sticky-header bg-green-800/95 supports-[backdrop-filter]:bg-green-800/80 backdrop-blur text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/37f07e2c-1ecf-4817-9739-042f02fdfb82.png"
            alt="Punjab Government Logo"
            className="h-12 w-12 mr-3"
          />
          <div>
            <h1 className="text-xl font-bold">Punjab Krishi Portal</h1>
            <p className="text-sm">Empowering Farmers with Technology</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-white/10 px-3 py-2 rounded-md border border-white/10 text-white/90">
            <span>ਪੰਜਾਬੀ</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="bg-white/10 border-0 px-3 py-2 rounded-md text-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="logistics">Logistics</option>
          </select>

          <button
            className="bg-white text-green-800 hover:bg-green-50 px-4 py-2 rounded-md font-semibold shadow-sm transition-colors"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </div>
      </div>

      <nav className="bg-green-700/90 border-t border-white/10">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-2 md:gap-4 py-3 min-w-max">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <a href="/#features" className="px-3 py-2 rounded-md text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                Services
              </a>
            </li>
            <li>
              <NavLink to="/local-resources" className={navLinkClass}>
                Resources
              </NavLink>
            </li>
            <li>
              <a href="/#schemes" className="px-3 py-2 rounded-md text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                Govt Schemes
              </a>
            </li>
            <li>
              <a href="/#market" className="px-3 py-2 rounded-md text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40">
                Market Prices
              </a>
            </li>
            <li>
              <NavLink to="/local-resources" className={navLinkClass}>
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
