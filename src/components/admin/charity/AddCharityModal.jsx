"use client";

import {
  FaEdit,
  FaTrash,
  FaEye,
  FaStar,
} from "react-icons/fa";

export default function CharityTable({
  loading,
  charities,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-8 animate-pulse">
        <div className="h-10 bg-zinc-800 rounded mb-4"></div>

        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-16 bg-zinc-800 rounded mb-3"
          />
        ))}
      </div>
    );
  }

  if (charities.length === 0) {
    return (
      <div className="bg-zinc-900 rounded-2xl p-16 text-center border border-zinc-800">

        <h2 className="text-3xl font-bold text-white">
          No Charity Found
        </h2>

        <p className="text-zinc-400 mt-3">
          Create your first charity.
        </p>

      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl">

      <table className="w-full">

        <thead className="bg-zinc-800">

          <tr>

            <th className="text-left p-4 text-white">
              Image
            </th>

            <th className="text-left p-4 text-white">
              Charity
            </th>

            <th className="text-left p-4 text-white">
              Description
            </th>

            <th className="text-center p-4 text-white">
              Events
            </th>

            <th className="text-center p-4 text-white">
              Featured
            </th>

            <th className="text-center p-4 text-white">
              Created
            </th>

            <th className="text-center p-4 text-white">
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

              <td className="p-4">

                <img
                  src={
                    charity.image ||
                    "https://placehold.co/80x80"
                  }
                  alt={charity.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />

              </td>

              {/* Name */}

              <td className="p-4">

                <h2 className="font-bold text-white">

                  {charity.name}

                </h2>

              </td>

              {/* Description */}

              <td className="p-4">

                <p className="text-zinc-400 line-clamp-2">

                  {charity.description}

                </p>

              </td>

              {/* Events */}

              <td className="text-center p-4">

                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">

                  {charity.events?.length || 0}

                </span>

              </td>

              {/* Featured */}

              <td className="text-center p-4">

                {charity.featured ? (

                  <span className="bg-yellow-500 text-black px-3 py-1 rounded-full inline-flex items-center gap-2">

                    <FaStar />

                    Yes

                  </span>

                ) : (

                  <span className="text-zinc-500">

                    No

                  </span>

                )}

              </td>

              {/* Created */}

              <td className="text-center p-4 text-zinc-400">

                {new Date(
                  charity.createdAt
                ).toLocaleDateString()}

              </td>

              {/* Actions */}

              <td className="text-center p-4">

                <div className="flex justify-center gap-3">

                  <a
                    href={`/charity/${charity._id}`}
                    target="_blank"
                    className="bg-green-600 hover:bg-green-700 p-3 rounded-lg"
                  >
                    <FaEye />
                  </a>

                  <button
                    onClick={() =>
                      onEdit(charity)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 p-3 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      onDelete(charity)
                    }
                    className="bg-red-600 hover:bg-red-700 p-3 rounded-lg"
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
  );
}