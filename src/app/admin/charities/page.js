"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import CharitySearch from "@/components/admin/charity/CharitySearch";
import CharityTable from "@/components/admin/charity/CharityTable";
import AddCharityModal from "@/components/admin/charity/AddCharityModal";
import EditCharityModal from "@/components/admin/charity/EditCharityModal";
import DeleteCharityModal from "@/components/admin/charity/DeleteCharityModal";

import {
  FaPlus,
  FaHandsHelping,
} from "react-icons/fa";

export default function AdminCharities() {
  const [charities, setCharities] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [showAdd, setShowAdd] =
    useState(false);

  const [editCharity, setEditCharity] =
    useState(null);

  const [
    deleteCharity,
    setDeleteCharity,
  ] = useState(null);

  useEffect(() => {
    fetchCharities();
  }, []);

  async function fetchCharities() {
    try {
      setLoading(true);

      const res =
        await api.get("/charity");

      setCharities(
        res.data.charities
      );
    } catch {
      toast.error(
        "Unable to load charities"
      );
    } finally {
      setLoading(false);
    }
  }

  async function removeCharity(id) {
    try {
      await api.delete(
        `/charity/${id}`
      );

      toast.success(
        "Charity Deleted"
      );

      fetchCharities();
    } catch {
      toast.error(
        "Delete Failed"
      );
    }
  }

  const filtered =
    charities.filter(
      (item) =>
        item.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.description
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Charity Management
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage all charity
            organizations.
          </p>

        </div>

        <button
          onClick={() =>
            setShowAdd(true)
          }
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl flex items-center gap-3 font-bold"
        >
          <FaPlus />

          Add Charity
        </button>

      </div>

      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6">

          <FaHandsHelping className="text-4xl mb-4" />

          <p>Total Charities</p>

          <h2 className="text-4xl font-bold">

            {charities.length}

          </h2>

        </div>

        <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-6">

          <h3 className="text-lg">

            Total Events

          </h3>

          <h2 className="text-4xl font-bold mt-3">

            {charities.reduce(
              (sum, item) =>
                sum +
                (item.events
                  ?.length ||
                  0),
              0
            )}

          </h2>

        </div>

        <div className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-6">

          <h3 className="text-lg">

            Featured

          </h3>

          <h2 className="text-4xl font-bold mt-3">

            {
              charities.filter(
                (c) =>
                  c.featured
              ).length
            }

          </h2>

        </div>

      </div>

      {/* Search */}

      <CharitySearch
        value={search}
        onChange={
          setSearch
        }
      />

      {/* Table */}

      <CharityTable
        loading={
          loading
        }
        charities={
          filtered
        }
        onEdit={
          setEditCharity
        }
        onDelete={
          setDeleteCharity
        }
      />

      {/* Add */}

      {showAdd && (
        <AddCharityModal
          onClose={() =>
            setShowAdd(
              false
            )
          }
          onSuccess={
            fetchCharities
          }
        />
      )}

      {/* Edit */}

      {editCharity && (
        <EditCharityModal
          charity={
            editCharity
          }
          onClose={() =>
            setEditCharity(
              null
            )
          }
          onSuccess={
            fetchCharities
          }
        />
      )}

      {/* Delete */}

      {deleteCharity && (
        <DeleteCharityModal
          charity={
            deleteCharity
          }
          onClose={() =>
            setDeleteCharity(
              null
            )
          }
          onDelete={() => {
            removeCharity(
              deleteCharity._id
            );

            setDeleteCharity(
              null
            );
          }}
        />
      )}

    </div>
  );
}