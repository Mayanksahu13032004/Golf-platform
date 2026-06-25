"use client";

import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";

import {
  FaTimes,
  FaPlus,
  FaTrash,
  FaCloudUploadAlt,
  FaSave,
} from "react-icons/fa";

export default function AddCharityModal({
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  const [event, setEvent] =
    useState("");

  const [form, setForm] =
    useState({
      name: "",
      description: "",
      image: "",
      featured: false,
      events: [],
    });

  async function uploadImage(file) {
    try {
      setUploading(true);

      const data = new FormData();

      data.append("file", file);

      const res =
        await api.post(
          "/upload",
          data,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setForm((prev) => ({
        ...prev,
        image:
          res.data.imageUrl,
      }));

      toast.success(
        "Image Uploaded"
      );
    } catch {
      toast.error(
        "Upload Failed"
      );
    } finally {
      setUploading(false);
    }
  }

  function addEvent() {
    if (!event.trim()) return;

    setForm((prev) => ({
      ...prev,
      events: [
        ...prev.events,
        event,
      ],
    }));

    setEvent("");
  }

  function removeEvent(index) {
    setForm((prev) => ({
      ...prev,
      events:
        prev.events.filter(
          (_, i) =>
            i !== index
        ),
    }));
  }

  async function saveCharity(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post(
        "/charity",
        form
      );

      toast.success(
        "Charity Created"
      );

      onSuccess();

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data
          ?.message ||
          "Creation Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4">

      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-3xl max-h-[95vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center p-6 border-b border-zinc-800">

          <h2 className="text-3xl font-bold text-white">
            Add Charity
          </h2>

          <button
            onClick={onClose}
            className="text-white text-2xl"
          >
            <FaTimes />
          </button>

        </div>

        <form
          onSubmit={
            saveCharity
          }
          className="p-6 space-y-6"
        >

          {/* Name */}

          <div>

            <label className="text-white font-semibold block mb-2">
              Charity Name
            </label>

            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white"
            />

          </div>

          {/* Description */}

          <div>

            <label className="text-white font-semibold block mb-2">
              Description
            </label>

            <textarea
              rows={4}
              required
              value={
                form.description
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white"
            />

          </div>

          {/* Image */}

          <div>

            <label className="text-white font-semibold block mb-3">
              Charity Image
            </label>

            {form.image && (
              <img
                src={
                  form.image
                }
                className="w-full h-52 object-cover rounded-xl mb-4"
                alt=""
              />
            )}

            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl inline-flex items-center gap-3">

              <FaCloudUploadAlt />

              {uploading
                ? "Uploading..."
                : "Upload Image"}

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) =>
                  uploadImage(
                    e.target
                      .files[0]
                  )
                }
              />

            </label>

          </div>

          {/* Events */}

          <div>

            <label className="text-white font-semibold block mb-3">
              Events
            </label>

            <div className="flex gap-3">

              <input
                value={event}
                onChange={(e) =>
                  setEvent(
                    e.target.value
                  )
                }
                placeholder="Event Name"
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white"
              />

              <button
                type="button"
                onClick={
                  addEvent
                }
                className="bg-green-600 px-5 rounded-xl"
              >
                <FaPlus />
              </button>

            </div>

            <div className="mt-4 flex flex-wrap gap-3">

              {form.events.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="bg-blue-600 rounded-full px-4 py-2 flex items-center gap-3"
                  >
                    {item}

                    <button
                      type="button"
                      onClick={() =>
                        removeEvent(
                          index
                        )
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>
                )
              )}

            </div>

          </div>

          {/* Featured */}

          <div className="flex items-center gap-4">

            <input
              type="checkbox"
              checked={
                form.featured
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  featured:
                    e.target.checked,
                })
              }
              className="w-5 h-5"
            />

            <span className="text-white">
              Featured Charity
            </span>

          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-700 px-6 py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              disabled={
                loading
              }
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl flex items-center gap-3"
            >

              <FaSave />

              {loading
                ? "Saving..."
                : "Create Charity"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}