"use client";

import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import {
  FaCloudUploadAlt,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

export default function UploadProofModal({
  winner,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [preview, setPreview] =
    useState("");

  const [proofImage, setProofImage] =
    useState("");

  async function uploadImage(file) {
    try {
      setUploading(true);

      const data = new FormData();

      data.append("file", file);

      const res = await api.post(
        "/upload",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setPreview(res.data.imageUrl);

      setProofImage(
        res.data.imageUrl
      );

      toast.success(
        "Image Uploaded Successfully"
      );
    } catch (err) {
      console.log(err);

      toast.error(
        "Image Upload Failed"
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!proofImage) {
      return toast.error(
        "Please upload proof image."
      );
    }

    try {
      setLoading(true);

      await api.post(
        "/winner/proof",
        {
          winnerId: winner._id,
          proofImage,
        }
      );

      toast.success(
        "Proof Submitted Successfully"
      );

      onSuccess();

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data
          ?.message ||
          "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">

      <div className="bg-zinc-900 rounded-3xl border border-zinc-700 w-full max-w-lg">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b border-zinc-800">

          <h2 className="text-2xl font-bold text-white">
            Upload Winning Proof
          </h2>

          <button
            onClick={onClose}
            className="text-white text-xl"
          >
            <FaTimes />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >

          <div>

            <p className="text-zinc-400 mb-3">

              Winner Amount

            </p>

            <h1 className="text-5xl font-black text-green-400">

              ₹{winner.amount}

            </h1>

          </div>

          <div>

            <label className="cursor-pointer">

              <div className="border-2 border-dashed border-blue-600 rounded-2xl p-8 text-center hover:bg-zinc-800 transition">

                <FaCloudUploadAlt className="text-6xl mx-auto text-blue-500 mb-4" />

                <h3 className="text-white text-xl font-bold">

                  {uploading
                    ? "Uploading..."
                    : "Choose Proof Image"}

                </h3>

              </div>

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  uploadImage(
                    e.target.files[0]
                  )
                }
              />

            </label>

          </div>

          {preview && (

            <div>

              <img
                src={preview}
                className="rounded-2xl w-full h-72 object-cover"
              />

            </div>

          )}

          <button
            disabled={
              loading ||
              uploading
            }
            className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold flex justify-center items-center gap-3 disabled:opacity-50"
          >

            <FaCheckCircle />

            {loading
              ? "Submitting..."
              : "Submit Proof"}

          </button>

        </form>

      </div>

    </div>
  );
}