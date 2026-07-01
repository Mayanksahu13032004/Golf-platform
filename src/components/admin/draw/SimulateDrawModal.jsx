"use client";

import { useState } from "react";

import api from "@/services/api";

import toast from "react-hot-toast";

import {
  FaDice,
  FaTimes,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

export default function SimulateDrawModal({
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [draw, setDraw] =
    useState(null);

  async function simulateDraw() {
    try {
      setLoading(true);

      const res =
        await api.post(
          "/draw/simulate"
        );

      setDraw(res.data.draw);

      toast.success(
        "Draw Simulated Successfully"
      );

      onSuccess();
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          "Simulation Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold text-white">

              Simulate Draw

            </h2>

            <p className="text-green-100 mt-2">

              Generate winning numbers for this month's draw.

            </p>

          </div>

          <button
            onClick={onClose}
            className="text-2xl text-white"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="p-8">

          {!draw ? (

            <>
              <div className="bg-zinc-800 rounded-2xl p-6">

                <h3 className="text-xl font-bold text-white">

                  What will happen?

                </h3>

                <ul className="mt-5 space-y-3 text-zinc-300">

                  <li>
                    • Random winning numbers will be generated.
                  </li>

                  <li>
                    • Draw status will become
                    {" "}
                    <b>SIMULATED</b>.
                  </li>

                  <li>
                    • No winners will be calculated yet.
                  </li>

                  <li>
                    • Winners are calculated only after publishing.
                  </li>

                </ul>

              </div>

              <div className="flex justify-end gap-4 mt-8">

                <button
                  onClick={onClose}
                  className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={simulateDraw}
                  className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-xl flex items-center gap-3 font-bold disabled:opacity-50"
                >

                  <FaDice />

                  {loading
                    ? "Generating..."
                    : "Simulate Draw"}

                </button>

              </div>
            </>

          ) : (

            <div>

              {/* Success */}

              <div className="bg-green-900/30 border border-green-600 rounded-2xl p-6">

                <h2 className="text-2xl text-green-400 font-bold flex items-center gap-3">

                  <FaCheckCircle />

                  Draw Created Successfully

                </h2>

              </div>

              {/* Details */}

              <div className="grid md:grid-cols-2 gap-5 mt-8">

                <div className="bg-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-500">

                    Month

                  </p>

                  <h2 className="text-3xl font-bold mt-3">

                    {draw.month}

                  </h2>

                </div>

                <div className="bg-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-500">

                    Year

                  </p>

                  <h2 className="text-3xl font-bold mt-3">

                    {draw.year}

                  </h2>

                </div>

              </div>

              {/* Winning Numbers */}

              <div className="bg-zinc-800 rounded-2xl p-6 mt-6">

                <p className="text-zinc-400 mb-5">

                  Winning Numbers

                </p>

                <div className="flex flex-wrap gap-3">

                  {draw.winningNumbers.map(
                    (num) => (

                      <div
                        key={num}
                        className="w-14 h-14 rounded-full bg-blue-600 flex justify-center items-center text-lg font-bold"
                      >

                        {num}

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* Status */}

              <div className="grid md:grid-cols-2 gap-5 mt-6">

                <div className="bg-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-500">

                    Status

                  </p>

                  <h2 className="text-yellow-400 text-2xl font-bold mt-3">

                    {draw.status}

                  </h2>

                </div>

                <div className="bg-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-500">

                    Created

                  </p>

                  <h2 className="text-blue-400 text-xl font-bold mt-3 flex items-center gap-3">

                    <FaCalendarAlt />

                    {new Date(
                      draw.createdAt
                    ).toLocaleString()}

                  </h2>

                </div>

              </div>

              <div className="flex justify-end mt-8">

                <button
                  onClick={onClose}
                  className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-xl font-bold"
                >
                  Done
                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}