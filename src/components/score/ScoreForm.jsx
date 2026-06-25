"use client";

import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ScoreForm({
  onSubmit,
}) {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      score: "",
      scoreDate: "",
    });

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (!form.score) {
        return toast.error(
          "Score is required"
        );
      }

      if (
        Number(form.score) < 1 ||
        Number(form.score) > 45
      ) {
        return toast.error(
          "Score must be between 1 and 45"
        );
      }

      if (!form.scoreDate) {
        return toast.error(
          "Date is required"
        );
      }

      try {
        setLoading(true);

        await onSubmit(form);

        setForm({
          score: "",
          scoreDate: "",
        });
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl">

      <div className="border-b border-zinc-800 p-5">

        <h2 className="text-2xl font-bold">
          Add Golf Score
        </h2>

        <p className="text-zinc-400 mt-1">
          Enter today's golf score.
        </p>

      </div>

      <form
        onSubmit={
          handleSubmit
        }
        className="p-6"
      >

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="block mb-2 font-semibold">
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
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Enter Score"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Date
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
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>

        </div>

        <button
          disabled={loading}
          className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 duration-200 px-6 py-3 rounded-xl font-bold disabled:opacity-50"
        >

          <FaPlusCircle />

          {loading
            ? "Adding..."
            : "Add Score"}

        </button>

      </form>

    </div>
  );
}