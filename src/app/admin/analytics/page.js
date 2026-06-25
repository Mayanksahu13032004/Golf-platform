"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import AnalyticsCards from "@/components/admin/analytics/AnalyticsCards";
import RevenueChart from "@/components/admin/analytics/RevenueChart";
import AdminStats from "@/components/admin/analytics/AdminStats";
import RecentActivity from "@/components/admin/analytics/RecentActivity";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      setLoading(true);

      const [analyticsRes, dashboardRes] = await Promise.all([
        api.get("/admin/analytics"),
        api.get("/dashboard/admin"),
      ]);

      setAnalytics(analyticsRes.data.analytics);
      setDashboard(dashboardRes.data);
    } catch (err) {
      toast.error("Unable to load analytics");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-[70vh] text-zinc-400 text-lg font-medium bg-zinc-950">
        <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-100">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          Complete business overview
        </p>
      </div>

      {/* Analytics Data Components */}
      <div className="space-y-6 sm:space-y-8">
        <AnalyticsCards analytics={analytics} />

        <AdminStats dashboard={dashboard} />

        {/* Wrapper to contain layouts natively if charts lack custom borders */}
        <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl p-4 sm:p-6">
          <RevenueChart analytics={analytics} />
        </div>

        <RecentActivity dashboard={dashboard} />
      </div>

    </div>
  );
}