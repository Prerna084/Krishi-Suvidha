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
              <NavLink to="/market-prices" className={navLinkClass}>
                Market Prices
              </NavLink>
            </li>
            <li>
              <NavLink to="/alerts" className={navLinkClass}>
                Alerts
              </NavLink>
            </li>
            <li>
              <NavLink to="/quality-monitoring" className={navLinkClass}>
                Quality
              </NavLink>
            </li>
            <li>
              <NavLink to="/livestock" className={navLinkClass}>
                Livestock
              </NavLink>
            </li>
            <li>
              <NavLink to="/vermicompost" className={navLinkClass}>
                Vermicompost
              </NavLink>
            </li>
            <li>
              <NavLink to="/drone-services" className={navLinkClass}>
                Drones
              </NavLink>
            </li>
            <li>
              <NavLink to="/transport" className={navLinkClass}>
                Transport
              </NavLink>
            </li>
            <li>
              <NavLink to="/cold-storage" className={navLinkClass}>
                Cold Storage
              </NavLink>
            </li>
            <li>
              <NavLink to="/demonstrations" className={navLinkClass}>
                Modern Tech
              </NavLink>
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
