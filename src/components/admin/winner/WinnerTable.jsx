"use client";

import {
  FaEye,
  FaCheck,
  FaTimes,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function WinnerTable({
  loading,
  winners = [],
  onProof,
  onApprove,
  onReject,
  onPaid,
}) {
  if (loading) {
    return (
      <div className="bg-zinc-900 rounded-3xl p-8 animate-pulse">

        <div className="h-10 bg-zinc-800 rounded mb-5"></div>

        {[1,2,3,4,5].map((item)=>(
          <div
            key={item}
            className="h-16 bg-zinc-800 rounded mb-4"
          />
        ))}

      </div>
    );
  }

  if (winners.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-16 text-center">

        <h2 className="text-3xl font-bold text-white">
          No Winners Found
        </h2>

        <p className="text-zinc-500 mt-3">
          There are currently no winner records.
        </p>

      </div>
    );
  }

  function statusBadge(status) {
    switch (status) {
      case "APPROVED":
        return (
          <span className="bg-green-600 px-4 py-2 rounded-full text-sm font-semibold">
            Approved
          </span>
        );

      case "REJECTED":
        return (
          <span className="bg-red-600 px-4 py-2 rounded-full text-sm font-semibold">
            Rejected
          </span>
        );

      case "PAID":
        return (
          <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
            Paid
          </span>
        );

      default:
        return (
          <span className="bg-yellow-600 px-4 py-2 rounded-full text-sm font-semibold">
            Pending
          </span>
        );
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-zinc-800">

            <tr>

              <th className="text-left p-5">
                Winner
              </th>

              <th className="text-left p-5">
                Match
              </th>

              <th className="text-center p-5">
                Amount
              </th>

              <th className="text-center p-5">
                Status
              </th>

              <th className="text-center p-5">
                Proof
              </th>

              <th className="text-center p-5">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {winners.map((winner)=>(

              <tr
                key={winner._id}
                className="border-b border-zinc-800 hover:bg-zinc-800 transition"
              >

                {/* User */}

                <td className="p-5">

                  <h2 className="text-white font-bold">

                    {winner.userId?.name}

                  </h2>

                  <p className="text-zinc-500 text-sm mt-1">

                    {winner.userId?.email}

                  </p>

                </td>

                {/* Match */}

                <td className="p-5">

                  <span className="bg-indigo-600 px-4 py-2 rounded-full">

                    {winner.matchCount} Match

                  </span>

                </td>

                {/* Prize */}

                <td className="text-center p-5">

                  <span className="text-green-400 font-bold text-lg">

                    ₹{winner.amount.toFixed(2)}

                  </span>

                </td>

                {/* Status */}

                <td className="text-center p-5">

                  {statusBadge(
                    winner.status
                  )}

                </td>

                {/* Proof */}

                <td className="text-center p-5">

                  {winner.proofImage ? (

                    <button
                      onClick={()=>
                        onProof(winner)
                      }
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl inline-flex items-center gap-2"
                    >

                      <FaEye />

                      View

                    </button>

                  ) : (

                    <span className="text-zinc-500">
                      No Proof
                    </span>

                  )}

                </td>

                {/* Actions */}

                <td className="text-center p-5">

                  <div className="flex justify-center gap-3">

                    {winner.status==="PENDING" && (

                      <>

                        <button
                          onClick={()=>
                            onApprove(winner)
                          }
                          className="bg-green-600 hover:bg-green-700 p-3 rounded-xl"
                        >
                          <FaCheck />
                        </button>

                        <button
                          onClick={()=>
                            onReject(winner)
                          }
                          className="bg-red-600 hover:bg-red-700 p-3 rounded-xl"
                        >
                          <FaTimes />
                        </button>

                      </>

                    )}

                    {winner.status==="APPROVED" && (

                      <button
                        onClick={()=>
                          onPaid(winner)
                        }
                        className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
                      >
                        <FaMoneyBillWave />
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