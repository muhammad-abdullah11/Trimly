"use client";

import { useState } from "react";
import { FaCross } from "react-icons/fa";
import { IoReorderThreeSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <h1 className="text-emerald-600 text-3xl font-bold font-mono">Trimly</h1>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-700 font-medium hover:text-emerald-600 transition-colors">
              Login
            </button>
            <button className="px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
              Signup
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700"
            >
              {isMenuOpen ? (
                <RxCross2 className="h-6 w-6" />
        ) : (
                <IoReorderThreeSharp className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-t-gray-400">
            <div className="flex flex-col space-y-3">
              <button className="px-4 py-2 text-gray-700 font-medium hover:text-emerald-600 text-left">
                Login
              </button>
              <button className="px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 text-center">
                Signup
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
