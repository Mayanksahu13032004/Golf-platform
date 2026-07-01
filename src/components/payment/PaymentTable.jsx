"use client";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaReceipt,
} from "react-icons/fa";

export default function PaymentTable({
  payments = [],
}) {
  if (payments.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-20 text-center">

        <FaReceipt className="text-6xl text-zinc-600 mx-auto mb-6" />

        <h2 className="text-3xl font-bold text-white">

          No Payments Found

        </h2>

        <p className="text-zinc-500 mt-3">

          Your payment history will appear here.

        </p>

      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

      {/* Header */}

      <div className="px-8 py-6 border-b border-zinc-800">

        <h2 className="text-2xl font-black text-white">

          Payment History

        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr className="text-left">

              <th className="px-6 py-4">
                Date
              </th>

              <th className="px-6 py-4">
                Plan
              </th>

              <th className="px-6 py-4">
                Amount
              </th>

              <th className="px-6 py-4">
                Charity
              </th>

              <th className="px-6 py-4">
                Prize Pool
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4">
                Payment ID
              </th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr
                key={payment._id}
                className="border-b border-zinc-800 hover:bg-zinc-800/60 transition"
              >

                {/* Date */}

                <td className="px-6 py-5 text-zinc-300 whitespace-nowrap">

                  {new Date(
                    payment.createdAt
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}

                </td>

                {/* Plan */}

                <td className="px-6 py-5">

                  <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-bold">

                    {payment.plan}

                  </span>

                </td>

                {/* Amount */}

                <td className="px-6 py-5 font-bold text-green-400">

                  ₹{payment.amount}

                </td>

                {/* Charity */}

                <td className="px-6 py-5 text-pink-400 font-semibold">

                  ₹
                  {payment.charityContribution}

                </td>

                {/* Prize Pool */}

                <td className="px-6 py-5 text-yellow-400 font-semibold">

                  ₹
                  {payment.prizePoolContribution}

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  {payment.status ===
                  "ACTIVE" ? (

                    <span className="bg-green-600 px-4 py-2 rounded-full inline-flex items-center gap-2">

                      <FaCheckCircle />

                      Active

                    </span>

                  ) : (

                    <span className="bg-red-600 px-4 py-2 rounded-full inline-flex items-center gap-2">

                      <FaTimesCircle />

                      {payment.status}

                    </span>

                  )}

                </td>

                {/* Payment ID */}

                <td className="px-6 py-5">

                  <span className="text-cyan-400 text-sm break-all">

                    {payment.paymentIntent ||
                      "-"}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}