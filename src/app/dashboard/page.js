"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  FaWallet,
  FaTrophy,
  FaGolfBall,
  FaMedal,
} from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const res = await api.get("/dashboard/user");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  if (!data) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="text-white mt-6 text-xl font-bold">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Won",
      value: `₹${data.totalWon || 0}`,
      icon: <FaWallet />,
      color: "from-green-600 to-green-800",
    },
    {
      title: "Scores",
      value: data.scores?.length || 0,
      icon: <FaGolfBall />,
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Winnings",
      value: data.winnings?.length || 0,
      icon: <FaTrophy />,
      color: "from-yellow-500 to-orange-600",
    },
    {
      title: "Win Rate",
      value:
        data.scores?.length > 0
          ? `${(
              (data.winnings.length /
                data.scores.length) *
              100
            ).toFixed(1)}%`
          : "0%",
      icon: <FaMedal />,
      color: "from-purple-600 to-purple-800",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">

      {/* Welcome */}

      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl p-8 shadow-xl">

        <h1 className="text-5xl font-black">
          Welcome Back 👋
        </h1>

        <p className="text-blue-100 mt-4 text-lg">
          Track your golf scores, monitor your winnings,
          and stay updated with every charity draw.
        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 shadow-xl hover:scale-105 transition-all duration-300`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80">

                  {card.title}

                </p>

                <h2 className="text-4xl font-black mt-3">

                  {card.value}

                </h2>

              </div>

              <div className="text-5xl">

                {card.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Recent Scores & Winnings */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Scores */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Scores
          </h2>

          {data.scores?.length ? (
            <div className="space-y-4">

              {data.scores
                .slice(0, 5)
                .map((score) => (

                  <div
                    key={score._id}
                    className="flex justify-between items-center bg-zinc-800 rounded-xl p-4"
                  >

                    <div>

                      <p className="font-bold">

                        Score

                      </p>

                      <p className="text-zinc-400 text-sm">

                        {new Date(
                          score.scoreDate
                        ).toLocaleDateString()}

                      </p>

                    </div>

                    <div className="text-2xl font-black text-green-400">

                      {score.score}

                    </div>

                  </div>

                ))}

            </div>
          ) : (
            <p className="text-zinc-500">
              No scores available.
            </p>
          )}

        </div>

        {/* Winnings */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Winnings
          </h2>

          {data.winnings?.length ? (
            <div className="space-y-4">

              {data.winnings
                .slice(0, 5)
                .map((win) => (

                  <div
                    key={win._id}
                    className="flex justify-between items-center bg-zinc-800 rounded-xl p-4"
                  >

                    <div>

                      <p className="font-bold">

                        {win.matchCount} Match

                      </p>

                      <p className="text-zinc-400 text-sm">

                        {win.status}

                      </p>

                    </div>

                    <div className="text-2xl font-black text-yellow-400">

                      ₹{win.amount}

                    </div>

                  </div>

                ))}

            </div>
          ) : (
            <p className="text-zinc-500">
              No winnings yet.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}