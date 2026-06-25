"use client";

import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="py-24 px-6 text-center">

      <h1 className="text-5xl md:text-7xl font-extrabold max-w-5xl mx-auto">
        Play Golf.
        Win Rewards.
        Change Lives.
      </h1>

      <p className="mt-8 text-zinc-400 text-lg max-w-2xl mx-auto">
        Enter your scores, support charities,
        and compete for monthly prize pools.
      </p>

      <div className="mt-10 flex justify-center gap-4">

        {!user ? (
          <>
            <Link
              href="/register"
              className="bg-blue-600 px-8 py-3 rounded-xl font-bold"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="border border-zinc-700 px-8 py-3 rounded-xl"
            >
              Login
            </Link>
          </>
        ) : user.role === "ADMIN" ? (
          <Link
            href="/admin"
            className="bg-green-600 px-8 py-3 rounded-xl font-bold"
          >
            Go To Admin Panel
          </Link>
        ) : (
          <Link
            href="/dashboard"
            className="bg-green-600 px-8 py-3 rounded-xl font-bold"
          >
            Go To Dashboard
          </Link>
        )}

      </div>

    </section>
  );
}