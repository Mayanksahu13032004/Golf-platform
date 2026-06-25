"use client";

import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyCheckAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function WinnerStats({
  winners = [],
}) {
  const pending =
    winners.filter(
      (w) => w.status === "PENDING"
    ).length;

  const approved =
    winners.filter(
      (w) => w.status === "APPROVED"
    ).length;

  const rejected =
    winners.filter(
      (w) => w.status === "REJECTED"
    ).length;

  const paid =
    winners.filter(
      (w) => w.status === "PAID"
    ).length;

  const totalPrize =
    winners.reduce(
      (sum, item) =>
        sum + (item.amount || 0),
      0
    );

  const cards = [
    {
      title: "Pending",
      value: pending,
      icon: <FaClock />,
      color:
        "from-yellow-600 to-yellow-800",
    },
    {
      title: "Approved",
      value: approved,
      icon: <FaCheckCircle />,
      color:
        "from-green-600 to-green-800",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: <FaTimesCircle />,
      color:
        "from-red-600 to-red-800",
    },
    {
      title: "Paid",
      value: paid,
      icon: <FaMoneyCheckAlt />,
      color:
        "from-blue-600 to-blue-800",
    },
  ];

  return (
    <>

      {/* Top Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 shadow-xl`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-white/80">

                  {card.title}

                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {card.value}

                </h2>

              </div>

              <div className="text-5xl text-white">

                {card.icon}

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Total Prize */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mt-8">

        <div className="flex items-center gap-5">

          <div className="bg-green-600 p-5 rounded-2xl">

            <FaMoneyBillWave className="text-5xl text-white" />

          </div>

          <div>

            <p className="text-zinc-400 text-lg">

              Total Prize Distributed

            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-2">

              ₹{totalPrize.toFixed(2)}

            </h2>

          </div>

        </div>

      </div>

    </>
  );
}