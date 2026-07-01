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
  FaArrowRight,
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
      <div className="flex flex-col gap-4 justify-center items-center h-[70vh] bg-zinc-950 text-zinc-400 text-lg font-bold tracking-wide">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
          <div className="absolute w-6 h-6 border-4 border-indigo-500/10 border-b-indigo-400 rounded-full animate-spin animation-reverse" />
        </div>
        <span className="animate-pulse bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent font-extrabold">
          LOADING NEXT-LEVEL DASHBOARD...
        </span>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: <FaUsers className="text-blue-400 text-2xl group-hover:scale-110 transition-transform duration-300" />,
      glowColor: "hover:border-blue-500/40 hover:shadow-[0_0_25px_rgba(59,130,246,0.15)]",
      iconBg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Charities",
      value: data.totalCharities,
      icon: <FaHandsHelping className="text-emerald-400 text-2xl group-hover:scale-110 transition-transform duration-300" />,
      glowColor: "hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]",
      iconBg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Total Winners",
      value: data.totalWinners,
      icon: <FaTrophy className="text-amber-400 text-2xl group-hover:scale-110 transition-transform duration-300" />,
      glowColor: "hover:border-amber-500/40 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]",
      iconBg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Active Subscriptions",
      value: data.activeSubscriptions,
      icon: <FaMoneyBillWave className="text-purple-400 text-2xl group-hover:scale-110 transition-transform duration-300" />,
      glowColor: "hover:border-purple-500/40 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]",
      iconBg: "bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-10 selection:bg-emerald-500 selection:text-black">
      
      {/* Header */}
      <div className="mb-10 relative">
        <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent uppercase">
          Admin <span className="font-extrabold text-emerald-400">Dashboard</span>
        </h1>
        <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-2 max-w-xl">
          Welcome back. Here's a <span className="text-zinc-200 font-bold">Next-Level Overview</span> of your Golf Charity Platform.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`group bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1.5 backdrop-blur-sm ${card.glowColor}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                  {card.title}
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 text-white tracking-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 group-hover:bg-clip-text transition-all duration-300">
                  {card.value}
                </h2>
              </div>
              <div className={`p-3 rounded-xl ${card.iconBg} border flex-shrink-0 shadow-inner transition-all duration-300 group-hover:rotate-6`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action and Summary Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
        
        {/* Quick Actions */}
        <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl transition-all duration-500 group-hover:bg-indigo-500/10" />
          
          <h2 className="text-xl font-extrabold mb-5 text-white tracking-tight border-b border-zinc-800 pb-3 flex items-center gap-2">
            ✨ <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">Quick Actions</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/admin/charities"
              className="group/btn flex justify-between items-center bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl text-zinc-300 font-bold hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-zinc-900/40 active:scale-98 transition-all duration-200"
            >
              <span>Manage Charities</span>
              <FaHandsHelping className="text-zinc-500 transition-colors duration-200 group-hover/btn:text-emerald-400" />
            </Link>

            <Link
              href="/admin/draws"
              className="group/btn flex justify-between items-center bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl text-zinc-300 font-bold hover:text-blue-400 hover:border-blue-500/40 hover:bg-zinc-900/40 active:scale-98 transition-all duration-200"
            >
              <span>Manage Draws</span>
              <FaGolfBall className="text-zinc-500 transition-transform duration-500 group-hover/btn:rotate-180 group-hover/btn:text-blue-400" />
            </Link>

            <Link
              href="/admin/winners"
              className="group/btn flex justify-between items-center bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl text-zinc-300 font-bold hover:text-amber-400 hover:border-amber-500/40 hover:bg-zinc-900/40 active:scale-98 transition-all duration-200"
            >
              <span>Verify Winners</span>
              <FaTrophy className="text-zinc-500 transition-colors duration-200 group-hover/btn:text-amber-400" />
            </Link>

            <Link
              href="/admin/analytics"
              className="group/btn flex justify-between items-center bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl text-zinc-300 font-bold hover:text-purple-400 hover:border-purple-500/40 hover:bg-zinc-900/40 active:scale-98 transition-all duration-200"
            >
              <span>Analytics Dashboard</span>
              <FaChartLine className="text-zinc-500 transition-colors duration-200 group-hover/btn:text-purple-400" />
            </Link>
          </div>
        </div>

        {/* Platform Summary */}
        <div className="bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl transition-all duration-500 group-hover:bg-emerald-500/10" />
          
          <h2 className="text-xl font-extrabold mb-5 text-white tracking-tight border-b border-zinc-800 pb-3">
            📊 <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">Platform Summary</span>
          </h2>

          <div className="space-y-3.5">
            <div className="group/item flex justify-between items-center bg-zinc-900/40 px-4 py-3.5 rounded-xl border border-zinc-800/50 hover:border-zinc-700/60 transition-all duration-200">
              <span className="text-sm font-bold text-zinc-400 group-hover/item:text-zinc-300 transition-colors">Total Platform Users</span>
              <span className="text-base font-black text-white bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700">{data.totalUsers}</span>
            </div>

            <div className="group/item flex justify-between items-center bg-zinc-900/40 px-4 py-3.5 rounded-xl border border-zinc-800/50 hover:border-zinc-700/60 transition-all duration-200">
              <span className="text-sm font-bold text-zinc-400 group-hover/item:text-zinc-300 transition-colors">Registered Charities</span>
              <span className="text-base font-black text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-md border border-emerald-900/50">{data.totalCharities}</span>
            </div>

            <div className="group/item flex justify-between items-center bg-zinc-900/40 px-4 py-3.5 rounded-xl border border-zinc-800/50 hover:border-zinc-700/60 transition-all duration-200">
              <span className="text-sm font-bold text-zinc-400 group-hover/item:text-zinc-300 transition-colors">Total Verified Winners</span>
              <span className="text-base font-black text-amber-400 bg-amber-950/50 px-2.5 py-1 rounded-md border border-amber-900/50">{data.totalWinners}</span>
            </div>

            <div className="group/item flex justify-between items-center bg-zinc-900/40 px-4 py-3.5 rounded-xl border border-zinc-800/50 hover:border-zinc-700/60 transition-all duration-200">
              <span className="text-sm font-bold text-zinc-400 group-hover/item:text-zinc-300 transition-colors">Active Subscriptions</span>
              <span className="text-base font-black text-purple-400 bg-purple-950/50 px-2.5 py-1 rounded-md border border-purple-900/50">{data.activeSubscriptions}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}