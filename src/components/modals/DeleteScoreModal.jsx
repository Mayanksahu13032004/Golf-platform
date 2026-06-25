"use client";

import { FaTrashAlt, FaTimes } from "react-icons/fa";

export default function DeleteScoreModal({
  onClose,
  onDelete,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-red-600 p-5 flex items-center gap-3">

          <div className="bg-white/20 p-3 rounded-full">
            <FaTrashAlt className="text-white text-2xl" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Delete Score
            </h2>

            <p className="text-red-100 text-sm">
              This action cannot be undone.
            </p>
          </div>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-zinc-300 text-lg">
            Are you sure you want to permanently
            delete this golf score?
          </p>

          <div className="bg-zinc-800 rounded-xl p-4 mt-5">

            <ul className="space-y-2 text-zinc-400">

              <li>
                • Score will be removed permanently.
              </li>

              <li>
                • Statistics will update automatically.
              </li>

              <li>
                • This action cannot be reversed.
              </li>

            </ul>

          </div>

          <div className="flex justify-end gap-4 mt-8">

            <button
              onClick={onClose}
              className="flex items-center gap-2 bg-zinc-700 hover:bg-zinc-600 transition px-5 py-3 rounded-xl text-white font-semibold"
            >
              <FaTimes />

              Cancel
            </button>

            <button
              onClick={onDelete}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-xl text-white font-semibold"
            >
              <FaTrashAlt />

              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}