"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import WinnerStats from "@/components/admin/winner/WinnerStats";
import WinnerSearch from "@/components/admin/winner/WinnerSearch";
import WinnerTable from "@/components/admin/winner/WinnerTable";

import ViewProofModal from "@/components/admin/winner/ViewProofModal";
import ApproveWinnerModal from "@/components/admin/winner/ApproveWinnerModal";
import RejectWinnerModal from "@/components/admin/winner/RejectWinnerModal";
import MarkPaidModal from "@/components/admin/winner/MarkPaidModal";

export default function WinnersPage() {
  const [loading, setLoading] = useState(true);
  const [winners, setWinners] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [proof, setProof] = useState(null);
  const [approve, setApprove] = useState(null);
  const [reject, setReject] = useState(null);
  const [paid, setPaid] = useState(null);

  useEffect(() => {
    loadWinners();
  }, []);

  async function loadWinners() {
    try {
      setLoading(true);
      const res = await api.get("/winner");
      setWinners(res.data.winners || []);
    } catch {
      toast.error("Unable to load platform winners smoothly");
    } finally {
      setLoading(false);
    }
  }

  const filtered = winners.filter((winner) => {
    const name = winner.userId?.name?.toLowerCase() || "";
    const email = winner.userId?.email?.toLowerCase() || "";
    const keyword = search.toLowerCase();

    const searchMatch = name.includes(keyword) || email.includes(keyword);
    const statusMatch = !status || winner.status === status;

    return searchMatch && statusMatch;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-4 sm:p-6 lg:p-10 space-y-8 sm:space-y-10 selection:bg-amber-500 selection:text-black">

      {/* Header */}
      <div className="border-b border-zinc-900 pb-6 relative group">
        {/* Neon Glow ambient effect */}
        <div className="absolute top-0 left-0 w-48 h-20 bg-amber-500/5 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:bg-amber-500/10" />
        
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent uppercase">
          Winner <span className="font-extrabold text-amber-400">Management</span>
        </h1>
        
        <p className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-400 mt-2">
          🏆 Audit, verify documentation, and process payouts for all <span className="text-zinc-200 font-extrabold">Golf Platform Champions</span>.
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="transition-transform duration-300 hover:scale-[1.001]">
        <WinnerStats winners={winners} />
      </div>

      {/* Interactive Control Search & Filters Wrapper */}
      <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-2 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:border-zinc-800/80 shadow-xl relative overflow-hidden">
        <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-amber-500/[0.01] rounded-full blur-xl pointer-events-none" />
        <WinnerSearch
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
        />
      </div>

      {/* Data Layout Matrix Table Container */}
      <div className="bg-zinc-900/20 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-zinc-800/60">
        <WinnerTable
          loading={loading}
          winners={filtered}
          onProof={setProof}
          onApprove={setApprove}
          onReject={setReject}
          onPaid={setPaid}
        />
      </div>

      {/* Overlays & Modals Enclosure */}
      {proof && (
        <ViewProofModal
          winner={proof}
          onClose={() => setProof(null)}
        />
      )}

      {approve && (
        <ApproveWinnerModal
          winner={approve}
          onClose={() => setApprove(null)}
          onSuccess={loadWinners}
        />
      )}

      {reject && (
        <RejectWinnerModal
          winner={reject}
          onClose={() => setReject(null)}
          onSuccess={loadWinners}
        />
      )}

      {paid && (
        <MarkPaidModal
          winner={paid}
          onClose={() => setPaid(null)}
          onSuccess={loadWinners}
        />
      )}

    </div>
  );
}