"use client";

import {
  FaGolfBall,
  FaHeart,
  FaGift,
  FaChartLine,
  FaEnvelope,
  FaTrophy,
} from "react-icons/fa";

export default function PlanBenefits() {
  const benefits = [
    {
      title: "Monthly Golf Draws",
      description:
        "Participate in exciting monthly golf prize draws.",
      icon: <FaGolfBall className="text-4xl text-blue-400" />,
    },
    {
      title: "Charity Contribution",
      description:
        "A portion of every subscription supports charity organizations.",
      icon: <FaHeart className="text-4xl text-red-400" />,
    },
    {
      title: "Cash Rewards",
      description:
        "Win attractive prizes every month based on your golf scores.",
      icon: <FaGift className="text-4xl text-green-400" />,
    },
    {
      title: "Performance Dashboard",
      description:
        "Track scores, winnings, subscriptions and progress.",
      icon: <FaChartLine className="text-4xl text-yellow-400" />,
    },
    {
      title: "Email Notifications",
      description:
        "Receive winner announcements and important updates instantly.",
      icon: <FaEnvelope className="text-4xl text-purple-400" />,
    },
    {
      title: "Verified Winners",
      description:
        "Secure prize verification with document upload and admin approval.",
      icon: <FaTrophy className="text-4xl text-orange-400" />,
    },
  ];

  return (
    <section>

      <div className="mb-8">

        <h2 className="text-4xl font-bold text-white">
          Why Choose Our Membership?
        </h2>

        <p className="text-zinc-400 mt-3">
          Unlock exclusive golf experiences while making a positive
          impact through charitable contributions.
        </p>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {benefits.map((benefit) => (

          <div
            key={benefit.title}
            className="bg-zinc-900 border border-zinc-800 hover:border-blue-500 rounded-2xl p-6 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >

            <div className="mb-5">

              {benefit.icon}

            </div>

            <h3 className="text-2xl font-bold text-white mb-3">

              {benefit.title}

            </h3>

            <p className="text-zinc-400 leading-7">

              {benefit.description}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}