import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header({ userType, setUserType }) {
  const navigate = useNavigate();
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-green-600 px-3 py-2 rounded text-white"
      : "px-3 py-2 rounded text-white hover:bg-green-600";

  return (
    <header className="bg-green-800 text-white">
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
          <div className="hidden md:flex items-center bg-green-700 px-3 py-2 rounded">
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
            className="bg-green-700 border border-green-600 px-3 py-2 rounded"
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
            <option value="logistics">Logistics</option>
          </select>

          <button
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </div>
      </div>

      <nav className="bg-green-700">
        <div className="container mx-auto px-4">
          <ul className="flex flex-wrap space-x-6 py-3">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <a href="/#features" className="px-3 py-2 rounded text-white hover:bg-green-600">
                Services
              </a>
            </li>
            <li>
              <NavLink to="/local-resources" className={navLinkClass}>
                Resources
              </NavLink>
            </li>
            <li>
              <a href="/#schemes" className="px-3 py-2 rounded text-white hover:bg-green-600">
                Govt Schemes
              </a>
            </li>
            <li>
              <a href="/#market" className="px-3 py-2 rounded text-white hover:bg-green-600">
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
