"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  FaTrophy,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaGolfBall,
} from "react-icons/fa";

export default function WinningsPage() {
  const [winnings, setWinnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWinnings();
  }, []);

  async function getWinnings() {
    try {
      const res = await api.get("/winner/my");
      setWinnings(res.data.winners || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function getStatusBadge(status) {
    switch (status) {
      case "APPROVED":
        return (
          <span className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
            <FaCheckCircle />
            Approved
          </span>
        );

      case "PAID":
        return (
          <span className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
            <FaMoneyBillWave />
            Paid
          </span>
        );

      case "REJECTED":
        return (
          <span className="bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
            <FaTimesCircle />
            Rejected
          </span>
        );

      default:
        return (
          <span className="bg-yellow-500 text-black px-4 py-2 rounded-full flex items-center gap-2">
            <FaClock />
            Pending
          </span>
        );
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="text-white mt-5 text-xl">
            Loading Winnings...
          </p>
        </div>
      </div>
    );
  }

  const totalAmount = winnings.reduce(
    (sum, item) => sum + (item.amount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-8 shadow-xl">

        <h1 className="text-5xl font-black flex items-center gap-4">
          <FaTrophy />
          My Winnings
        </h1>

        <p className="mt-3 text-lg text-white/90">
          View all your golf draw winnings and payment status.
        </p>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-6">

          <p className="text-white/80">
            Total Prize Won
          </p>

          <h2 className="text-5xl font-black mt-3">
            ₹{totalAmount}
          </h2>

        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-6">

          <p className="text-white/80">
            Total Wins
          </p>

          <h2 className="text-5xl font-black mt-3">
            {winnings.length}
          </h2>

        </div>

      </div>

      {/* Winning Cards */}

      {winnings.length === 0 ? (

        <div className="bg-zinc-900 rounded-3xl p-16 text-center">

          <FaTrophy className="text-7xl mx-auto text-yellow-500 mb-6" />

          <h2 className="text-3xl font-bold">
            No Winnings Yet
          </h2>

          <p className="text-zinc-400 mt-4">
            Participate in upcoming draws to win exciting prizes.
          </p>

        </div>

      ) : (

        <div className="grid lg:grid-cols-2 gap-6">

          {winnings.map((item) => (

            <div
              key={item._id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-yellow-500 transition-all"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold flex items-center gap-3">

                    <FaGolfBall className="text-yellow-400" />

                    {item.matchCount} Matches

                  </h2>

                  <p className="text-zinc-500 mt-2">

                    Winner Entry

                  </p>

                </div>

                {getStatusBadge(item.status)}

              </div>

              <div className="mt-8 grid grid-cols-2 gap-6">

                <div>

                  <p className="text-zinc-400">
                    Prize Amount
                  </p>

                  <h3 className="text-4xl font-black text-green-400 mt-2">

                    ₹{item.amount}

                  </h3>

                </div>

                <div>

                  <p className="text-zinc-400">
                    Created
                  </p>

                  <h3 className="text-lg font-semibold mt-2">

                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}

                  </h3>

                </div>

              </div>

              {item.adminRemark && (

                <div className="mt-6 bg-zinc-800 rounded-xl p-4">

                  <p className="text-zinc-400">
                    Admin Remark
                  </p>

                  <p className="mt-2">
                    {item.adminRemark}
                  </p>

                </div>

              )}

            </div>

          ))}

        </div>

      )}

    </div>
  );
}