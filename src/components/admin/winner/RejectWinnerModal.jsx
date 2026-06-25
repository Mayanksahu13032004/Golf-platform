"use client";

import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import {
  FaCheckCircle,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";

export default function ApproveWinnerModal({
  winner,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [remark, setRemark] =
    useState(
      winner.adminRemark || ""
    );

  async function approveWinner() {
    try {
      setLoading(true);

      await api.put(
        "/winner/approve",
        {
          winnerId: winner._id,
          adminRemark: remark,
        }
      );

      toast.success(
        "Winner Approved Successfully"
      );

      onSuccess();

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data
          ?.message ||
          "Approval Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">

      <div className="w-full max-w-xl bg-zinc-900 border border-green-700 rounded-3xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-green-600 to-green-800 p-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Approve Winner
            </h2>

            <p className="text-green-100 mt-2">
              Confirm winner verification
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

          <div className="bg-zinc-800 rounded-2xl p-6">

            <div className="space-y-4">

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Winner
                </span>

                <span className="font-bold">
                  {winner.userId?.name}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Email
                </span>

                <span>
                  {winner.userId?.email}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Match
                </span>

                <span>
                  {winner.matchCount} Match
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Prize
                </span>

                <span className="text-green-400 font-bold">
                  ₹{winner.amount.toFixed(2)}
                </span>

              </div>

            </div>

          </div>

          {/* Remark */}

          <div>

            <label className="block text-white font-semibold mb-3">

              Admin Remark

            </label>

            <textarea
              rows={4}
              value={remark}
              onChange={(e)=>
                setRemark(
                  e.target.value
                )
              }
              placeholder="Winner verified successfully..."
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white outline-none focus:border-green-500"
            />

          </div>

          {/* Success Box */}

          <div className="bg-green-950 border border-green-700 rounded-2xl p-5">

            <div className="flex gap-4">

              <FaCheckCircle className="text-green-400 text-3xl mt-1" />

              <div>

                <h3 className="font-bold text-green-300">

                  Approval Process

                </h3>

                <p className="text-zinc-300 mt-2">

                  The winner will become
                  APPROVED and will be
                  eligible for payment.
                  Your backend can also
                  send a congratulation
                  email automatically.

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
              onClick={
                approveWinner
              }
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl flex items-center gap-3 font-bold"
            >

              <FaPaperPlane />

              {loading
                ? "Approving..."
                : "Approve Winner"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}