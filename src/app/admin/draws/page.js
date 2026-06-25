"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import DrawStats from "@/components/admin/draw/DrawStats";
import DrawTable from "@/components/admin/draw/DrawTable";
import SimulateDrawModal from "@/components/admin/draw/SimulateDrawModal";
import PublishDrawModal from "@/components/admin/draw/PublishDrawModal";
import ViewDrawModal from "@/components/admin/draw/ViewDrawModal";

import { FaDice } from "react-icons/fa";

export default function DrawManagement() {
  const [draws, setDraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [simulateOpen, setSimulateOpen] = useState(false);
  const [publishDraw, setPublishDraw] = useState(null);
  const [viewDraw, setViewDraw] = useState(null);

  useEffect(() => {
    fetchDraws();
  }, []);

  async function fetchDraws() {
    try {
      setLoading(true);
      const res = await api.get("/draw");
      setDraws(res.data.draws || []);
    } catch (err) {
      toast.error("Unable to load draws");
    } finally {
      setLoading(false);
    }
  }

  if (loading && draws.length === 0) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-[70vh] text-zinc-400 text-lg font-medium bg-zinc-950">
        <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        Loading Draws Platform...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-100">
            Draw Management
          </h1>
          <p className="text-sm text-zinc-400 mt-1 sm:mt-2">
            Simulate, publish and monitor golf draws.
          </p>
        </div>

        <div className="flex items-center sm:justify-end flex-shrink-0">
          <button
            onClick={() => setSimulateOpen(true)}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-zinc-950 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl flex items-center justify-center gap-2.5 font-bold text-sm transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-900/10"
          >
            <FaDice className="text-base" />
            Simulate Draw
          </button>
        </div>
      </div>

      {/* Statistics Section Layout */}
      <div className="bg-zinc-900/10 rounded-2xl border border-zinc-900/40 p-1">
        <DrawStats draws={draws} />
      </div>

      {/* Draw History Table Data View */}
      <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden">
        <DrawTable
          loading={loading}
          draws={draws}
          onView={setViewDraw}
          onPublish={setPublishDraw}
        />
      </div>

      {/* Modals Mounting Points */}
      {simulateOpen && (
        <SimulateDrawModal
          onClose={() => setSimulateOpen(false)}
          onSuccess={fetchDraws}
        />
      )}

      {publishDraw && (
        <PublishDrawModal
          draw={publishDraw}
          onClose={() => setPublishDraw(null)}
          onSuccess={fetchDraws}
        />
      )}

      {viewDraw && (
        <ViewDrawModal
          draw={viewDraw}
          onClose={() => setViewDraw(null)}
        />
      )}

    </div>
  );
}