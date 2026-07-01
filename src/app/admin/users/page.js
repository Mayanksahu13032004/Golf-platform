"use client";

import { useState } from "react";
import { 
  FaUsers, 
  FaUserPlus, 
  FaSearch, 
  FaFilter, 
  FaSlidersH 
} from "react-icons/fa";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-10 selection:bg-indigo-500 selection:text-white space-y-8">
      
      {/* Dynamic Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900 pb-6 relative group">
        <div className="absolute top-0 left-0 w-48 h-24 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent uppercase">
            User <span className="font-extrabold text-indigo-500">Database</span>
          </h1>
          <p className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-400 mt-2">
            Audit configurations, roles, and profiles inside the <span className="text-zinc-200 font-extrabold">Identity Matrix</span>.
          </p>
        </div>

        <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-6 py-3.5 rounded-xl flex items-center justify-center gap-3 font-extrabold transition-all duration-200 shadow-lg shadow-indigo-600/20 text-sm sm:text-base">
          <FaUserPlus className="text-base" />
          Provision User
        </button>
      </div>

      {/* Modern Filter Controller Panel */}
      <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row gap-4 backdrop-blur-sm transition-all duration-300 hover:border-zinc-800/80 shadow-xl">
        
        {/* Search Input Container */}
        <div className="relative flex-1 group">
          <FaSearch className="absolute left-4 top-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Query UID, Email, or Alias..."
            className="w-full bg-zinc-800/60 border border-zinc-700/50 text-white rounded-xl pl-12 pr-4 py-3.5 outline-none font-medium placeholder-zinc-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
          />
        </div>

        {/* Action Controls */}
        <div className="flex gap-3">
          <button className="flex-1 md:flex-none bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 text-sm">
            <FaFilter className="text-zinc-500" />
            Filters
          </button>
          <button className="bg-zinc-850 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold p-3.5 rounded-xl flex items-center justify-center transition-all duration-200">
            <FaSlidersH className="text-zinc-500" />
          </button>
        </div>
      </div>

      {/* Scalable Matrix Placeholder Slate */}
      <div className="relative group bg-zinc-900/20 border border-zinc-900 border-dashed rounded-3xl p-8 sm:p-16 flex flex-col items-center justify-center text-center transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/30 overflow-hidden min-h-[350px]">
        {/* Background Radial Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-indigo-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <div className="relative p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
          <FaUsers className="text-4xl sm:text-5xl" />
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
          No records rendered in live stream
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mt-2 font-medium">
          Connect your backend API stream or feed mock arrays inside the table architecture to fetch structural rows.
        </p>
      </div>

    </div>
  );
}