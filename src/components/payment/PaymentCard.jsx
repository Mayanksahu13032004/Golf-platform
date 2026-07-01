"use client";

import {
  FaMoneyBillWave,
  FaHeart,
  FaGift,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaCreditCard,
} from "react-icons/fa";

export default function PaymentCard({
  payment,
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-xl hover:border-blue-500 transition">

      {/* Header */}

      <div className="flex justify-between items-start">

        <div>

          <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-bold">

            {payment.plan}

          </span>

          <h2 className="text-3xl font-black text-green-400 mt-4">

            ₹{payment.amount}

          </h2>

        </div>

        <div>

          {payment.status ===
          "ACTIVE" ? (

            <span className="bg-green-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm">

              <FaCheckCircle />

              Active

            </span>

          ) : (

            <span className="bg-red-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm">

              <FaTimesCircle />

              {payment.status}

            </span>

          )}

        </div>

      </div>

      {/* Body */}

      <div className="grid grid-cols-2 gap-5 mt-8">

        <div>

          <div className="flex items-center gap-2 text-pink-400">

            <FaHeart />

            Charity

          </div>

          <p className="text-white font-bold mt-2">

            ₹{payment.charityContribution}

          </p>

        </div>

        <div>

          <div className="flex items-center gap-2 text-yellow-400">

            <FaGift />

            Prize Pool

          </div>

          <p className="text-white font-bold mt-2">

            ₹{payment.prizePoolContribution}

          </p>

        </div>

      </div>

      {/* Date */}

      <div className="mt-8">

        <div className="flex items-center gap-2 text-cyan-400">

          <FaCalendarAlt />

          Payment Date

        </div>

        <p className="text-zinc-300 mt-2">

          {new Date(
            payment.createdAt
          ).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          )}

        </p>

      </div>

      {/* Payment Id */}

      <div className="mt-8">

        <div className="flex items-center gap-2 text-green-400">

          <FaCreditCard />

          Payment Reference

        </div>

        <p className="text-zinc-400 break-all text-sm mt-2">

          {payment.paymentIntent ||
            "N/A"}

        </p>

      </div>

      {/* Footer */}

      <div className="mt-8 pt-5 border-t border-zinc-800 flex justify-between items-center">

        <p className="text-zinc-500 text-sm">

          Membership

        </p>

        <p className="font-bold text-white">

          {payment.plan}

        </p>

      </div>

    </div>
  );
}