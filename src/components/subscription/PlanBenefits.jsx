"use client";

import {
  FaTrophy,
  FaGift,
  FaHeart,
  FaEnvelope,
  FaLock,
  FaChartLine,
} from "react-icons/fa";

export default function PlanBenefits() {
  const benefits = [
    {
      title: "Monthly Golf Draw",
      description:
        "Participate automatically in every monthly golf charity draw.",
      icon: <FaTrophy className="text-4xl text-yellow-400" />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Prize Pool",
      description:
        "Become eligible to win exciting cash rewards from the prize pool.",
      icon: <FaGift className="text-4xl text-green-400" />,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Support Charity",
      description:
        "A portion of your subscription directly supports charitable causes.",
      icon: <FaHeart className="text-4xl text-red-400" />,
      color: "from-red-500 to-pink-600",
    },
    {
      title: "Winner Notifications",
      description:
        "Receive instant email notifications whenever you win a draw.",
      icon: <FaEnvelope className="text-4xl text-blue-400" />,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Secure Payments",
      description:
        "All payments are protected with Stripe's industry-leading security.",
      icon: <FaLock className="text-4xl text-purple-400" />,
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Premium Dashboard",
      description:
        "Track subscriptions, winnings, scores and payment history.",
      icon: <FaChartLine className="text-4xl text-cyan-400" />,
      color: "from-cyan-500 to-sky-600",
    },
  ];

  return (
    <section className="mt-12">

      {/* Heading */}

      <div className="text-center mb-10">

        <h2 className="text-3xl md:text-4xl font-black text-white">

          Membership Benefits

        </h2>

        <p className="text-zinc-400 mt-3 max-w-2xl mx-auto">

          Unlock premium golf features, participate in charity draws,
          win exciting rewards and support meaningful causes.

        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {benefits.map((item) => (

          <div
            key={item.title}
            className="group bg-zinc-900 border border-zinc-800 hover:border-blue-500 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            <div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6`}
            >

              {item.icon}

            </div>

            <h3 className="text-2xl font-bold text-white">

              {item.title}

            </h3>

            <p className="text-zinc-400 mt-4 leading-7">

              {item.description}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}