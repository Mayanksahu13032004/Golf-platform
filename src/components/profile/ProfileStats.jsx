"use client";

import {
  FaGolfBall,
  FaMoneyBillWave,
  FaGift,
  FaHeart,
} from "react-icons/fa";

export default function ProfileStats({
  scores = [],
  winnings = [],
  subscription,
}) {
  const totalScores = scores.length;

  const totalWon = winnings.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  const totalDraws = winnings.length;

  const charityContribution =
    subscription?.charityContribution || 0;

  const stats = [
    {
      title: "Golf Scores",
      value: totalScores,
      icon: <FaGolfBall />,
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Total Won",
      value: `₹${totalWon}`,
      icon: <FaMoneyBillWave />,
      color: "from-green-600 to-green-800",
    },
    {
      title: "Draws Played",
      value: totalDraws,
      icon: <FaGift />,
      color: "from-purple-600 to-purple-800",
    },
    {
      title: "Charity",
      value: `₹${charityContribution}`,
      icon: <FaHeart />,
      color: "from-red-600 to-red-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item) => (
        <div
          key={item.title}
          className={`bg-gradient-to-r ${item.color} rounded-2xl shadow-xl p-6`}
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-white/80">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold mt-4">
                {item.value}
              </h2>

            </div>

            <div className="text-5xl text-white/80">
              {item.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}