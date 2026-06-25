"use client";

import {
  FaGolfBall,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function ScoreCard({
  score,
  onEdit,
  onDelete,
}) {
  const formattedDate = new Date(
    score.scoreDate
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const getScoreColor = () => {
    if (score.score <= 15)
      return "text-green-400";

    if (score.score <= 30)
      return "text-yellow-400";

    return "text-red-400";
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg hover:shadow-blue-500/20 hover:border-blue-500 transition-all duration-300">

      <div className="p-6">

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">

            <div className="bg-blue-600 p-3 rounded-full">
              <FaGolfBall className="text-white text-xl" />
            </div>

            <div>
              <h2 className="font-bold text-xl text-white">
                Golf Score
              </h2>

              <p className="text-zinc-400 text-sm">
                Latest Score Record
              </p>
            </div>

          </div>

          <span
            className={`text-4xl font-extrabold ${getScoreColor()}`}
          >
            {score.score}
          </span>

        </div>

        <div className="mt-6 flex items-center gap-3 text-zinc-400">

          <FaCalendarAlt />

          <span>{formattedDate}</span>

        </div>

     <div className="mt-8 flex gap-3">

  <button
    onClick={() => onEdit(score)}
    className="flex-1 bg-yellow-500 hover:bg-yellow-600 transition-all duration-200 rounded-xl py-3 font-bold"
  >
    ✏ Edit
  </button>

  <button
    onClick={() => onDelete(score._id)}
    className="flex-1 bg-red-600 hover:bg-red-700 transition-all duration-200 rounded-xl py-3 font-bold"
  >
    🗑 Delete
  </button>

</div>

      </div>

    </div>
  );
}