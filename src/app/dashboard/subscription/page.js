"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import CurrentPlan from "@/components/subscription/CurrentPlan";
import SubscriptionCard from "@/components/subscription/SubscriptionCard";
import PlanBenefits from "@/components/subscription/PlanBenefits";
import PaymentSummary from "@/components/subscription/PaymentSummary";

export default function SubscriptionPage() {
  const [subscription, setSubscription] =
    useState(null);

const [loading, setLoading] =
  useState(true);

const [processingPlan, setProcessingPlan] =
  useState(null);

  const [processing, setProcessing] =
    useState(false);

  useEffect(() => {
    loadSubscription();
  }, []);

  async function loadSubscription() {
    try {
      const res =
        await api.get("/subscription");

      setSubscription(
        res.data.subscription
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
async function subscribe(plan) {
  try {
    setProcessingPlan(plan);

    const res = await api.post(
      "/payment/create-session",
      {
        plan,
      }
    );

    window.location.href =
      res.data.url;
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Payment Failed"
    );
  } finally {
    setProcessingPlan(null);
  }
}

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex justify-center items-center">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"/>

          <p className="text-zinc-400 mt-5">

            Loading Subscription...

          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Heading */}

        <div className="mb-10">

          <h1 className="text-3xl sm:text-4xl font-black text-white">

            Membership Plans

          </h1>

          <p className="text-zinc-400 mt-2">

            Upgrade your membership
            and participate in Golf
            Charity Draws.

          </p>

        </div>

        {/* Current Plan */}

        <CurrentPlan
          subscription={subscription}
        />

        {/* Plans */}

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

         <SubscriptionCard
  title="Monthly"
  price="500"
  plan="MONTHLY"
  active={
    subscription?.plan ===
    "MONTHLY"
  }
  processing={
    processingPlan ===
    "MONTHLY"
  }
  onSubscribe={subscribe}
/>

         <SubscriptionCard
  title="Yearly"
  price="5000"
  plan="YEARLY"
  active={
    subscription?.plan ===
    "YEARLY"
  }
  processing={
    processingPlan ===
    "YEARLY"
  }
  onSubscribe={subscribe}
/>

        </div>

        {/* Benefits */}

        <div className="mt-12">

          <PlanBenefits />

        </div>

        {/* Summary */}

        <div className="mt-12">

          <PaymentSummary
            subscription={
              subscription
            }
          />

        </div>

      </div>

    </div>
  );
}