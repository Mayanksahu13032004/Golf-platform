"use client";

import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaMoneyBillWave,
  FaTrophy,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

export default function ViewProofModal({
  winner,
  onClose,
}) {
  if (!winner) return null;

  function badge(status) {
    switch (status) {
      case "APPROVED":
        return (
          <span className="bg-green-600 px-4 py-2 rounded-full font-semibold">
            <FaCheckCircle className="inline mr-2" />
            Approved
          </span>
        );

      case "REJECTED":
        return (
          <span className="bg-red-600 px-4 py-2 rounded-full font-semibold">
            <FaTimesCircle className="inline mr-2" />
            Rejected
          </span>
        );

      case "PAID":
        return (
          <span className="bg-blue-600 px-4 py-2 rounded-full font-semibold">
            <FaMoneyBillWave className="inline mr-2" />
            Paid
          </span>
        );

      default:
        return (
          <span className="bg-yellow-600 px-4 py-2 rounded-full font-semibold">
            <FaClock className="inline mr-2" />
            Pending
          </span>
        );
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">

      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-5xl overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-6 flex justify-between items-center">

          <div>

            <h2 className="text-3xl font-bold text-white">
              Winner Proof
            </h2>

            <p className="text-blue-100 mt-2">
              Uploaded verification document
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-white text-2xl"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="grid lg:grid-cols-2">

          {/* Image */}

          <div className="bg-zinc-950 p-6 flex justify-center items-center">

            {winner.proofImage ? (
              <img
                src={winner.proofImage}
                alt="Proof"
                className="rounded-2xl max-h-[550px] object-contain shadow-2xl"
              />
            ) : (
              <div className="text-zinc-500 text-xl">
                No Proof Uploaded
              </div>
            )}

          </div>

          {/* Details */}

          <div className="p-8 space-y-8">

            <h2 className="text-3xl font-bold">
              Winner Details
            </h2>

            <div className="space-y-6">

              <div className="flex items-center gap-4">

                <FaUser className="text-blue-400 text-2xl" />

                <div>

                  <p className="text-zinc-500">
                    Name
                  </p>

                  <h3 className="font-bold text-xl">

                    {winner.userId?.name}

                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaEnvelope className="text-purple-400 text-2xl" />

                <div>

                  <p className="text-zinc-500">
                    Email
                  </p>

                  <h3 className="font-bold">

                    {winner.userId?.email}

                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaTrophy className="text-yellow-400 text-2xl" />

                <div>

                  <p className="text-zinc-500">
                    Match Count
                  </p>

                  <h3 className="font-bold text-xl">

                    {winner.matchCount} Match

                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <FaMoneyBillWave className="text-green-400 text-2xl" />

                <div>

                  <p className="text-zinc-500">
                    Prize Amount
                  </p>

                  <h3 className="font-bold text-2xl text-green-400">

                    ₹{winner.amount.toFixed(2)}

                  </h3>

                </div>

              </div>

              <div>

                <p className="text-zinc-500 mb-3">
                  Current Status
                </p>

                {badge(winner.status)}

              </div>

              {winner.adminRemark && (

                <div className="bg-zinc-800 rounded-xl p-5">

                  <p className="text-zinc-500">
                    Admin Remark
                  </p>

                  <p className="mt-2">

                    {winner.adminRemark}

                  </p>

                </div>

              )}

            </div>

            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
