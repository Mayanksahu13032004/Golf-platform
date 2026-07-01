"use client";

import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import {
  FaRocket,
  FaTimes,
  FaCheckCircle,
  FaMoneyBillWave,
  FaTrophy,
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
          err.response?.data?.error ||
          "Publish Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-4xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-emerald-600 to-green-700 p-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold">

              Publish Draw

            </h2>

            <p className="text-green-100 mt-2">

              Finalize draw and calculate winners

            </p>

          </div>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            <FaTimes />
          </button>

        </div>

        <div className="p-8">

          {!result ? (

            <>

              {/* Draw Info */}

              <div className="bg-zinc-800 rounded-2xl p-6">

                <h2 className="text-2xl font-bold">

                  Draw Information

                </h2>

                <div className="grid md:grid-cols-2 gap-5 mt-6">

                  <div>

                    <p className="text-zinc-400">

                      Month

                    </p>

                    <h3 className="text-2xl font-bold mt-2">

                      {draw.month}

                    </h3>

                  </div>

                  <div>

                    <p className="text-zinc-400">

                      Year

                    </p>

                    <h3 className="text-2xl font-bold mt-2">

                      {draw.year}

                    </h3>

                  </div>

                </div>

              </div>

              {/* Numbers */}

              <div className="bg-zinc-800 rounded-2xl p-6 mt-6">

                <h3 className="text-xl font-bold mb-5">

                  Winning Numbers

                </h3>

                <div className="flex flex-wrap gap-3">

                  {draw.winningNumbers?.map(
                    (num) => (

                      <div
                        key={num}
                        className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg"
                      >

                        {num}

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* Warning */}

              <div className="mt-6 bg-yellow-900/30 border border-yellow-600 rounded-2xl p-5">

                <h3 className="font-bold text-yellow-300">

                  Important

                </h3>

                <p className="text-zinc-300 mt-2">

                  Publishing this draw will calculate winners,
                  create winner records, calculate prize pool,
                  rollover jackpot and send winner emails.

                </p>

              </div>

              <div className="flex justify-end gap-4 mt-8">

                <button
                  onClick={onClose}
                  className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  disabled={loading}
                  onClick={publishDraw}
                  className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-xl flex items-center gap-3 font-bold"
                >

                  <FaRocket />

                  {loading
                    ? "Publishing..."
                    : "Publish Draw"}

                </button>

              </div>

            </>

          ) : (

            <>

              {/* Success */}

              <div className="bg-green-900/30 border border-green-600 rounded-2xl p-6">

                <h2 className="text-3xl text-green-400 font-bold flex items-center gap-3">

                  <FaCheckCircle />

                  Draw Published Successfully

                </h2>

              </div>

              {/* Prize */}

              <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div className="bg-zinc-800 rounded-2xl p-6">

                  <p className="text-zinc-400">

                    Prize Pool

                  </p>

                  <h2 className="text-4xl font-black text-green-400 mt-3">

                    ₹{result.totalPrizePool}

                  </h2>

                </div>

                <div className="bg-zinc-800 rounded-2xl p-6">

                  <p className="text-zinc-400">

                    Jackpot

                  </p>

                  <h2 className="text-4xl font-black text-red-400 mt-3">

                    ₹{result.rolloverAmount}

                  </h2>

                </div>

              </div>

              {/* Winners */}

              <div className="grid md:grid-cols-3 gap-6 mt-8">

                {[
                  {
                    title: "5 Match",
                    data:
                      result.winners
                        .fiveMatch,
                  },
                  {
                    title: "4 Match",
                    data:
                      result.winners
                        .fourMatch,
                  },
                  {
                    title: "3 Match",
                    data:
                      result.winners
                        .threeMatch,
                  },
                ].map((item) => (

                  <div
                    key={item.title}
                    className="bg-zinc-800 rounded-2xl p-6 text-center"
                  >

                    <FaTrophy className="mx-auto text-4xl text-yellow-400 mb-4" />

                    <h3 className="text-2xl font-bold">

                      {item.title}

                    </h3>

                    <p className="mt-5 text-zinc-400">

                      Winners

                    </p>

                    <h2 className="text-4xl font-black mt-2">

                      {item.data.count}

                    </h2>

                    <p className="mt-5 text-zinc-400">

                      Prize / Winner

                    </p>

                    <h2 className="text-2xl font-bold text-green-400 mt-2">

                      ₹{item.data.prizePerWinner}

                    </h2>

                  </div>

                ))}

              </div>

              <div className="flex justify-end mt-8">

                <button
                  onClick={onClose}
                  className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-xl font-bold"
                >
                  Done
                </button>

              </div>

            </>

          )}

        </div>

      </div>

    </div>
  );
}