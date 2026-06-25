"use client";

import {
  FaUsers,
  FaGift,
  FaHeart,
  FaCreditCard,
  FaTrophy,
  FaArrowRight,
} from "react-icons/fa";

export default function RecentActivity({
  dashboard,
}) {
  if (!dashboard) return null;

  const activities = [
    {
      icon: <FaUsers />,
      title: "Total Users",
      value: dashboard.totalUsers,
      color: "bg-blue-600",
      description:
        "Registered users on the platform",
    },

    {
      icon: <FaHeart />,
      title: "Charities",
      value: dashboard.totalCharities,
      color: "bg-red-600",
      description:
        "Registered charity organizations",
    },

    {
      icon: <FaTrophy />,
      title: "Prize Winners",
      value: dashboard.totalWinners,
      color: "bg-yellow-500",
      description:
        "Users who won prizes",
    },

    {
      icon: <FaCreditCard />,
      title: "Subscriptions",
      value:
        dashboard.activeSubscriptions,
      color: "bg-green-600",
      description:
        "Currently active subscriptions",
    },

    {
      icon: <FaGift />,
      title: "Golf Draw",
      value: "Live",
      color: "bg-purple-600",
      description:
        "Latest draw processing status",
    },
  ];

  return (
    <section className="space-y-6">

      {/* Header */}

      <div>

        <h2 className="text-3xl font-bold text-white">

          Recent Activity

        </h2>

        <p className="text-zinc-400 mt-2">

          Latest platform statistics

        </p>

      </div>

      {/* Timeline */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <div className="space-y-8">

          {activities.map(
            (
              activity,
              index
            ) => (
              <div
                key={index}
                className="flex gap-6"
              >

                {/* Icon */}

                <div
                  className={`${activity.color} w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0`}
                >
                  {activity.icon}
                </div>

                {/* Content */}

                <div className="flex-1 border-b border-zinc-800 pb-6">

                  <div className="flex justify-between items-center">

                    <div>

                      <h3 className="text-xl font-bold text-white">

                        {activity.title}

                      </h3>

                      <p className="text-zinc-400 mt-2">

                        {activity.description}

                      </p>

                    </div>

                    <div className="text-right">

                      <h2 className="text-4xl font-bold text-blue-400">

                        {activity.value}

                      </h2>

                      <p className="text-zinc-500 text-sm mt-2">

                        Updated Just Now

                      </p>

                    </div>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-3xl p-6">

          <h3 className="text-xl font-bold">

            Manage Winners

          </h3>

          <p className="mt-3 text-white/80">

            Review winner verification and payments.

          </p>

          <button className="mt-6 bg-white text-blue-700 px-5 py-3 rounded-xl font-bold flex items-center gap-2">

            Open

            <FaArrowRight />

          </button>

        </div>

        <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-3xl p-6">

          <h3 className="text-xl font-bold">

            Draw Management

          </h3>

          <p className="mt-3 text-white/80">

            Simulate and publish golf draws.

          </p>

          <button className="mt-6 bg-white text-green-700 px-5 py-3 rounded-xl font-bold flex items-center gap-2">

            Open

            <FaArrowRight />

          </button>

        </div>

        <div className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-3xl p-6">

          <h3 className="text-xl font-bold">

            Charity Management

          </h3>

          <p className="mt-3 text-white/80">

            Manage registered charities.

          </p>

          <button className="mt-6 bg-white text-purple-700 px-5 py-3 rounded-xl font-bold flex items-center gap-2">

            Open

            <FaArrowRight />

          </button>

        </div>

      </div>

    </section>
  );
}