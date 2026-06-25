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

  const published = draws.filter(
    (d) => d.status === "PUBLISHED"
  ).length;

  const pending = draws.filter(
    (d) => d.status !== "PUBLISHED"
  ).length;

  const jackpot = draws.reduce(
    (sum, d) =>
      sum + (d.rolloverAmount || 0),
    0
  );

  const totalPrizePool = draws.reduce(
    (sum, d) =>
      sum + (d.prizePool || 0),
    0
  );

  const cards = [
    {
      title: "Total Draws",
      value: totalDraws,
      icon: <FaDice />,
      color: "from-blue-700 to-blue-900",
    },
    {
      title: "Published",
      value: published,
      icon: <FaCheckCircle />,
      color: "from-green-700 to-green-900",
    },
    {
      title: "Pending",
      value: pending,
      icon: <FaClock />,
      color: "from-yellow-600 to-yellow-800",
    },
    {
      title: "Jackpot",
      value: `₹${jackpot}`,
      icon: <FaMoneyBillWave />,
      color: "from-red-700 to-red-900",
    },
  ];

  return (
    <>

      {/* Top Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 shadow-xl`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80">

                  {card.title}

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {card.value}

                </h2>

              </div>

              <div className="text-5xl text-white">

                {card.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Summary */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mt-8">

        <h2 className="text-2xl font-bold text-white mb-6">

          Draw Summary

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400">

              Total Prize Pool

            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">

              ₹{totalPrizePool}

            </h2>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400">

              Total Jackpot Rollover

            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-3">

              ₹{jackpot}

            </h2>

          </div>

        </div>

      </div>

    </>
  );
}