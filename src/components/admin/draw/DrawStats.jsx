"use client";

import {
  FaDice,
  FaCheckCircle,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function DrawStats({
  draws = [],
}) {
  const totalDraws = draws.length;

  const simulated = draws.filter(
    (d) => d.status === "SIMULATED"
  ).length;

  const published = draws.filter(
    (d) => d.status === "PUBLISHED"
  ).length;

  const totalPrizePool = draws.reduce(
    (sum, item) =>
      sum + (item.prizePool || 0),
    0
  );

  const currentJackpot = draws.reduce(
    (sum, item) =>
      sum +
      (item.rolloverAmount || 0),
    0
  );

  const latestDraw =
    draws.length > 0
      ? draws[0]
      : null;

  const cards = [
    {
      title: "Total Draws",
      value: totalDraws,
      icon: <FaDice />,
      color:
        "from-blue-600 to-blue-800",
    },

    {
      title: "Published",
      value: published,
      icon: <FaCheckCircle />,
      color:
        "from-green-600 to-green-800",
    },

    {
      title: "Simulated",
      value: simulated,
      icon: <FaClock />,
      color:
        "from-yellow-500 to-yellow-700",
    },

    {
      title: "Jackpot",
      value: `₹${currentJackpot.toFixed(
        2
      )}`,
      icon: (
        <FaMoneyBillWave />
      ),
      color:
        "from-red-600 to-red-800",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 shadow-lg hover:scale-[1.02] transition-all`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/70 text-sm">

                  {card.title}

                </p>

                <h2 className="text-4xl font-black mt-3 text-white">

                  {card.value}

                </h2>

              </div>

              <div className="text-5xl text-white/90">

                {card.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Summary */}

      <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8">

        <h2 className="text-2xl font-bold text-white mb-6">

          Draw Summary

        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400">

              Total Prize Pool

            </p>

            <h3 className="text-3xl font-black text-green-400 mt-3">

              ₹{totalPrizePool.toFixed(
                2
              )}

            </h3>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400">

              Current Jackpot

            </p>

            <h3 className="text-3xl font-black text-red-400 mt-3">

              ₹{currentJackpot.toFixed(
                2
              )}

            </h3>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400">

              Latest Draw

            </p>

            <h3 className="text-2xl font-bold text-blue-400 mt-3">

              {latestDraw
                ? `${latestDraw.month} ${latestDraw.year}`
                : "No Draw"}

            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}