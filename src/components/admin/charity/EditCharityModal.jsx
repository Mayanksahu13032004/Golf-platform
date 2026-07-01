"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import api from "@/services/api";

import {
  FaTimes,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

export default function EditCharityModal({
  charity,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      name: charity.name || "",
      description:
        charity.description || "",
      image: charity.image || "",
      featured:
        charity.featured || false,
      events:
        charity.events || [],
    });

  const [event, setEvent] =
    useState({
      title: "",
      date: "",
    });

  function handleChange(e) {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  function addEvent() {
    if (
      !event.title ||
      !event.date
    ) {
      return toast.error(
        "Enter event title and date"
      );
    }

    setForm((prev) => ({
      ...prev,
      events: [
        ...prev.events,
        event,
      ],
    }));

    setEvent({
      title: "",
      date: "",
    });
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

  async function submit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(
        `/charity/${charity._id}`,
        form
      );

      toast.success(
        "Charity Updated"
      );

      onSuccess();

    } catch (err) {

      toast.error(
        err.response?.data
          ?.error ||
          "Unable to update"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex justify-center items-center p-4">

      <div className="bg-zinc-900 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center border-b border-zinc-800 p-6">

          <h2 className="text-2xl font-bold">
            Edit Charity
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            <FaTimes />
          </button>

        </div>

        <form
          onSubmit={submit}
          className="p-6 space-y-6"
        >

          <div>

            <label>
              Charity Name
            </label>

            <input
              name="name"
              required
              value={form.name}
              onChange={
                handleChange
              }
              className="w-full mt-2 bg-zinc-800 rounded-xl p-3"
            />

          </div>

          <div>

            <label>
              Description
            </label>

            <textarea
              rows={5}
              required
              name="description"
              value={
                form.description
              }
              onChange={
                handleChange
              }
              className="w-full mt-2 bg-zinc-800 rounded-xl p-3"
            />

          </div>

          <div>

            <label>
              Image URL
            </label>

            <input
              name="image"
              value={form.image}
              onChange={
                handleChange
              }
              className="w-full mt-2 bg-zinc-800 rounded-xl p-3"
            />

          </div>

          <label className="flex items-center gap-3">

            <input
              type="checkbox"
              name="featured"
              checked={
                form.featured
              }
              onChange={
                handleChange
              }
            />

            Featured Charity

          </label>

          <div className="border border-zinc-700 rounded-2xl p-5 space-y-4">

            <h3 className="font-bold text-xl">
              Events
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                placeholder="Event Title"
                value={
                  event.title
                }
                onChange={(e) =>
                  setEvent({
                    ...event,
                    title:
                      e.target.value,
                  })
                }
                className="bg-zinc-800 rounded-xl p-3"
              />

              <input
                type="date"
                value={
                  event.date
                }
                onChange={(e) =>
                  setEvent({
                    ...event,
                    date:
                      e.target.value,
                  })
                }
                className="bg-zinc-800 rounded-xl p-3"
              />

            </div>

            <button
              type="button"
              onClick={
                addEvent
              }
              className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2"
            >

              <FaPlus />

              Add Event

            </button>

            <div className="space-y-3">

              {form.events.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-zinc-800 rounded-xl p-4 flex justify-between items-center"
                  >

                    <div>

                      <p className="font-bold">

                        {item.title}

                      </p>

                      <p className="text-zinc-400">

                        {item.date}

                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        removeEvent(
                          index
                        )
                      }
                      className="bg-red-600 p-3 rounded-lg"
                    >

                      <FaTrash />

                    </button>

                  </div>

                )
              )}

            </div>

          </div>

          <button
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black rounded-xl p-4 font-bold"
          >

            {loading
              ? "Updating..."
              : "Update Charity"}

          </button>

        </form>

      </div>

    </div>
  );
}