"use client";

import {
  FaUsers,
  FaHandsHelping,
  FaTrophy,
  FaCreditCard,
} from "react-icons/fa";

export default function AdminStats({
  dashboard,
}) {
  if (!dashboard) return null;

  const stats = [
    {
      title: "Total Users",
      value:
        dashboard.totalUsers || 0,
      icon: <FaUsers />,
      color:
        "from-blue-600 to-blue-800",
    },

    {
      title: "Total Charities",
      value:
        dashboard.totalCharities ||
        0,
      icon: <FaHandsHelping />,
      color:
        "from-green-600 to-green-800",
    },

    {
      title: "Total Winners",
      value:
        dashboard.totalWinners ||
        0,
      icon: <FaTrophy />,
      color:
        "from-yellow-500 to-orange-600",
    },

    {
      title:
        "Active Subscriptions",
      value:
        dashboard.activeSubscriptions ||
        0,
      icon: <FaCreditCard />,
      color:
        "from-purple-600 to-purple-800",
    },
  ];

  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-3xl font-bold text-white">

          System Statistics

        </h2>

        <p className="text-zinc-400 mt-2">

          Current platform overview

        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (

          <div
            key={item.title}
            className={`bg-gradient-to-r ${item.color} rounded-3xl p-6 shadow-xl hover:scale-105 transition-all duration-300`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80">

                  {item.title}

                </p>

                <h2 className="text-5xl font-bold mt-4 text-white">

                  {item.value}

                </h2>

              </div>

              <div className="text-5xl text-white">

                {item.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Summary */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h2 className="text-2xl font-bold text-white mb-6">

          Platform Overview

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-400">

              Registered Users

            </p>

            <h2 className="text-4xl font-bold text-blue-400 mt-3">

              {dashboard.totalUsers}

            </h2>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-400">

              Active Memberships

            </p>

            <h2 className="text-4xl font-bold text-purple-400 mt-3">

              {
                dashboard.activeSubscriptions
              }

            </h2>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-400">

              Registered Charities

            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">

              {
                dashboard.totalCharities
              }

            </h2>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-400">

              Prize Winners

            </p>

            <h2 className="text-4xl font-bold text-yellow-400 mt-3">

              {
                dashboard.totalWinners
              }

            </h2>

          </div>

        </div>

      </div>

    </section>
  );
}