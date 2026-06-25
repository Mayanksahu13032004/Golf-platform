"use client";

import {
  FaMoneyBillWave,
  FaHeart,
  FaWallet,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

export default function PaymentSummary({
  subscription,
}) {
  if (!subscription) return null;

  const membershipFee =
    subscription.amount || 499;

  const prizePool =
    subscription.prizePoolContribution || 0;

  const charity =
    subscription.charityContribution || 0;

  const renewal =
    subscription.endDate
      ? new Date(
          subscription.endDate
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        )
      : "N/A";

  const cards = [
    {
      title:
        "Membership Fee",
      value: `₹${membershipFee}`,
      icon: (
        <FaWallet className="text-3xl text-blue-400" />
      ),
      bg: "from-blue-700 to-blue-900",
    },

    {
      title:
        "Prize Pool",
      value: `₹${prizePool}`,
      icon: (
        <FaMoneyBillWave className="text-3xl text-green-400" />
      ),
      bg: "from-green-700 to-green-900",
    },

    {
      title:
        "Charity",
      value: `₹${charity}`,
      icon: (
        <FaHeart className="text-3xl text-red-400" />
      ),
      bg: "from-red-700 to-red-900",
    },
  ];

  return (
    <section className="space-y-8">

      <div>

        <h2 className="text-4xl font-bold text-white">
          Payment Summary
        </h2>

        <p className="text-zinc-400 mt-2">
          Overview of your current membership contribution.
        </p>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-6">

        {cards.map((item) => (

          <div
            key={item.title}
            className={`bg-gradient-to-r ${item.bg} rounded-3xl p-6 shadow-xl`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80">

                  {item.title}

                </p>

                <h2 className="text-4xl font-bold mt-3 text-white">

                  {item.value}

                </h2>

              </div>

              {item.icon}

            </div>

          </div>

        ))}

      </div>

      {/* Summary */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h2 className="text-2xl font-bold text-white mb-8">

          Membership Details

        </h2>

        <div className="space-y-6">

          <div className="flex justify-between border-b border-zinc-800 pb-4">

            <span className="text-zinc-400">

              Status

            </span>

            <span className="flex items-center gap-2 text-green-400 font-bold">

              <FaCheckCircle />

              ACTIVE

            </span>

          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-4">

            <span className="text-zinc-400">

              Plan

            </span>

            <span className="text-white font-semibold">

              {subscription.plan}

            </span>

          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-4">

            <span className="text-zinc-400">

              Membership Fee

            </span>

            <span className="text-white font-semibold">

              ₹{membershipFee}

            </span>

          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-4">

            <span className="text-zinc-400">

              Prize Pool Contribution

            </span>

            <span className="text-green-400 font-bold">

              ₹{prizePool}

            </span>

          </div>

          <div className="flex justify-between border-b border-zinc-800 pb-4">

            <span className="text-zinc-400">

              Charity Contribution

            </span>

            <span className="text-red-400 font-bold">

              ₹{charity}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="flex items-center gap-2 text-zinc-400">

              <FaCalendarAlt />

              Renewal Date

            </span>

            <span className="text-white font-semibold">

              {renewal}

            </span>

          </div>

        </div>

      </div>

    </section>
  );
}