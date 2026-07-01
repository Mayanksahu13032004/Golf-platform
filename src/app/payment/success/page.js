"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

import {
  FaCheckCircle,
  FaCrown,
  FaGift,
  FaArrowRight,
} from "react-icons/fa";

export default function PaymentSuccessPage() {
  const [loading, setLoading] =
    useState(true);

  const [data, setData] =
    useState(null);

  useEffect(() => {
    verifyPayment();
  }, []);

  async function verifyPayment() {
    try {
      const res =
        await api.get(
          "/payment/verify"
        );

      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"/>

          <p className="text-white mt-6 text-lg">
            Verifying Payment...
          </p>

        </div>

      </div>
    );
  }

  if (!data?.success) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center text-white">

        Payment verification failed.

      </div>
    );
  }

  const subscription =
    data.subscription;

  return (
    <div className="min-h-screen bg-zinc-950 py-16 px-5">

      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-center py-10">

          <FaCheckCircle className="text-7xl text-white mx-auto"/>

          <h1 className="text-4xl font-black text-white mt-5">

            Payment Successful

          </h1>

          <p className="text-green-100 mt-3">

            Your membership has been activated.

          </p>

        </div>

        {/* Body */}

        <div className="p-8">

          {/* Plan */}

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-zinc-800 rounded-2xl p-5">

              <p className="text-zinc-400">
                Membership
              </p>

              <h2 className="text-3xl text-white font-bold mt-2">

                {subscription.plan}

              </h2>

            </div>

            <div className="bg-zinc-800 rounded-2xl p-5">

              <p className="text-zinc-400">
                Status
              </p>

              <h2 className="text-3xl text-green-400 font-bold mt-2">

                {subscription.status}

              </h2>

            </div>

          </div>

          {/* Summary */}

          <div className="bg-zinc-800 rounded-2xl p-6 mt-8 space-y-5">

            <h2 className="text-2xl text-white font-bold">

              Payment Summary

            </h2>

            <div className="flex justify-between">

              <span className="text-zinc-400">

                Amount

              </span>

              <span className="text-white font-bold">

                ₹{subscription.amount}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-400">

                Charity

              </span>

              <span className="text-green-400 font-bold">

                ₹
                {
                  subscription.charityContribution
                }

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-400">

                Prize Pool

              </span>

              <span className="text-blue-400 font-bold">

                ₹
                {
                  subscription.prizePoolContribution
                }

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-400">

                Start Date

              </span>

              <span className="text-white">

                {new Date(
                  subscription.startDate
                ).toLocaleDateString()}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-400">

                Expiry

              </span>

              <span className="text-white">

                {new Date(
                  subscription.endDate
                ).toLocaleDateString()}

              </span>

            </div>

          </div>

          {/* Benefits */}

          <div className="mt-8 bg-zinc-800 rounded-2xl p-6">

            <h2 className="text-white text-2xl font-bold flex items-center gap-3">

              <FaGift/>

              Premium Benefits

            </h2>

            <div className="mt-5 space-y-3 text-zinc-300">

              <p>

                ✓ Eligible for Monthly Golf Draw

              </p>

              <p>

                ✓ Eligible for Prize Pool

              </p>

              <p>

                ✓ Winner Email Notifications

              </p>

              <p>

                ✓ Charity Contribution Included

              </p>

              <p>

                ✓ Premium Dashboard Access

              </p>

            </div>

          </div>

          {/* Buttons */}

          <div className="grid md:grid-cols-2 gap-5 mt-10">

            <Link
              href="/dashboard"
              className="bg-green-600 hover:bg-green-700 rounded-xl py-4 font-bold flex justify-center items-center gap-3"
            >

              <FaArrowRight/>

              Go To Dashboard

            </Link>

            <Link
              href="/subscription"
              className="bg-blue-600 hover:bg-blue-700 rounded-xl py-4 font-bold flex justify-center items-center gap-3"
            >

              <FaCrown/>

              View Subscription

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}