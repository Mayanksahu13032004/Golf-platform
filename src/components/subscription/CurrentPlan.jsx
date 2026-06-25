"use client";

import {
  FaCrown,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function CurrentPlan({
  subscription,
}) {
  if (!subscription) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 text-center">
        <FaTimesCircle className="mx-auto text-5xl text-red-500 mb-4" />

        <h2 className="text-3xl font-bold text-white">
          No Active Subscription
        </h2>

        <p className="text-zinc-400 mt-3">
          Subscribe to participate in golf draws and support charities.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl shadow-2xl p-8 text-white">

      <div className="flex flex-col lg:flex-row justify-between gap-8">

        <div>

          <div className="flex items-center gap-3">

            <FaCrown className="text-4xl text-yellow-300" />

            <div>

              <h2 className="text-3xl font-bold">

                {subscription.plan} Membership

              </h2>

              <p className="text-blue-100 mt-1">

                Your membership is currently active.

              </p>

            </div>

          </div>

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">

              <FaCalendarAlt />

              <span>

                Start Date :

                {" "}

                {subscription.startDate
                  ? new Date(
                      subscription.startDate
                    ).toLocaleDateString()
                  : "N/A"}

              </span>

            </div>

            <div className="flex items-center gap-3">

              <FaCalendarAlt />

              <span>

                Expiry Date :

                {" "}

                {subscription.endDate
                  ? new Date(
                      subscription.endDate
                    ).toLocaleDateString()
                  : "N/A"}

              </span>

            </div>

          </div>

        </div>

        <div className="flex flex-col justify-center">

          <div className="bg-green-500 rounded-full px-6 py-3 flex items-center gap-3 font-bold">

            <FaCheckCircle />

            ACTIVE

          </div>

        </div>

      </div>

    </div>
  );
}