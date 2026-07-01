"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";

import {
  FaTrash,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function DeleteCharityModal({
  charity,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  async function deleteCharity() {
    try {
      setLoading(true);

      await api.delete(
        `/charity/${charity._id}`
      );

      toast.success(
        "Charity Deleted Successfully"
      );

      onSuccess();

    } catch (err) {

      toast.error(
        err.response?.data?.error ||
        "Unable to delete charity"
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4">

      <div className="bg-zinc-900 rounded-3xl w-full max-w-lg border border-zinc-800 overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b border-zinc-800">

          <h2 className="text-2xl font-bold text-white">

            Delete Charity

          </h2>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xl"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="p-8 text-center">

          <div className="mx-auto w-20 h-20 rounded-full bg-red-600/20 flex items-center justify-center mb-6">

            <FaExclamationTriangle className="text-4xl text-red-500" />

          </div>

          <h3 className="text-2xl font-bold">

            Are you sure?

          </h3>

          <p className="text-zinc-400 mt-4 leading-7">

            You are about to permanently delete

            <span className="text-white font-semibold">

              {" "}
              {charity.name}

            </span>

            .

            <br />

            This action cannot be undone.

          </p>

        </div>

        {/* Footer */}

        <div className="border-t border-zinc-800 p-6 flex flex-col sm:flex-row gap-4">

          <button
            onClick={onClose}
            className="flex-1 bg-zinc-800 hover:bg-zinc-700 rounded-xl py-3 font-semibold transition"
          >

            Cancel

          </button>

          <button
            onClick={deleteCharity}
            disabled={loading}
            className="flex-1 bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold flex justify-center items-center gap-3 transition disabled:opacity-50"
          >

            <FaTrash />

            {loading
              ? "Deleting..."
              : "Delete Charity"}

          </button>

        </div>

      </div>

    </div>

  );

}