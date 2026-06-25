"use client";

import {
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

export default function SubscriptionCard({
  title,
  price,
  description,
  plan,
  active,
  onSubscribe,
}) {
  const benefits = [
    "Participate in Monthly Draws",
    "Support Charity",
    "Store Latest 5 Golf Scores",
    "Winner Verification",
    "Email Notifications",
    "Dashboard Analytics",
  ];

  return (
    <div
      className={`relative rounded-3xl border transition-all duration-300 overflow-hidden ${
        active
          ? "border-green-500 bg-gradient-to-br from-green-900 to-zinc-900 shadow-green-500/20 shadow-2xl"
          : "border-zinc-800 bg-zinc-900 hover:border-blue-500 hover:shadow-blue-500/20 hover:shadow-xl"
      }`}
    >
      {/* Recommended Badge */}

      {title === "Yearly" && (
        <div className="absolute top-5 right-5 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
          <FaStar />
          Recommended
        </div>
      )}

      <div className="p-8">

        <h2 className="text-3xl font-bold text-white">
          {title}
        </h2>

        <p className="text-zinc-400 mt-2">
          {description}
        </p>

        <div className="mt-8">

          <span className="text-5xl font-extrabold text-white">
            {price}
          </span>

          <span className="text-zinc-400 ml-2">
            / Membership
          </span>

        </div>

        <div className="mt-10 space-y-4">

          {benefits.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3"
            >
              <FaCheckCircle className="text-green-500" />

              <span className="text-zinc-300">
                {item}
              </span>
            </div>
          ))}

        </div>

        <button
          disabled={active}
          onClick={() =>
            onSubscribe(plan)
          }
          className={`mt-10 w-full rounded-xl py-4 text-lg font-bold transition-all duration-300 ${
            active
              ? "bg-green-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {active
            ? "Current Plan"
            : title === "Yearly"
            ? "Upgrade Now"
            : "Subscribe Now"}
        </button>

      </div>
    </div>
  );
}