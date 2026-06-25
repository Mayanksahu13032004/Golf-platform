"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Bar,
  Doughnut,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function RevenueChart({
  analytics,
}) {
  if (!analytics) return null;

  const revenueData = {
    labels: [
      "Revenue",
      "Charity",
      "Prize Pool",
    ],

    datasets: [
      {
        label: "Amount (₹)",

        data: [
          analytics.totalRevenue || 0,
          analytics.totalCharity || 0,
          analytics.totalPrizePool || 0,
        ],

        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#3b82f6",
        ],

        borderRadius: 10,
      },
    ],
  };

  const distributionData = {
    labels: [
      "Revenue",
      "Charity",
      "Prize Pool",
    ],

    datasets: [
      {
        data: [
          analytics.totalRevenue || 0,
          analytics.totalCharity || 0,
          analytics.totalPrizePool || 0,
        ],

        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#3b82f6",
        ],

        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },

        grid: {
          color: "#333",
        },
      },

      y: {
        ticks: {
          color: "white",
        },

        grid: {
          color: "#333",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "white",
        },
      },
    },
  };

  return (
    <section className="space-y-6">

      <div>

        <h2 className="text-3xl font-bold text-white">

          Revenue Analytics

        </h2>

        <p className="text-zinc-400 mt-2">

          Revenue, Charity and Prize Distribution

        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Bar Chart */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h3 className="text-xl font-bold text-white mb-6">

            Revenue Overview

          </h3>

          <Bar
            data={revenueData}
            options={options}
          />

        </div>

        {/* Doughnut */}

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

          <h3 className="text-xl font-bold text-white mb-6">

            Revenue Distribution

          </h3>

          <Doughnut
            data={distributionData}
            options={doughnutOptions}
          />

        </div>

      </div>

      {/* Summary */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <h2 className="text-2xl font-bold text-white mb-8">

          Financial Summary

        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-400">

              Revenue

            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">

              ₹{analytics.totalRevenue}

            </h2>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-400">

              Charity Fund

            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-3">

              ₹{analytics.totalCharity}

            </h2>

          </div>

          <div className="bg-zinc-800 rounded-2xl p-6">

            <p className="text-zinc-400">

              Prize Pool

            </p>

            <h2 className="text-4xl font-bold text-blue-400 mt-3">

              ₹{analytics.totalPrizePool}

            </h2>

          </div>

        </div>

      </div>

    </section>
  );
}