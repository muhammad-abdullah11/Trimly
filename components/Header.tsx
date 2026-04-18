"use client";

import { useState } from "react";
import { IoReorderThreeSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";


const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="shrink-0">
            <Link href="/" className="text-emerald-600 text-3xl font-bold font-mono">Trimly</Link>
          </div>
          {
            session ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-gray-700 font-medium cursor-pointer border-2 border-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors">{session.user.fullName || session.user.email}</h1>
                </div>
                <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/login" className="px-4 py-2 text-gray-700 font-medium hover:text-emerald-600 transition-colors">
                  Login
                </Link>
                <Link href="/signups" className="px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                  Signup
                </Link>
              </div>
            )}
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
            {
              session ? (
                <div className="flex flex-col space-y-3">
                  <h1 className="text-gray-700 font-medium cursor-pointer border-2 border-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors">{session.user.fullName || session.user.email}</h1>
                  <button onClick={() => signOut()} className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link href="/login" className="px-4 py-2 text-gray-700 font-medium hover:text-emerald-600 text-left">
                    Login
                  </Link>
                  <Link href="/signups" className="px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 text-center">
                    Signup
                  </Link>
                </div>
              )
            }
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
