"use client";

import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import {
  FaTimes,
  FaSave,
  FaGolfBall,
  FaCalendarAlt,
} from "react-icons/fa";

export default function EditScoreModal({
  score,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      score: score.score,
      scoreDate:
        score.scoreDate?.substring(
          0,
          10
        ),
    });

  const updateScore =
    async (e) => {
      e.preventDefault();

      if (
        form.score < 1 ||
        form.score > 45
      ) {
        return toast.error(
          "Score must be between 1 and 45"
        );
      }

      try {
        setLoading(true);

        await api.put(
          `/score/${score._id}`,
          form
        );

        toast.success(
          "Score Updated Successfully"
        );

        onSuccess();

        onClose();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Update Failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">

      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl w-full max-w-lg">

        {/* Header */}

        <div className="flex justify-between items-center border-b border-zinc-800 p-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Edit Golf Score
            </h2>

            <p className="text-zinc-400 text-sm mt-1">
              Update your latest score.
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-white hover:text-red-500 transition"
          >
            <FaTimes size={24} />
          </button>

        </div>

        {/* Body */}

        <form
          onSubmit={
            updateScore
          }
          className="p-6 space-y-6"
        >

          <div>

            <label className="text-white font-semibold flex items-center gap-2 mb-2">

              <FaGolfBall />

              Score

            </label>

            <input
              type="number"
              min="1"
              max="45"
              value={
                form.score
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  score:
                    e.target.value,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
            />

          </div>

          <div>

            <label className="text-white font-semibold flex items-center gap-2 mb-2">

              <FaCalendarAlt />

              Score Date

            </label>

            <input
              type="date"
              value={
                form.scoreDate
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  scoreDate:
                    e.target.value,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
            />

          </div>

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 disabled:opacity-50"
            >

              <FaSave />

              {loading
                ? "Updating..."
                : "Update Score"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}