"use client";

import { useState } from "react";
import api from "@/services/api";
import toast from "react-hot-toast";
import {
  FaTimes,
  FaSave,
  FaUser,
  FaEnvelope,
  FaCamera,
} from "react-icons/fa";

export default function EditProfileModal({
  user,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(
    user?.profileImage || ""
  );

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profileImage:
      user?.profileImage || "",
  });

  const uploadImage = async (file) => {
    try {
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

      setPreview(
        res.data.imageUrl
      );

     setForm((prev) => ({
  ...prev,
  profileImage: res.data.imageUrl,
}));

      toast.success(
        "Image Uploaded"
      );
    } catch {
      toast.error(
        "Upload Failed"
      );
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    console.log("Submitting Form:", form);

    const res = await api.put(
      "/auth/profile",
      form
    );

    console.log("Profile Update Response:", res.data);

    toast.success("Profile Updated");

    onSuccess();

    onClose();
  } catch (err) {
    console.log(err.response?.data);

    toast.error(
      err.response?.data?.message ||
      "Update Failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">

      <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-lg">

        {/* Header */}

        <div className="flex justify-between items-center border-b border-zinc-800 p-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Edit Profile
            </h2>

            <p className="text-zinc-400 mt-1">
              Update your account
              information
            </p>

          </div>

          <button
            onClick={onClose}
            className="text-white text-xl"
          >
            <FaTimes />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={
            handleSubmit
          }
          className="p-6 space-y-6"
        >
          {/* Avatar */}

          <div className="flex flex-col items-center">

            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-600">

              {preview ? (
                <img
                  src={
                    preview
                  }
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-600 flex items-center justify-center text-4xl font-bold text-white">

                  {form.name
                    ?.charAt(0)
                    ?.toUpperCase()}

                </div>
              )}

            </div>

            <label className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl flex items-center gap-2">

              <FaCamera />

              Upload Photo

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

          {/* Name */}

          <div>

            <label className="text-white font-semibold flex items-center gap-2 mb-2">

              <FaUser />

              Name

            </label>

            <input
              value={
                form.name
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  name:
                    e.target.value,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          {/* Email */}

          <div>

            <label className="text-white font-semibold flex items-center gap-2 mb-2">

              <FaEnvelope />

              Email

            </label>

            <input
              type="email"
              value={
                form.email
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  email:
                    e.target.value,
                })
              }
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500"
            />

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 disabled:opacity-50"
            >
              <FaSave />

              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}