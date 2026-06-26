"use client";

import {
  FaTrophy,
  FaMoneyBillWave,
  FaUpload,
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

export default function WinnerCard({
  winner,
  onUpload,
}) {
  const getStatusBadge = () => {
    switch (winner.status) {
      case "PAID":
        return (
          <span className="bg-green-600 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold">
            <FaCheckCircle />
            Paid
          </span>
        );

      case "APPROVED":
        return (
          <span className="bg-blue-600 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold">
            <FaCheckCircle />
            Approved
          </span>
        );

      case "REJECTED":
        return (
          <span className="bg-red-600 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold">
            <FaTimesCircle />
            Rejected
          </span>
        );

      default:
        return (
          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full flex items-center gap-2 text-sm font-semibold">
            <FaClock />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-blue-600 transition-all">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-3">

            <FaTrophy className="text-yellow-400" />

            Winner

          </h2>

          <p className="text-zinc-400 mt-2">

            Match Count :
            <span className="text-white ml-2 font-semibold">

              {winner.matchCount}

            </span>

          </p>

        </div>

        {getStatusBadge()}

      </div>

      {/* Prize */}

      <div className="mt-8">

        <p className="text-zinc-400">

          Prize Amount

        </p>

        <h1 className="text-5xl font-black text-green-400 mt-2 flex items-center gap-3">

          <FaMoneyBillWave />

          ₹{winner.amount}

        </h1>

      </div>

      {/* Date */}

      <div className="mt-6">

        <p className="text-zinc-400">

          Winning Date

        </p>

        <h3 className="text-lg text-white mt-2">

          {new Date(
            winner.createdAt
          ).toLocaleDateString()}

        </h3>

      </div>

      {/* Proof */}

      <div className="mt-8">

        {winner.proofImage ? (

          <div>

            <img
              src={winner.proofImage}
              className="rounded-2xl w-full h-56 object-cover border border-zinc-700"
            />

            <a
              href={winner.proofImage}
              target="_blank"
              className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
            >
              <FaEye />

              View Full Image

            </a>

          </div>

        ) : (

          <div className="text-center border border-dashed border-zinc-700 rounded-2xl p-8">

            <p className="text-zinc-500">

              No Proof Uploaded

            </p>

            <button
              onClick={() =>
                onUpload(winner)
              }
              className="mt-5 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl flex items-center gap-3 mx-auto font-semibold"
            >
              <FaUpload />

              Upload Proof

            </button>

          </div>

        )}

      </div>

    </div>
  );
}