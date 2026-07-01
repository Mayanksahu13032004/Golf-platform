"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";

import CharityStats from "@/components/admin/charity/CharityStats";
import CharityTable from "@/components/admin/charity/CharityTable";

import AddCharityModal from "@/components/admin/charity/AddCharityModal";
import EditCharityModal from "@/components/admin/charity/EditCharityModal";
import DeleteCharityModal from "@/components/admin/charity/DeleteCharityModal";

import { FaPlus } from "react-icons/fa";

export default function CharityManagement() {

  const [charities, setCharities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [addOpen, setAddOpen] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCharity, setSelectedCharity] =
    useState(null);

  useEffect(() => {
    fetchCharities();
  }, []);

  async function fetchCharities() {
    try {
      setLoading(true);

      const res = await api.get("/charity");

      setCharities(res.data.charities || []);
    } catch (error) {
      toast.error("Unable to load charities");
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(charity) {
    setSelectedCharity(charity);
    setEditOpen(true);
  }

  function handleDelete(charity) {
    setSelectedCharity(charity);
    setDeleteOpen(true);
  }

  if (loading && charities.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh] bg-zinc-950">

        <div className="flex flex-col items-center gap-3">

          <div className="w-10 h-10 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />

          <p className="text-zinc-400">
            Loading charities...
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8 space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">

        <div>

          <h1 className="text-4xl font-black">

            Charity Management

          </h1>

          <p className="text-zinc-400 mt-2">

            Create, Update and Manage Charity Campaigns.

          </p>

        </div>

        <button
          onClick={() => setAddOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl flex items-center gap-3 font-bold transition"
        >

          <FaPlus />

          Add Charity

        </button>

      </div>

      {/* Stats */}

      <CharityStats charities={charities} />

      {/* Table */}

      <CharityTable

        loading={loading}

        charities={charities}

        onEdit={handleEdit}

        onDelete={handleDelete}

      />

      {/* Add */}

      {addOpen && (

        <AddCharityModal

          onClose={() => setAddOpen(false)}

          onSuccess={() => {

            setAddOpen(false);

            fetchCharities();

          }}

        />

      )}

      {/* Edit */}

      {editOpen && selectedCharity && (

        <EditCharityModal

          charity={selectedCharity}

          onClose={() => {

            setEditOpen(false);

            setSelectedCharity(null);

          }}

          onSuccess={() => {

            setEditOpen(false);

            setSelectedCharity(null);

            fetchCharities();

          }}

        />

      )}

      {/* Delete */}

      {deleteOpen && selectedCharity && (

        <DeleteCharityModal

          charity={selectedCharity}

          onClose={() => {

            setDeleteOpen(false);

            setSelectedCharity(null);

          }}

          onSuccess={() => {

            setDeleteOpen(false);

            setSelectedCharity(null);

            fetchCharities();

          }}

        />

      )}

    </div>

  );

}