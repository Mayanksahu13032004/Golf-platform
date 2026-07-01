"use client";

import {
  FaEye,
  FaRocket,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function DrawTable({
  loading,
  draws = [],
  onView,
  onPublish,
}) {
  if (loading) {
    return (
      <div className="space-y-5">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-32 rounded-3xl bg-zinc-900 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (draws.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-20 text-center">
        <h2 className="text-3xl font-bold text-white">
          No Draws Available
        </h2>

        <p className="text-zinc-500 mt-3">
          Click <b>Simulate Draw</b> to create your first draw.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ===========================
            Desktop Table
      ============================ */}

      <div className="hidden lg:block bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr>

              <th className="p-5 text-left">
                Draw
              </th>

              <th className="p-5 text-center">
                Month
              </th>

              <th className="p-5 text-center">
                Year
              </th>

              <th className="p-5">
                Winning Numbers
              </th>

              <th className="p-5 text-center">
                Prize Pool
              </th>

              <th className="p-5 text-center">
                Jackpot
              </th>

              <th className="p-5 text-center">
                Status
              </th>

              <th className="p-5 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {draws.map((draw, index) => (

              <tr
                key={draw._id}
                className="border-b border-zinc-800 hover:bg-zinc-800 transition"
              >

                {/* Draw */}

                <td className="p-5">

                  <div>

                    <h2 className="font-bold text-white">

                      Draw #{draws.length - index}

                    </h2>

                    <p className="text-zinc-500 text-sm mt-1">

                      {new Date(
                        draw.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </div>

                </td>

                {/* Month */}

                <td className="text-center">

                  {draw.month}

                </td>

                {/* Year */}

                <td className="text-center">

                  {draw.year}

                </td>

                {/* Numbers */}

                <td>

                  <div className="flex flex-wrap gap-2 justify-center">

                    {draw.winningNumbers?.map(
                      (num) => (

                        <div
                          key={num}
                          className="w-10 h-10 rounded-full bg-blue-600 flex justify-center items-center font-bold"
                        >

                          {num}

                        </div>

                      )
                    )}

                  </div>

                </td>

                {/* Prize */}

                <td className="text-center font-bold text-green-400">

                  {draw.status ===
                  "PUBLISHED"
                    ? `₹${draw.prizePool}`
                    : "--"}

                </td>

                {/* Jackpot */}

                <td className="text-center font-bold text-red-400">

                  {draw.status ===
                  "PUBLISHED"
                    ? `₹${draw.rolloverAmount}`
                    : "--"}

                </td>

                {/* Status */}

                <td className="text-center">

                  {draw.status ===
                  "PUBLISHED" ? (

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600">

                      <FaCheckCircle />

                      Published

                    </span>

                  ) : (

                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500 text-black font-bold">

                      <FaClock />

                      Simulated

                    </span>

                  )}

                </td>

                {/* Actions */}

                <td>

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={() =>
                        onView(draw)
                      }
                      className="w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 flex justify-center items-center"
                    >

                      <FaEye />

                    </button>

                    {draw.status !==
                      "PUBLISHED" && (

                      <button
                        onClick={() =>
                          onPublish(draw)
                        }
                        className="w-11 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 flex justify-center items-center"
                      >

                        <FaRocket />

                      </button>

                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ===========================
             Mobile Cards
      ============================ */}

      <div className="lg:hidden space-y-6">

        {draws.map((draw, index) => (

          <div
            key={draw._id}
            className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold">

                  Draw #{draws.length - index}

                </h2>

                <p className="text-zinc-500 mt-2 flex items-center gap-2">

                  <FaCalendarAlt />

                  {draw.month} {draw.year}

                </p>

              </div>

              {draw.status ===
              "PUBLISHED" ? (

                <span className="bg-green-600 px-4 py-2 rounded-full text-sm">

                  Published

                </span>

              ) : (

                <span className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold">

                  Simulated

                </span>

              )}

            </div>

            {/* Winning Numbers */}

            <div className="mt-6">

              <p className="text-zinc-400 mb-3">

                Winning Numbers

              </p>

              <div className="flex flex-wrap gap-2">

                {draw.winningNumbers?.map(
                  (num) => (

                    <div
                      key={num}
                      className="w-11 h-11 rounded-full bg-blue-600 flex justify-center items-center font-bold"
                    >

                      {num}

                    </div>

                  )
                )}

              </div>

            </div>

            {/* Prize */}

            {draw.status ===
              "PUBLISHED" && (

              <div className="grid grid-cols-2 gap-5 mt-6">

                <div className="bg-zinc-800 rounded-xl p-4">

                  <p className="text-zinc-500">

                    Prize Pool

                  </p>

                  <h2 className="text-green-400 text-2xl font-bold mt-2">

                    ₹{draw.prizePool}

                  </h2>

                </div>

                <div className="bg-zinc-800 rounded-xl p-4">

                  <p className="text-zinc-500">

                    Jackpot

                  </p>

                  <h2 className="text-red-400 text-2xl font-bold mt-2">

                    ₹{draw.rolloverAmount}

                  </h2>

                </div>

              </div>

            )}

            {/* Buttons */}

            <div className="flex gap-4 mt-8">

              <button
                onClick={() =>
                  onView(draw)
                }
                className="flex-1 bg-blue-600 py-3 rounded-xl font-bold"
              >

                View

              </button>

              {draw.status !==
                "PUBLISHED" && (

                <button
                  onClick={() =>
                    onPublish(draw)
                  }
                  className="flex-1 bg-emerald-600 py-3 rounded-xl font-bold"
                >

                  Publish

                </button>

              )}

            </div>

          </div>

        ))}

      </div>
    </>
  );
}