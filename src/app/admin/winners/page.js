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
      toast.error("Unable to load winners");
    } finally {
      setLoading(false);
    }
  }

  const filtered = winners.filter((winner) => {
    const name =
      winner.userId?.name?.toLowerCase() || "";

    const email =
      winner.userId?.email?.toLowerCase() || "";

    const keyword =
      search.toLowerCase();

    const searchMatch =
      name.includes(keyword) ||
      email.includes(keyword);

    const statusMatch =
      !status || winner.status === status;

    return searchMatch && statusMatch;
  });

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Winner Management
        </h1>

        <p className="text-zinc-400 mt-2">
          Verify, approve and manage prize winners.
        </p>

      </div>

      <WinnerStats winners={winners} />

      <WinnerSearch
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <WinnerTable
        loading={loading}
        winners={filtered}
        onProof={setProof}
        onApprove={setApprove}
        onReject={setReject}
        onPaid={setPaid}
      />

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