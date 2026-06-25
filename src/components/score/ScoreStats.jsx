"use client";

import {
  FaGolfBall,
  FaChartLine,
  FaTrophy,
  FaListOl,
} from "react-icons/fa";

export default function ScoreStats({
  scores,
}) {
  const totalScores =
    scores.length;

  const latestScore =
    totalScores > 0
      ? scores[0].score
      : 0;

  const bestScore =
    totalScores > 0
      ? Math.max(
          ...scores.map(
            (item) =>
              item.score
          )
        )
      : 0;

  const averageScore =
    totalScores > 0
      ? (
          scores.reduce(
            (sum, item) =>
              sum +
              item.score,
            0
          ) / totalScores
        ).toFixed(1)
      : 0;

  const cards = [
    {
      title:
        "Total Scores",
      value:
        totalScores,
      icon: (
        <FaListOl className="text-4xl text-cyan-400" />
      ),
      color:
        "from-cyan-600 to-cyan-900",
    },

    {
      title:
        "Best Score",
      value:
        bestScore,
      icon: (
        <FaTrophy className="text-4xl text-yellow-400" />
      ),
      color:
        "from-yellow-600 to-yellow-900",
    },

    {
      title:
        "Average",
      value:
        averageScore,
      icon: (
        <FaChartLine className="text-4xl text-green-400" />
      ),
      color:
        "from-green-600 to-green-900",
    },

    {
      title:
        "Latest Score",
      value:
        latestScore,
      icon: (
        <FaGolfBall className="text-4xl text-blue-400" />
      ),
      color:
        "from-blue-600 to-blue-900",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map(
        (card) => (
          <div
            key={
              card.title
            }
            className={`bg-gradient-to-r ${card.color} rounded-2xl shadow-xl p-6`}
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80 text-sm">
                  {
                    card.title
                  }
                </p>

                <h2 className="text-4xl font-extrabold mt-3">
                  {
                    card.value
                  }
                </h2>

              </div>

              {card.icon}

            </div>
          </div>
        )
      )}

    </div>
  );
}