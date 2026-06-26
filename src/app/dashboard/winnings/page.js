"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import WinnerCard from "@/components/winner/WinnerCard";
import UploadProofModal from "@/components/winner/UploadProofModal";

import {
  FaTrophy,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function WinningsPage() {
  const [loading, setLoading] =
    useState(true);

  const [winnings, setWinnings] =
    useState([]);

  const [selectedWinner, setSelectedWinner] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
    getWinnings();
  }, []);

  async function getWinnings() {
    try {
      setLoading(true);

      const res =
        await api.get("/winner/my");

      setWinnings(
        res.data.winners || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const totalPrize =
    winnings.reduce(
      (sum, item) =>
        sum + item.amount,
      0
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">

        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 rounded-3xl p-8 shadow-xl">

        <h1 className="text-5xl font-black text-white flex items-center gap-4">

          <FaTrophy />

          My Winnings

        </h1>

        <p className="text-blue-100 mt-3 text-lg">

          View all your winning prizes and upload proof.

        </p>

      </div>

      {/* Summary */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-green-700 rounded-3xl p-6">

          <p className="text-green-100">

            Total Prize Won

          </p>

          <h1 className="text-5xl font-black mt-3 flex items-center gap-3">

            <FaMoneyBillWave />

            ₹{totalPrize}

          </h1>

        </div>

        <div className="bg-blue-700 rounded-3xl p-6">

          <p className="text-blue-100">

            Total Wins

          </p>

          <h1 className="text-5xl font-black mt-3">

            {winnings.length}

          </h1>

        </div>

      </div>

      {/* Winners */}

      {winnings.length === 0 ? (

        <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-16 text-center">

          <FaTrophy className="text-7xl text-yellow-500 mx-auto mb-6" />

          <h2 className="text-3xl font-bold text-white">

            No Winnings Yet

          </h2>

          <p className="text-zinc-400 mt-3">

            Participate in upcoming draws to win exciting prizes.

          </p>

        </div>

      ) : (

        <div className="grid lg:grid-cols-2 gap-6">

          {winnings.map((winner) => (

            <WinnerCard
              key={winner._id}
              winner={winner}
              onUpload={(item) => {
                setSelectedWinner(item);
                setShowModal(true);
              }}
            />

          ))}

        </div>

      )}

      {/* Upload Modal */}

      {showModal && selectedWinner && (

        <UploadProofModal
          winner={selectedWinner}
          onClose={() =>
            setShowModal(false)
          }
          onSuccess={getWinnings}
        />

      )}

    </div>
  );
}