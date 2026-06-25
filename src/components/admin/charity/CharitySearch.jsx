"use client";

import { FaSearch, FaTimes } from "react-icons/fa";

export default function CharitySearch({
  value,
  onChange,
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-xl">

      <div className="flex flex-col md:flex-row gap-4 items-center">

        <div className="relative flex-1">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            placeholder="Search charity by name or description..."
            value={value}
            onChange={(e) =>
              onChange(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-12 py-3 text-white outline-none focus:border-blue-500 transition"
          />

          {value && (
            <button
              onClick={() => onChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-500"
            >
              <FaTimes />
            </button>
          )}

        </div>

      </div>

      <div className="mt-3 text-sm text-zinc-500">
        Search charities by their name or description.
      </div>

    </div>
  );
}