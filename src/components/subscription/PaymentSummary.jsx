"use client";

import {
  FaMoneyBillWave,
  FaHeart,
  FaGift,
  FaCalendarAlt,
  FaCheckCircle,
  FaReceipt,
} from "react-icons/fa";

export default function PaymentSummary({
  subscription,
}) {
  if (!subscription) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h2 className="text-2xl font-bold text-white mb-3">

          Payment Summary

        </h2>

        <p className="text-zinc-400">

          No payment history available.

        </p>

      </div>
    );
  }

  return (
    <section className="mt-12">

      {/* Heading */}

      <div className="mb-8">

        <h2 className="text-3xl font-black text-white">

          Payment Summary

        </h2>

        <p className="text-zinc-400 mt-2">

          Overview of your latest membership payment.

        </p>

      </div>

      {/* Summary Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Amount */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center">

              <FaMoneyBillWave className="text-2xl text-white"/>

            </div>

            <div>

              <p className="text-zinc-400">

                Amount Paid

              </p>

              <h2 className="text-3xl font-bold text-green-400">

                ₹{subscription.amount}

              </h2>

            </div>

          </div>

        </div>

        {/* Charity */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center">

              <FaHeart className="text-2xl text-white"/>

            </div>

            <div>

              <p className="text-zinc-400">

                Charity Contribution

              </p>

              <h2 className="text-3xl font-bold text-red-400">

                ₹{subscription.charityContribution}

              </h2>

            </div>

          </div>

        </div>

        {/* Prize Pool */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center">

              <FaGift className="text-2xl text-white"/>

            </div>

            <div>

              <p className="text-zinc-400">

                Prize Pool

              </p>

              <h2 className="text-3xl font-bold text-blue-400">

                ₹{subscription.prizePoolContribution}

              </h2>

            </div>

          </div>

        </div>

        {/* Start Date */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center gap-4">

            <FaCalendarAlt className="text-3xl text-yellow-400"/>

            <div>

              <p className="text-zinc-400">

                Start Date

              </p>

              <h2 className="text-xl font-bold text-white">

                {new Date(
                  subscription.startDate
                ).toLocaleDateString("en-IN")}

              </h2>

            </div>

          </div>

        </div>

        {/* End Date */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center gap-4">

            <FaCalendarAlt className="text-3xl text-purple-400"/>

            <div>

              <p className="text-zinc-400">

                Expiry Date

              </p>

              <h2 className="text-xl font-bold text-white">

                {new Date(
                  subscription.endDate
                ).toLocaleDateString("en-IN")}

              </h2>

            </div>

          </div>

        </div>

        {/* Status */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <div className="flex items-center gap-4">

            <FaCheckCircle className="text-3xl text-green-400"/>

            <div>

              <p className="text-zinc-400">

                Status

              </p>

              <h2 className="text-xl font-bold text-green-400">

                {subscription.status}

              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* Payment Info */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mt-8">

        <div className="flex items-center gap-3 mb-5">

          <FaReceipt className="text-2xl text-cyan-400"/>

          <h2 className="text-2xl font-bold text-white">

            Payment Information

          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="text-zinc-400">

              Plan

            </p>

            <p className="text-white font-bold text-lg mt-2">

              {subscription.plan}

            </p>

          </div>

          <div>

            <p className="text-zinc-400">

              Payment Reference

            </p>

            <p className="text-green-400 break-all mt-2">

              {subscription.paymentIntent ||
                "N/A"}

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}