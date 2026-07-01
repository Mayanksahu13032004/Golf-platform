"use client";

import {
  FaEdit,
  FaTrash,
  FaStar,
  FaRegStar,
  FaCalendarAlt,
} from "react-icons/fa";

export default function CharityTable({
  loading,
  charities = [],
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-3xl p-8 animate-pulse">

        <div className="h-10 bg-zinc-800 rounded mb-6"></div>

        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-20 bg-zinc-800 rounded-xl mb-4"
          />
        ))}

      </div>
    );
  }

  if (charities.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-20 text-center">

        <h2 className="text-3xl font-bold text-white">
          No Charity Found
        </h2>

        <p className="text-zinc-500 mt-3">
          Click "Add Charity" to create your first charity.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[950px]">

          <thead className="bg-zinc-800">

            <tr>

              <th className="text-left p-5">
                Image
              </th>

              <th className="text-left p-5">
                Charity
              </th>

              <th className="text-center p-5">
                Featured
              </th>

              <th className="text-center p-5">
                Events
              </th>

              <th className="text-center p-5">
                Created
              </th>

              <th className="text-center p-5">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {charities.map((charity) => (

              <tr
                key={charity._id}
                className="border-b border-zinc-800 hover:bg-zinc-800 transition"
              >

                {/* Image */}

                <td className="p-5">

                  {charity.image ? (

                    <img
                      src={charity.image}
                      alt={charity.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />

                  ) : (

                    <div className="w-20 h-20 rounded-xl bg-zinc-700 flex items-center justify-center">

                      No Image

                    </div>

                  )}

                </td>

                {/* Name */}

                <td className="p-5">

                  <h2 className="font-bold text-lg">

                    {charity.name}

                  </h2>

                  <p className="text-zinc-400 mt-2 line-clamp-2">

                    {charity.description}

                  </p>

                </td>

                {/* Featured */}

                <td className="text-center p-5">

                  {charity.featured ? (

                    <span className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold">

                      <FaStar />

                      Featured

                    </span>

                  ) : (

                    <span className="inline-flex items-center gap-2 bg-zinc-700 px-4 py-2 rounded-full">

                      <FaRegStar />

                      No

                    </span>

                  )}

                </td>

                {/* Events */}

                <td className="text-center p-5">

                  <div className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full">

                    <FaCalendarAlt />

                    {charity.events?.length || 0}

                  </div>

                </td>

                {/* Created */}

                <td className="text-center p-5 text-zinc-400">

                  {new Date(
                    charity.createdAt
                  ).toLocaleDateString()}

                </td>

                {/* Actions */}

                <td className="text-center p-5">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() => onEdit(charity)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-black p-3 rounded-xl transition"
                    >

                      <FaEdit />

                    </button>

                    <button
                      onClick={() => onDelete(charity)}
                      className="bg-red-600 hover:bg-red-700 p-3 rounded-xl transition"
                    >

                      <FaTrash />

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}