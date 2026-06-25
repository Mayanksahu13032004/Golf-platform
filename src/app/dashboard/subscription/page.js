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

  useEffect(() => {
    loadSubscription();
  }, []);

  async function loadSubscription() {
    try {
      const res =
        await api.get(
          "/subscription"
        );

      setSubscription(
        res.data.subscription
      );
    } catch {
      toast.error(
        "Unable to load subscription"
      );
    } finally {
      setLoading(false);
    }
  }

  async function subscribe(type) {
    try {
      await api.post(
        "/subscription",
        {
          plan: type,
        }
      );

      toast.success(
        `${type} Plan Activated`
      );

      loadSubscription();
    } catch (err) {
      toast.error(
        err.response?.data
          ?.message ||
          "Subscription Failed"
      );
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"/>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Subscription
        </h1>

        <p className="text-zinc-400 mt-2">
          Manage your membership plan.
        </p>

      </div>

      <CurrentPlan
        subscription={subscription}
      />

      <div className="grid lg:grid-cols-2 gap-8">

        <SubscriptionCard
          title="Monthly"
          price="₹499"
          description="Perfect for casual golfers."
          plan="MONTHLY"
          active={
            subscription?.plan ===
            "MONTHLY"
          }
          onSubscribe={
            subscribe
          }
        />

        <SubscriptionCard
          title="Yearly"
          price="₹4999"
          description="Save more with yearly membership."
          plan="YEARLY"
          active={
            subscription?.plan ===
            "YEARLY"
          }
          onSubscribe={
            subscribe
          }
        />

      </div>

      <PlanBenefits />

      <PaymentSummary
        subscription={subscription}
      />

    </div>
  );
}