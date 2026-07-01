"use client";

import {
  FaCrown,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaGift,
  FaCoins,
} from "react-icons/fa";

export default function CurrentPlan({
  subscription,
}) {
  if (!subscription) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <h2 className="text-3xl font-black text-white">

              No Active Membership

            </h2>

            <p className="text-zinc-400 mt-2">

              Upgrade your account to participate in Golf Charity Draws.

            </p>

          </div>

          <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center">

            <FaTimesCircle className="text-4xl text-red-500" />

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">

      {/* Header */}

      <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6">

        <div className="flex flex-col sm:flex-row justify-between items-center gap-5">

          <div>

            <h2 className="text-3xl font-black text-white flex items-center gap-3">

              <FaCrown />

              Current Membership

            </h2>

            <p className="text-green-100 mt-2">

              Premium Membership Activated

            </p>

          </div>

          <span className="bg-white text-green-700 px-5 py-2 rounded-full font-bold">

            {subscription.status}

          </span>

        </div>

      </div>

      {/* Body */}

      <div className="p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Plan */}

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400">

              Plan

            </p>

            <h2 className="text-3xl font-bold text-white mt-3">

              {subscription.plan}

            </h2>

          </div>

          {/* Amount */}

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400">

              Amount Paid

            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-3">

              ₹{subscription.amount}

            </h2>

          </div>

          {/* Charity */}

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400">

              Charity

            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-3">

              {subscription.charityPercentage}%

            </h2>

          </div>

          {/* Prize Pool */}

          <div className="bg-zinc-800 rounded-2xl p-5">

            <p className="text-zinc-400">

              Prize Pool

            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-3">

              ₹{subscription.prizePoolContribution}

            </h2>

          </div>

        </div>

        {/* Dates */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-zinc-800 rounded-2xl p-6">

            <div className="flex items-center gap-3">

              <FaCalendarAlt className="text-green-400 text-xl"/>

              <div>

                <p className="text-zinc-400">

                  Start Date

                </p>

                <h3 className="text-xl font-bold text-white mt-1">

                  {new Date(
                    subscription.startDate
                  ).toLocaleDateString()}

                </h3>

              </div>

            </div>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-6">

            <div className="flex items-center gap-3">

              <FaCalendarAlt className="text-red-400 text-xl"/>

              <div>

                <p className="text-zinc-400">

                  Expiry Date

                </p>

                <h3 className="text-xl font-bold text-white mt-1">

                  {new Date(
                    subscription.endDate
                  ).toLocaleDateString()}

                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Benefits */}

        <div className="mt-8 bg-zinc-800 rounded-2xl p-6">

          <h2 className="text-2xl font-bold text-white mb-5">

            Premium Benefits

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="flex items-center gap-3">

              <FaCheckCircle className="text-green-400"/>

              <span className="text-zinc-300">

                Eligible for Monthly Draw

              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaGift className="text-pink-400"/>

              <span className="text-zinc-300">

                Winner Email Notification

              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaCoins className="text-yellow-400"/>

              <span className="text-zinc-300">

                Prize Pool Participation

              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaCheckCircle className="text-blue-400"/>

              <span className="text-zinc-300">

                Charity Contribution Included

              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}