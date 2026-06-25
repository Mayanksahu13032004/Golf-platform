"use client";

import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import {
  FaRocket,
  FaTimes,
  FaCheckCircle,
  FaMoneyBillWave,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function PublishDrawModal({
  draw,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  async function publishDraw() {
    try {
      setLoading(true);

      const res =
        await api.post(
          "/draw/publish",
          {
            drawId: draw._id,
          }
        );

      setResult(res.data);

      toast.success(
        "Draw Published Successfully"
      );

      onSuccess();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Publish Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">

      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-green-700 to-emerald-700 p-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Publish Draw
            </h2>

            <p className="text-green-100 mt-1">
              Final confirmation before publishing.
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-white text-2xl"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="p-8 space-y-6">

          <div className="bg-yellow-900/40 border border-yellow-600 rounded-2xl p-5">

            <div className="flex gap-4">

              <FaExclamationTriangle className="text-yellow-400 text-3xl mt-1" />

              <div>

                <h3 className="text-xl font-bold text-yellow-300">
                  Important
                </h3>

                <p className="text-zinc-300 mt-2">
                  Publishing a draw is permanent.
                  Winners will be calculated,
                  prize distribution will start,
                  jackpot rollover will be applied
                  automatically and emails will
                  be sent to winners.
                </p>

              </div>

            </div>

          </div>

          {/* Draw Details */}

          <div className="bg-zinc-800 rounded-2xl p-6">

            <h3 className="text-xl font-bold text-white mb-5">
              Draw Details
            </h3>

            <div className="grid grid-cols-2 gap-5">

              <div>

                <p className="text-zinc-500">
                  Draw Status
                </p>

                <p className="text-white font-bold mt-1">
                  {draw.status}
                </p>

              </div>

              <div>

                <p className="text-zinc-500">
                  Winning Numbers
                </p>

                <div className="flex gap-2 mt-2 flex-wrap">

                  {draw.winningNumbers?.map(
                    (num) => (
                      <div
                        key={num}
                        className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold"
                      >
                        {num}
                      </div>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

          {/* Result */}

          {result && (

            <div className="bg-green-900/30 border border-green-600 rounded-2xl p-6">

              <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-3">

                <FaCheckCircle />

                Draw Published

              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <p className="text-zinc-400">
                    Prize Pool
                  </p>

                  <h2 className="text-3xl font-bold text-green-400">

                    ₹{result.totalPrizePool}

                  </h2>

                </div>

                <div>

                  <p className="text-zinc-400">
                    Jackpot
                  </p>

                  <h2 className="text-3xl font-bold text-red-400">

                    ₹{result.rolloverAmount}

                  </h2>

                </div>

              </div>

              <div className="mt-8">

                <h4 className="font-bold text-white mb-4">
                  Winners
                </h4>

                <div className="grid md:grid-cols-3 gap-4">

                  <div className="bg-zinc-800 rounded-xl p-4 text-center">

                    <p className="text-zinc-400">
                      5 Match
                    </p>

                    <h2 className="text-2xl font-bold">

                      {result.winners.fiveMatch.count}

                    </h2>

                  </div>

                  <div className="bg-zinc-800 rounded-xl p-4 text-center">

                    <p className="text-zinc-400">
                      4 Match
                    </p>

                    <h2 className="text-2xl font-bold">

                      {result.winners.fourMatch.count}

                    </h2>

                  </div>

                  <div className="bg-zinc-800 rounded-xl p-4 text-center">

                    <p className="text-zinc-400">
                      3 Match
                    </p>

                    <h2 className="text-2xl font-bold">

                      {result.winners.threeMatch.count}

                    </h2>

                  </div>

                </div>

              </div>

            </div>

          )}

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-3">

            <button
              onClick={onClose}
              className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-xl"
            >
              Close
            </button>

            {!result && (

              <button
                disabled={loading}
                onClick={publishDraw}
                className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl flex items-center gap-3 font-bold"
              >

                <FaRocket />

                {loading
                  ? "Publishing..."
                  : "Publish Draw"}

              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}