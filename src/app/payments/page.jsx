"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import PaymentStats from "@/components/payment/PaymentStats";
import PaymentTable from "@/components/payment/PaymentTable";
import PaymentCard from "@/components/payment/PaymentCard";

export default function PaymentsPage() {
  const [payments, setPayments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    try {
      setLoading(true);

      const res =
        await api.get(
          "/payment/history"
        );

      setPayments(
        res.data.payments || []
      );
    } catch (err) {
      toast.error(
        "Unable to load payments"
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"/>

          <p className="text-zinc-400 mt-5">

            Loading Payments...

          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* Header */}

        <div>

          <h1 className="text-3xl sm:text-5xl font-black">

            Payment History

          </h1>

          <p className="text-zinc-400 mt-2">

            View all your subscription
            payments and transactions.

          </p>

        </div>

        {/* Stats */}

        <PaymentStats
          payments={payments}
        />

        {/* Desktop Table */}

        <div className="hidden lg:block">

          <PaymentTable
            payments={payments}
          />

        </div>

        {/* Mobile Cards */}

        <div className="grid gap-6 lg:hidden">

          {payments.length === 0 ? (

            <div className="bg-zinc-900 rounded-3xl p-12 text-center border border-zinc-800">

              <h2 className="text-2xl font-bold">

                No Payments Found

              </h2>

            </div>

          ) : (

            payments.map((payment) => (

              <PaymentCard
                key={payment._id}
                payment={payment}
              />

            ))

          )}

        </div>

      </div>

    </div>
  );
}