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
      toast.error("Unable to load analytics data smoothly");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-[70vh] bg-zinc-950 text-zinc-400 text-lg font-bold tracking-wide">
        <div className="relative flex items-center justify-center">
          {/* Next-Level Double Spin Ring Animation */}
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
          <div className="absolute w-6 h-6 border-4 border-indigo-500/10 border-b-indigo-400 rounded-full animate-spin [animation-direction:reverse]" />
        </div>
        <span className="animate-pulse bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500 bg-clip-text text-transparent font-extrabold uppercase tracking-widest text-sm">
          Compiling Deep Analytics...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-10 selection:bg-emerald-500 selection:text-black space-y-8 sm:space-y-10">
      
      {/* Page Header */}
      <div className="relative group">
        {/* Glow ambient effect behind header */}
        <div className="absolute top-0 left-0 w-48 h-20 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/10" />
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent uppercase">
          Analytics <span className="text-emerald-400 font-extrabold">Dashboard</span>
        </h1>
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-400 mt-2">
          🎯 Complete platform overview with <span className="text-zinc-200 font-extrabold">Real-Time Data Streams</span>.
        </p>
      </div>

      {/* Analytics Data Components Container */}
      <div className="space-y-8 sm:space-y-10 transition-all duration-500">
        
        {/* Analytics Cards Row */}
        <div className="transition-transform duration-300 hover:scale-[1.002]">
          <AnalyticsCards analytics={analytics} />
        </div>

        {/* Administration Core Stats */}
        <div className="transition-transform duration-300 hover:scale-[1.002]">
          <AdminStats dashboard={dashboard} />
        </div>

        {/* Premium Revenue Chart Native Wrapper */}
        <div className="relative group bg-zinc-900/20 border border-zinc-900 rounded-2xl p-5 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-zinc-800/80 hover:shadow-[0_0_30px_rgba(16,185,129,0.03)] overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/[0.04]" />
          <RevenueChart analytics={analytics} />
        </div>

        {/* Recent Platform Feed Activity */}
        <div className="transition-transform duration-300 hover:scale-[1.002]">
          <RecentActivity dashboard={dashboard} />
        </div>
      </div>

    </div>
  );
}