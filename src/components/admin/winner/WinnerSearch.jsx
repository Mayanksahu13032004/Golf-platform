"use client";

import {
  FaSearch,
  FaTimes,
  FaFilter,
} from "react-icons/fa";

export default function WinnerSearch({
  search,
  setSearch,
  status,
  setStatus,
}) {
  function clearFilters() {
    setSearch("");
    setStatus("");
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl">

      <div className="flex flex-col lg:flex-row gap-5">

        {/* Search */}

        <div className="relative flex-1">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

          <input
            type="text"
            placeholder="Search by Name or Email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-12 py-3 text-white outline-none focus:border-blue-500 transition"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
          )}

        </div>

        {/* Status */}

        <div className="lg:w-72">

          <div className="relative">

            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-blue-500 appearance-none"
            >
              <option value="">
                All Status
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="APPROVED">
                Approved
              </option>

              <option value="REJECTED">
                Rejected
              </option>

              <option value="PAID">
                Paid
              </option>

            </select>

          </div>

        </div>

        {/* Clear */}

        <button
          onClick={clearFilters}
          className="bg-red-600 hover:bg-red-700 rounded-xl px-6 py-3 font-bold flex items-center justify-center gap-3"
        >
          <FaTimes />

          Clear
        </button>

      </div>

      <div className="mt-4 flex justify-between text-sm text-zinc-500">

        <span>
          Search winners using their registered name or email.
        </span>

        {(search || status) && (
          <span className="text-blue-400">
            Filters Applied
          </span>
        )}

      </div>

    </div>
  );
}