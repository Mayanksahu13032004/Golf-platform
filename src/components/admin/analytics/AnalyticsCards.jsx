"use client";

import {
  FaMoneyBillWave,
  FaHeart,
  FaGift,
  FaChartLine,
} from "react-icons/fa";

export default function AnalyticsCards({
  analytics,
}) {
  if (!analytics) return null;

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${analytics.totalRevenue || 0}`,
      icon: <FaMoneyBillWave />,
      color: "from-green-600 to-green-800",
    },
    {
      title: "Charity Fund",
      value: `₹${analytics.totalCharity || 0}`,
      icon: <FaHeart />,
      color: "from-red-600 to-red-800",
    },
    {
      title: "Prize Pool",
      value: `₹${analytics.totalPrizePool || 0}`,
      icon: <FaGift />,
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Business Growth",
      value:
        analytics.totalRevenue > 0
          ? `${(
              (analytics.totalPrizePool /
                analytics.totalRevenue) *
              100
            ).toFixed(1)}%`
          : "0%",
      icon: <FaChartLine />,
      color: "from-purple-600 to-purple-800",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 shadow-xl hover:scale-105 transition duration-300`}
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-white/80 text-sm uppercase tracking-wide">
                {card.title}
              </p>

              <h2 className="text-4xl font-bold mt-3 text-white">
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
  );
}