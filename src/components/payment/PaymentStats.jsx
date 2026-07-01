"use client";

import {
  FaMoneyBillWave,
  FaCreditCard,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";

export default function PaymentStats({
  payments = [],
}) {
  const totalPayments =
    payments.length;

  const totalAmount =
    payments.reduce(
      (sum, payment) =>
        sum + (payment.amount || 0),
      0
    );

  const activePlans =
    payments.filter(
      (payment) =>
        payment.status === "ACTIVE"
    ).length;

  const latestPayment =
    payments.length > 0
      ? new Date(
          payments[0].createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "--";

  const cards = [
    {
      title: "Total Payments",
      value: totalPayments,
      icon: (
        <FaCreditCard />
      ),
      color:
        "from-blue-600 to-indigo-700",
    },
    {
      title: "Total Amount",
      value: `₹${totalAmount}`,
      icon: (
        <FaMoneyBillWave />
      ),
      color:
        "from-green-600 to-emerald-700",
    },
    {
      title: "Active Plans",
      value: activePlans,
      icon: (
        <FaCheckCircle />
      ),
      color:
        "from-purple-600 to-violet-700",
    },
    {
      title: "Latest Payment",
      value: latestPayment,
      icon: (
        <FaCalendarAlt />
      ),
      color:
        "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`bg-gradient-to-r ${card.color} rounded-3xl p-6 shadow-xl`}
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-white/80 text-sm">

                {card.title}

              </p>

              <h2 className="text-3xl md:text-4xl font-black text-white mt-3">

                {card.value}

              </h2>

            </div>

            <div className="text-5xl text-white opacity-90">

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}