"use client";

import {
  FaTrash,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function DeleteCharityModal({
  charity,
  onClose,
  onDelete,
}) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-zinc-900 border border-red-700 rounded-3xl overflow-hidden shadow-2xl">

        {/* Header */}

        <div className="bg-red-600 p-6 flex items-center gap-4">

          <div className="bg-white/20 p-4 rounded-full">

            <FaExclamationTriangle className="text-3xl text-white" />

          </div>

          <div>

            <h2 className="text-3xl font-bold text-white">
              Delete Charity
            </h2>

            <p className="text-red-100 mt-1">
              This action cannot be undone.
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="p-8">

          <p className="text-zinc-300 text-lg leading-8">

            You are about to permanently delete

            <span className="font-bold text-white">
              {" "}
              {charity?.name}
            </span>

            .

          </p>

          <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-5 mt-6">

            <h3 className="text-white font-bold mb-3">
              Charity Information
            </h3>

            <div className="space-y-3">

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Name
                </span>

                <span className="text-white font-semibold">
                  {charity?.name}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Events
                </span>

                <span className="text-white font-semibold">
                  {charity?.events?.length || 0}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Featured
                </span>

                <span
                  className={`font-semibold ${
                    charity?.featured
                      ? "text-yellow-400"
                      : "text-zinc-500"
                  }`}
                >
                  {charity?.featured
                    ? "Yes"
                    : "No"}
                </span>

              </div>

            </div>

          </div>

          {/* Warning */}

          <div className="bg-red-950 border border-red-700 rounded-xl p-4 mt-6">

            <p className="text-red-300">

              ⚠ Deleting this charity will permanently remove:

            </p>

            <ul className="text-red-200 mt-3 list-disc list-inside space-y-2">

              <li>Charity Details</li>

              <li>Charity Image</li>

              <li>Upcoming Events</li>

              <li>Featured Status</li>

            </ul>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 mt-8">

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white flex items-center gap-3"
            >
              <FaTimes />

              Cancel
            </button>

            <button
              onClick={onDelete}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white flex items-center gap-3"
            >
              <FaTrash />

              Delete Charity
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}