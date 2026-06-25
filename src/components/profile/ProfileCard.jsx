"use client";

import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaCrown,
  FaEdit,
} from "react-icons/fa";

export default function ProfileCard({
  user,
  onEdit,
}) {
  const memberSince = user?.createdAt
    ? new Date(
        user.createdAt
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl overflow-hidden">

      {/* Header */}

      <div className="h-32 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700" />

      {/* Avatar */}

      <div className="px-8 pb-8">

        <div className="-mt-16">

          <div className="w-32 h-32 rounded-full bg-blue-600 border-4 border-zinc-900 flex items-center justify-center text-5xl font-bold text-white shadow-lg">

            {user?.name
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

        </div>

        <div className="mt-5">

          <h1 className="text-4xl font-extrabold text-white">

            {user?.name}

          </h1>

          <span className="inline-block mt-3 bg-green-600 px-4 py-1 rounded-full text-sm font-bold">

            {user?.role}

          </span>

        </div>

        <div className="mt-8 space-y-5">

          <div className="flex items-center gap-4">

            <FaEnvelope className="text-blue-400 text-xl" />

            <div>

              <p className="text-zinc-500 text-sm">
                Email
              </p>

              <p className="text-white font-semibold">

                {user?.email}

              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <FaUser className="text-purple-400 text-xl" />

            <div>

              <p className="text-zinc-500 text-sm">
                Subscription
              </p>

              <p className="text-white font-semibold">

                {user?.isSubscribed
                  ? "Active"
                  : "Inactive"}

              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <FaCalendarAlt className="text-yellow-400 text-xl" />

            <div>

              <p className="text-zinc-500 text-sm">
                Member Since
              </p>

              <p className="text-white font-semibold">

                {memberSince}

              </p>

            </div>

          </div>

        </div>

        <button
          onClick={onEdit}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 flex items-center justify-center gap-3 font-bold"
        >

          <FaEdit />

          Edit Profile

        </button>

      </div>

    </div>
  );
}