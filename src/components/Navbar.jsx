"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged Out Successfully");
    router.push("/");
  };

  return (
    <nav className="bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-50 px-3 sm:px-6 py-3.5 transition-all duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-lg sm:text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent hover:opacity-90 transition-opacity flex-shrink-0"
        >
          Golf Charity
        </Link>

        {/* Action Items - Consolidated into a single responsive line */}
        <div className="flex items-center gap-3 sm:gap-6">
          
          {/* Charities Link - Visible on all screen sizes */}
          <Link
            href="/charities"
            className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-emerald-400 transition-colors duration-200"
          >
            Charities
          </Link>

          {user ? (
            <div className="flex items-center gap-2 sm:gap-4">
              {/* User text metadata - Hidden on tiny mobile screens to maintain single-line integrity */}
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-zinc-200 tracking-wide">
                  {user?.name}
                </p>
                <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-500">
                  {user?.role}
                </p>
              </div>

              {/* Avatar Graphic */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-zinc-950 font-bold text-xs sm:text-sm shadow-md shadow-emerald-950/30 flex-shrink-0">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* Action Button */}
              <button
                onClick={handleLogout}
                className="bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-red-400 hover:text-red-300 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex-shrink-0"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/login"
                className="text-xs sm:text-sm font-medium text-zinc-400 hover:text-zinc-100 px-1 py-2 transition-colors"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-emerald-600 hover:bg-emerald-500 text-zinc-950 text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-md shadow-emerald-900/20 transition-all duration-200 active:scale-95 flex-shrink-0"
              >
                Register
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}