"use client";

import { useEffect, useMemo, useState } from "react";

import api from "@/services/api";

import toast from "react-hot-toast";

import {
  FaDice,
  FaSearch,
  FaSyncAlt,
} from "react-icons/fa";

import DrawStats from "@/components/admin/draw/DrawStats";
import DrawTable from "@/components/admin/draw/DrawTable";
import SimulateDrawModal from "@/components/admin/draw/SimulateDrawModal";
import PublishDrawModal from "@/components/admin/draw/PublishDrawModal";
import ViewDrawModal from "@/components/admin/draw/ViewDrawModal";

export default function DrawManagement() {
  const [draws, setDraws] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [simulateOpen,
    setSimulateOpen] =
    useState(false);

  const [publishDraw,
    setPublishDraw] =
    useState(null);

  const [viewDraw,
    setViewDraw] =
    useState(null);

  useEffect(() => {
    fetchDraws();
  }, []);

  async function fetchDraws() {
    try {
      setLoading(true);

      const res =
        await api.get("/draw");

      setDraws(
        res.data.draws || []
      );

    } catch (err) {

      toast.error(
        "Unable to load draws"
      );

    } finally {

      setLoading(false);

    }
  }

  const filteredDraws =
    useMemo(() => {

      return draws.filter((draw) => {

        const searchMatch =
          draw.month
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          draw.year
            ?.toString()
            .includes(search);

        const statusMatch =
          status === "ALL"
            ? true
            : draw.status === status;

        return (
          searchMatch &&
          statusMatch
        );

      });

    }, [
      draws,
      search,
      status,
    ]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">

        <div>

          <h1 className="text-4xl font-black">

            Draw Management

          </h1>

          <p className="text-zinc-400 mt-2">

            Manage simulated and published golf draws.

          </p>

        </div>

        <button
          onClick={() =>
            setSimulateOpen(true)
          }
          className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl flex items-center gap-3 font-bold"
        >

          <FaDice />

          Simulate Draw

        </button>

      </div>

      {/* Stats */}

      <DrawStats
        draws={draws}
      />

      {/* Filters */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col md:flex-row gap-5">

        {/* Search */}

        <div className="relative flex-1">

          <FaSearch
            className="absolute left-4 top-4 text-zinc-500"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search Month or Year"
            className="w-full bg-zinc-800 rounded-xl pl-12 pr-4 py-3 outline-none"
          />

        </div>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="bg-zinc-800 rounded-xl px-5 py-3"
        >

          <option value="ALL">

            All Status

          </option>

          <option value="SIMULATED">

            Simulated

          </option>

          <option value="PUBLISHED">

            Published

          </option>

        </select>

        {/* Refresh */}

        <button
          onClick={fetchDraws}
          className="bg-blue-600 hover:bg-blue-700 px-5 rounded-xl flex items-center justify-center gap-3"
        >

          <FaSyncAlt />

          Refresh

        </button>

      </div>

      {/* Table */}

      <DrawTable
        loading={loading}
        draws={filteredDraws}
        onView={setViewDraw}
        onPublish={setPublishDraw}
      />

      {/* Modals */}

      {simulateOpen && (

        <SimulateDrawModal
          onClose={() =>
            setSimulateOpen(false)
          }
          onSuccess={() => {

            fetchDraws();

            setSimulateOpen(false);

          }}
        />

      )}

      {publishDraw && (

        <PublishDrawModal
          draw={publishDraw}
          onClose={() =>
            setPublishDraw(null)
          }
          onSuccess={() => {

            fetchDraws();

          }}
        />

      )}

      {viewDraw && (

        <ViewDrawModal
          draw={viewDraw}
          onClose={() =>
            setViewDraw(null)
          }
        />

      )}

    </div>
  );
}