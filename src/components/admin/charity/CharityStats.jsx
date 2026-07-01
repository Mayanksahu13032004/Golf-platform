"use client";

import {
  FaHandHoldingHeart,
  FaStar,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

export default function CharityStats({
  charities = [],
}) {
  const totalCharities =
    charities.length;

  const featuredCharities =
    charities.filter(
      (item) => item.featured
    ).length;

  const totalEvents =
    charities.reduce(
      (sum, item) =>
        sum +
        (item.events?.length || 0),
      0
    );

  const latestCharity =
    charities.length > 0
      ? charities[0]
      : null;

  const stats = [
    {
      title: "Total Charities",
      value: totalCharities,
      icon: (
        <FaHandHoldingHeart />
      ),
      color:
        "from-emerald-600 to-green-500",
    },

    {
      title: "Featured",
      value: featuredCharities,
      icon: <FaStar />,
      color:
        "from-yellow-500 to-orange-500",
    },

    {
      title: "Total Events",
      value: totalEvents,
      icon: (
        <FaCalendarAlt />
      ),
      color:
        "from-blue-600 to-cyan-500",
    },

    {
      title: "Latest Charity",
      value:
        latestCharity?.name ||
        "None",
      icon: <FaClock />,
      color:
        "from-purple-600 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item) => (

        <div
          key={item.title}
          className={`rounded-3xl bg-gradient-to-r ${item.color} p-[1px]`}
        >

          <div className="bg-zinc-900 rounded-3xl h-full p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-zinc-400 text-sm">

                  {item.title}

                </p>

                <h2 className="text-3xl font-black mt-3 break-words">

                  {item.value}

                </h2>

              </div>

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex justify-center items-center text-3xl shadow-xl`}>

                {item.icon}

              </div>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}