"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

import {
  FaUsers,
  FaHandsHelping,
  FaTrophy,
  FaMoneyBillWave,
  FaChartLine,
  FaGolfBall,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard/admin");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-[70vh] text-zinc-400 text-lg font-medium">
        <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: <FaUsers className="text-blue-400 text-2xl" />,
      glowColor: "group-hover:border-blue-500/30",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Charities",
      value: data.totalCharities,
      icon: <FaHandsHelping className="text-emerald-400 text-2xl" />,
      glowColor: "group-hover:border-emerald-500/30",
      iconBg: "bg-emerald-500/10",
    },
    {
      title: "Total Winners",
      value: data.totalWinners,
      icon: <FaTrophy className="text-amber-400 text-2xl" />,
      glowColor: "group-hover:border-amber-500/30",
      iconBg: "bg-amber-500/10",
    },
    {
      title: "Active Subscriptions",
      value: data.activeSubscriptions,
      icon: <FaMoneyBillWave className="text-purple-400 text-2xl" />,
      glowColor: "group-hover:border-purple-500/30",
      iconBg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-8">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-100">
          Admin Dashboard
        </h1>
        <p className="text-sm text-zinc-400 mt-2">
          Welcome back. Here's an overview of your Golf Charity Platform.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`group bg-zinc-900/40 border border-zinc-900 rounded-2xl p-6 transition-all duration-300 hover:bg-zinc-900/80 hover:-translate-y-1 ${card.glowColor}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                  {card.title}
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-zinc-100 tracking-tight">
                  {card.value}
                </h2>
              </div>
              <div className={`p-3 rounded-xl ${card.iconBg} border border-zinc-800 flex-shrink-0`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action and Summary Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        
        {/* Quick Actions */}
        <div className="bg-zinc-900/40 border border-zinc-900/80 rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl font-bold mb-5 text-zinc-100 tracking-tight border-b border-zinc-900 pb-3">
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/admin/charities"
              className="flex justify-between items-center bg-zinc-900 border border-zinc-800/80 p-4 rounded-xl text-zinc-300 font-medium hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-zinc-900/80 transition-all duration-200"
            >
              <span>Manage Charities</span>
              <FaHandsHelping className="text-zinc-500 group-hover:text-emerald-400" />
            </Link>

            <Link
              href="/admin/draws"
              className="flex justify-between items-center bg-zinc-900 border border-zinc-800/80 p-4 rounded-xl text-zinc-300 font-medium hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-zinc-900/80 transition-all duration-200"
            >
              <span>Manage Draws</span>
              <FaGolfBall className="text-zinc-500" />
            </Link>

            <Link
              href="/admin/winners"
              className="flex justify-between items-center bg-zinc-900 border border-zinc-800/80 p-4 rounded-xl text-zinc-300 font-medium hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-zinc-900/80 transition-all duration-200"
            >
              <span>Verify Winners</span>
              <FaTrophy className="text-zinc-500" />
            </Link>

            <Link
              href="/admin/analytics"
              className="flex justify-between items-center bg-zinc-900 border border-zinc-800/80 p-4 rounded-xl text-zinc-300 font-medium hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-zinc-900/80 transition-all duration-200"
            >
              <span>Analytics</span>
              <FaChartLine className="text-zinc-500" />
            </Link>
          </div>
        </div>

        {/* Platform Summary */}
        <div className="bg-zinc-900/40 border border-zinc-900/80 rounded-2xl p-5 sm:p-6">
          <h2 className="text-xl font-bold mb-5 text-zinc-100 tracking-tight border-b border-zinc-900 pb-3">
            Platform Summary
          </h2>

          <div className="space-y-3.5">
            <div className="flex justify-between items-center bg-zinc-900/30 px-4 py-3 rounded-xl border border-zinc-900/50">
              <span className="text-sm font-medium text-zinc-400">Total Users</span>
              <span className="text-base font-bold text-zinc-200">{data.totalUsers}</span>
            </div>

            <div className="flex justify-between items-center bg-zinc-900/30 px-4 py-3 rounded-xl border border-zinc-900/50">
              <span className="text-sm font-medium text-zinc-400">Charities</span>
              <span className="text-base font-bold text-zinc-200">{data.totalCharities}</span>
            </div>

            <div className="flex justify-between items-center bg-zinc-900/30 px-4 py-3 rounded-xl border border-zinc-900/50">
              <span className="text-sm font-medium text-zinc-400">Prize Winners</span>
              <span className="text-base font-bold text-zinc-200">{data.totalWinners}</span>
            </div>

            <div className="flex justify-between items-center bg-zinc-900/30 px-4 py-3 rounded-xl border border-zinc-900/50">
              <span className="text-sm font-medium text-zinc-400">Subscriptions</span>
              <span className="text-base font-bold text-zinc-200">{data.activeSubscriptions}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}