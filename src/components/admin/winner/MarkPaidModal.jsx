"use client";

import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import {
  FaMoneyCheckAlt,
  FaTimes,
  FaReceipt,
  FaCheckCircle,
} from "react-icons/fa";

export default function MarkPaidModal({
  winner,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [reference, setReference] =
    useState("");

  async function markPaid() {
    try {
      setLoading(true);

      await api.put(
        "/winner/paid",
        {
          winnerId: winner._id,
          paymentReference: reference,
        }
      );

      toast.success(
        "Payment Marked Successfully"
      );

      onSuccess();

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Payment Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">

      <div className="bg-zinc-900 border border-blue-700 rounded-3xl w-full max-w-xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Mark as Paid
            </h2>

            <p className="text-blue-100 mt-2">
              Confirm payment to winner
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

          {/* Winner Info */}

          <div className="bg-zinc-800 rounded-2xl p-6">

            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Winner
                </span>

                <span className="font-bold text-white">
                  {winner.userId?.name}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Email
                </span>

                <span className="text-white">
                  {winner.userId?.email}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Match Count
                </span>

                <span className="text-white">
                  {winner.matchCount} Match
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Prize Amount
                </span>

                <span className="text-green-400 font-bold text-xl">
                  ₹{winner.amount.toFixed(2)}
                </span>

              </div>

            </div>

          </div>

          {/* Payment Reference */}

          <div>

            <label className="block text-white font-semibold mb-3">

              Payment Reference (Optional)

            </label>

            <div className="relative">

              <FaReceipt className="absolute left-4 top-4 text-zinc-400" />

              <input
                type="text"
                value={reference}
                onChange={(e) =>
                  setReference(
                    e.target.value
                  )
                }
                placeholder="Transaction ID / UTR Number"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl pl-12 p-4 text-white outline-none focus:border-blue-500"
              />

            </div>

          </div>

          {/* Info */}

          <div className="bg-blue-950 border border-blue-700 rounded-2xl p-5">

            <div className="flex gap-4">

              <FaCheckCircle className="text-blue-400 text-3xl mt-1" />

              <div>

                <h3 className="text-blue-300 font-bold">

                  Payment Confirmation

                </h3>

                <p className="text-zinc-300 mt-2">

                  After confirming,
                  the winner status
                  will become

                  <strong> PAID </strong>

                  and payment history
                  can be tracked using
                  the reference number.

                </p>

              </div>

            </div>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4">

            <button
              onClick={onClose}
              className="bg-zinc-700 hover:bg-zinc-600 px-6 py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              onClick={markPaid}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl flex items-center gap-3 font-bold"
            >

              <FaMoneyCheckAlt />

              {loading
                ? "Processing..."
                : "Mark Paid"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}