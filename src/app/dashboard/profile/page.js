"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import ProfileCard from "@/components/profile/ProfileCard";
import ProfileStats from "@/components/profile/ProfileStats";
import EditProfileModal from "@/components/profile/EditProfileModal";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  const [scores, setScores] = useState([]);

  const [winnings, setWinnings] = useState([]);

  const [subscription, setSubscription] =
    useState(null);

  const [showEdit, setShowEdit] =
    useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);

      const [
        profileRes,
        scoreRes,
        dashboardRes,
      ] = await Promise.all([
        api.get("/auth/profile"),
        api.get("/score"),
        api.get("/dashboard/user"),
      ]);

      setUser(profileRes.data.user);

      setScores(
        scoreRes.data.scores || []
      );

      setWinnings(
        dashboardRes.data.winnings || []
      );

      setSubscription(
        dashboardRes.data.subscription || {}
      );
    } catch (err) {
      toast.error(
        "Unable to load profile"
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">

        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h1 className="text-4xl font-extrabold text-white">
          My Profile
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your account information and view your golf statistics.
        </p>

      </div>

      {/* Grid */}

      <div className="grid lg:grid-cols-3 gap-8">

        {/* Left */}

        <div>

          <ProfileCard
            user={user}
            onEdit={() =>
              setShowEdit(true)
            }
          />

        </div>

        {/* Right */}

        <div className="lg:col-span-2 space-y-8">

          <ProfileStats
            scores={scores}
            winnings={winnings}
            subscription={subscription}
          />

          {/* Recent Scores */}

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">

            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Scores
            </h2>

            {scores.length === 0 ? (
              <p className="text-zinc-500">
                No scores available.
              </p>
            ) : (
              <div className="space-y-4">

                {scores.map(
                  (item) => (
                    <div
                      key={item._id}
                      className="flex justify-between bg-zinc-800 rounded-xl p-4"
                    >
                      <div>

                        <p className="text-white font-semibold">
                          Golf Score
                        </p>

                        <p className="text-zinc-400 text-sm">
                          {new Date(
                            item.scoreDate
                          ).toLocaleDateString()}
                        </p>

                      </div>

                      <div className="text-3xl font-bold text-blue-400">

                        {item.score}

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

          {/* Recent Winnings */}

          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">

            <h2 className="text-2xl font-bold text-white mb-6">
              Recent Winnings
            </h2>

            {winnings.length === 0 ? (
              <p className="text-zinc-500">
                No winnings yet.
              </p>
            ) : (
              <div className="space-y-4">

                {winnings.map(
                  (item) => (
                    <div
                      key={item._id}
                      className="flex justify-between bg-zinc-800 rounded-xl p-4"
                    >
                      <div>

                        <p className="text-white font-semibold">
                          Match
                          {" "}
                          {item.matchCount}
                        </p>

                        <p className="text-zinc-400 text-sm">
                          {item.status}
                        </p>

                      </div>

                      <div className="text-2xl font-bold text-green-400">

                        ₹{item.amount}

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Edit Modal */}

      {showEdit && (
        <EditProfileModal
          user={user}
          onClose={() =>
            setShowEdit(false)
          }
          onSuccess={loadProfile}
        />
      )}

    </div>
  );
}