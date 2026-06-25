"use client";

import { FaSearch } from "react-icons/fa";

export default function ScoreSearch({
  value,
  onChange,
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">

      <label className="block text-lg font-bold mb-3">
        Search Scores
      </label>

      <div className="relative">

        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

        <input
          type="text"
          placeholder="Search by score or date..."
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500 text-white"
        />

      </div>

      <p className="text-sm text-zinc-500 mt-3">
        Search using score value (45) or date
        (2026-06-25)
      </p>

    </div>
  );
}