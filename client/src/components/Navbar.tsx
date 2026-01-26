// src/components/Navbar.tsx

import { Link, useLocation } from "react-router-dom";
import { useState} from "react";
import type { ReactNode } from "react";

import { ChevronDown, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const token: string | null = localStorage.getItem("token");
  const role: string | null = localStorage.getItem("role");
  const location = useLocation();

  const [open, setOpen] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  if (location.pathname.startsWith("/admin") || role === "admin") return null;

  const NavLinks: ReactNode = (
    <>
      <li>
        <Link to="/" className="relative group transition duration-200">
          Home
          <span className="absolute left-0 -bottom-0.75 w-0 h-0.5 bg-[#00FF7C] transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </li>
      <li>
        <Link to="/knowledge" className="relative group transition duration-200">
          Knowledge
          <span className="absolute left-0 -bottom-0.75 w-0 h-0.5 bg-[#00FF7C] transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </li>
      <li>
        <Link to="/roadmap" className="relative group transition duration-200">
          Roadmaps
          <span className="absolute left-0 -bottom-0.75 w-0 h-0.5 bg-[#00FF7C] transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </li>
      <li>
        <Link to="/calculators" className="relative group transition duration-200">
          Calculators
          <span className="absolute left-0 -bottom-0.75 w-0 h-0.5 bg-[#00FF7C] transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </li>
      <li>
        <Link to="/about" className="relative group transition duration-200">
          About
          <span className="absolute left-0 -bottom-0.75 w-0 h-0.5 bg-[#00FF7C] transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </li>
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 border-b border-[#C6A969]/20 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3 md:py-4">
        <Link to="/" className="text-2xl font-bold tracking-tight text-[#00FF7C]">
          Fynsd
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-[#171614]">
          {NavLinks}

          {token && role === "user" ? (
            <li className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-[#09332C] font-semibold rounded-2xl hover:bg-white/30 shadow-md transition-all duration-300"
              >
                Profile <ChevronDown size={16} />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl backdrop-blur-xl bg-white/40 border border-white/30 shadow-lg overflow-hidden animate-fadeIn">
                  <Link
                    to="/user/profile"
                    className="block px-4 py-2 text-sm text-[#171614] hover:bg-[#00FF7C]/20 transition"
                    onClick={() => setOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/user/activity"
                    className="block px-4 py-2 text-sm text-[#171614] hover:bg-[#00FF7C]/20 transition"
                    onClick={() => setOpen(false)}
                  >
                    My Activity
                  </Link>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link
                  to="/user/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-[#171614] bg-[#FFB703] shadow hover:shadow-md hover:scale-105 transition-all duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/user/signup"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-[#171614] bg-[#E9DCC9] shadow hover:shadow-md hover:scale-105 transition-all duration-300"
                >
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>

        <button
          className="md:hidden text-[#171614]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-lg border-t border-[#C6A969]/20 shadow-md">
          <ul className="flex flex-col gap-4 px-6 py-6 text-sm font-medium text-[#171614]">
            {NavLinks}

            {token && role === "user" ? (
              <>
                <li>
                  <Link
                    to="/user/profile"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 rounded-lg hover:bg-[#00FF7C]/20 transition"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/activity"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 rounded-lg hover:bg-[#00FF7C]/20 transition"
                  >
                    My Activity
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/user/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 rounded-lg font-semibold text-[#171614] bg-[#FFB703] shadow hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/user/signup"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 rounded-lg font-semibold text-[#171614] bg-[#E9DCC9] shadow hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
