"use client";

import {
  FaEye,
  FaRocket,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function DrawTable({
  loading,
  draws = [],
  onView,
  onPublish,
}) {
  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-3xl p-8 animate-pulse">

        <div className="h-10 bg-zinc-800 rounded mb-6"></div>

        {[1,2,3,4,5].map((i)=>(
          <div
            key={i}
            className="h-16 bg-zinc-800 rounded mb-4"
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
          Simulate your first draw.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr>

              <th className="text-left p-5">
                Draw
              </th>

              <th className="text-left p-5">
                Date
              </th>

              <th className="text-left p-5">
                Winning Numbers
              </th>

              <th className="text-center p-5">
                Prize Pool
              </th>

              <th className="text-center p-5">
                Jackpot
              </th>

              <th className="text-center p-5">
                Status
              </th>

              <th className="text-center p-5">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {draws.map((draw,index)=>(

              <tr
                key={draw._id}
                className="border-b border-zinc-800 hover:bg-zinc-800 transition"
              >

                {/* Draw */}

                <td className="p-5">

                  <h2 className="font-bold text-white">

                    Draw #{index+1}

                  </h2>

                </td>

                {/* Date */}

                <td className="p-5 text-zinc-400">

                  {new Date(
                    draw.createdAt
                  ).toLocaleDateString()}

                </td>

                {/* Winning Numbers */}

                <td className="p-5">

                  <div className="flex flex-wrap gap-2">

                    {draw.winningNumbers?.map(
                      (number)=>(
                        <div
                          key={number}
                          className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold"
                        >
                          {number}
                        </div>
                      )
                    )}

                  </div>

                </td>

                {/* Prize Pool */}

                <td className="text-center p-5 font-bold text-green-400">

                  ₹{draw.prizePool || 0}

                </td>

                {/* Jackpot */}

                <td className="text-center p-5 font-bold text-red-400">

                  ₹{draw.rolloverAmount || 0}

                </td>

                {/* Status */}

                <td className="text-center p-5">

                  {draw.status==="PUBLISHED" ? (

                    <span className="bg-green-600 px-4 py-2 rounded-full inline-flex items-center gap-2">

                      <FaCheckCircle />

                      Published

                    </span>

                  ) : (

                    <span className="bg-yellow-600 px-4 py-2 rounded-full inline-flex items-center gap-2">

                      <FaClock />

                      Pending

                    </span>

                  )}

                </td>

                {/* Actions */}

                <td className="text-center p-5">

                  <div className="flex justify-center gap-3">

                    <button
                      onClick={()=>onView(draw)}
                      className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
                    >
                      <FaEye/>
                    </button>

                    {draw.status!=="PUBLISHED" && (

                      <button
                        onClick={()=>onPublish(draw)}
                        className="bg-green-600 hover:bg-green-700 p-3 rounded-xl"
                      >
                        <FaRocket/>
                      </button>

                    )}

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