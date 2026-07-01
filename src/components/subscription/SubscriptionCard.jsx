"use client";

import {
  FaCheckCircle,
  FaCrown,
  FaSpinner,
} from "react-icons/fa";

export default function SubscriptionCard({
  title,
  plan,
  price,
  active,
  processing,
  onSubscribe,
}) {
  const features = [
    "Participate in Monthly Draws",
    "Eligible for Prize Pool",
    "Winner Email Notifications",
    "Premium Dashboard Access",
    "Support Charity Program",
  ];

  return (
    <div
      className={`relative rounded-3xl border overflow-hidden transition-all duration-300
      ${
        active
          ? "border-green-500 shadow-green-900/30 shadow-2xl"
          : "border-zinc-800 hover:border-blue-500"
      }
      bg-zinc-900`}
    >
      {/* Active Badge */}

      {active && (
        <div className="absolute top-5 right-5 bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full">

          ACTIVE

        </div>
      )}

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8">

        <div className="flex items-center gap-3">

          <FaCrown className="text-yellow-300 text-3xl" />

          <h2 className="text-3xl font-black text-white">

            {title}

          </h2>

        </div>

        <h1 className="text-5xl font-black text-white mt-6">

          ₹{price}

        </h1>

        <p className="text-blue-100 mt-3">

          {plan === "MONTHLY"
            ? "Billed every month"
            : "Billed every year"}

        </p>

      </div>

      {/* Features */}

      <div className="p-8">

        <h3 className="text-xl font-bold text-white mb-6">

          What's Included

        </h3>

        <div className="space-y-4">

          {features.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3"
            >
              <FaCheckCircle className="text-green-500 flex-shrink-0" />

              <span className="text-zinc-300">

                {item}

              </span>
            </div>
          ))}

        </div>

        {/* Charity Info */}

        <div className="mt-8 bg-zinc-800 rounded-2xl p-5">

          <div className="flex justify-between">

            <span className="text-zinc-400">

              Charity

            </span>

            <span className="text-green-400 font-bold">

              10%

            </span>

          </div>

          <div className="flex justify-between mt-3">

            <span className="text-zinc-400">

              Prize Pool

            </span>

            <span className="text-yellow-400 font-bold">

              45%

            </span>

          </div>

        </div>

        {/* Button */}

     <button
  disabled={active || processing}
  onClick={() =>
    onSubscribe(plan)
  }
  className="..."
>
  {processing ? (
    <>
      <FaSpinner className="animate-spin" />
      Processing...
    </>
  ) : active ? (
    "Current Plan"
  ) : (
    "Upgrade Now"
  )}
</button>

      </div>
    </div>
  );
}