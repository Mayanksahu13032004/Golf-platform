"use client";

import Link from "next/link";

import {
  FaTimesCircle,
  FaArrowLeft,
  FaRedo,
  FaCreditCard,
} from "react-icons/fa";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center px-5">

      <div className="max-w-2xl w-full bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-red-600 to-rose-700 py-10 text-center">

          <FaTimesCircle className="text-7xl text-white mx-auto" />

          <h1 className="text-4xl font-black text-white mt-5">

            Payment Cancelled

          </h1>

          <p className="text-red-100 mt-3">

            Your payment was cancelled.
            No amount has been deducted.

          </p>

        </div>

        {/* Body */}

        <div className="p-8">

          <div className="bg-zinc-800 rounded-2xl p-6">

            <h2 className="text-2xl text-white font-bold">

              What happened?

            </h2>

            <div className="mt-5 space-y-4 text-zinc-300">

              <p>

                • You cancelled the payment before completion.

              </p>

              <p>

                • Your subscription is still inactive.

              </p>

              <p>

                • You can upgrade anytime.

              </p>

              <p>

                • No payment has been charged.

              </p>

            </div>

          </div>

          {/* Buttons */}

          <div className="grid md:grid-cols-2 gap-5 mt-8">

            <Link
              href="/subscription"
              className="bg-green-600 hover:bg-green-700 rounded-xl py-4 flex justify-center items-center gap-3 font-bold transition"
            >

              <FaRedo />

              Try Again

            </Link>

            <Link
              href="/dashboard"
              className="bg-zinc-700 hover:bg-zinc-600 rounded-xl py-4 flex justify-center items-center gap-3 font-bold transition"
            >

              <FaArrowLeft />

              Dashboard

            </Link>

          </div>

          {/* Footer */}

          <div className="mt-10 border-t border-zinc-800 pt-6">

            <div className="flex justify-center items-center gap-3 text-zinc-400">

              <FaCreditCard />

              Secure payments are powered by Stripe.

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}