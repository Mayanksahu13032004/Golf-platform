"use client";

import {
  FaGolfBall,
  FaExclamationCircle,
} from "react-icons/fa";

import ScoreCard from "./ScoreCard";

export default function ScoreList({
  loading,
  scores,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-zinc-900 rounded-2xl h-64 animate-pulse border border-zinc-800"
          />
        ))}
      </div>
    );
  }

  if (scores.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">

        <FaExclamationCircle className="text-6xl text-zinc-500 mx-auto mb-5" />

        <h2 className="text-2xl font-bold text-white">
          No Scores Found
        </h2>

        <p className="text-zinc-400 mt-3">
          Add your first golf score to start tracking
          your performance.
        </p>

      </div>
    );
  }

  return (
    <div>

      <div className="flex items-center gap-3 mb-6">

        <FaGolfBall className="text-blue-500 text-2xl" />

        <h2 className="text-2xl font-bold text-white">
          Your Golf Scores
        </h2>

        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
          {scores.length}
        </span>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {scores.map((score) => (
          <ScoreCard
            key={score._id}
            score={score}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

      </div>

    </div>
  );
}