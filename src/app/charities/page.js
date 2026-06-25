"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

export default function CharitiesPage() {
  const [charities, setCharities] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    getCharities();
  }, []);

  const getCharities =
    async () => {
      try {
        const res =
          await api.get(
            "/charity"
          );

        setCharities(
          res.data.charities
        );
      } catch (error) {
        console.log(error);
      }
    };

  const filtered =
    charities.filter(
      (charity) =>
        charity.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-5xl font-bold mb-8">
        Charities
      </h1>

      <input
        type="text"
        placeholder="Search charity..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        className="w-full bg-zinc-900 p-4 rounded-xl mb-8"
      />

      <div className="grid md:grid-cols-3 gap-6">

        {filtered.map(
          (charity) => (
            <Link
              href={`/charities/${charity._id}`}
              key={
                charity._id
              }
            >
              <div className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition">

                <img
                  src={
                    charity.image ||
                    "https://placehold.co/600x400"
                  }
                  alt={
                    charity.name
                  }
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <div className="flex justify-between">

                    <h2 className="font-bold text-xl">
                      {
                        charity.name
                      }
                    </h2>

                    {charity.featured && (
                      <span className="bg-green-600 px-2 py-1 text-xs rounded">
                        Featured
                      </span>
                    )}

                  </div>

                  <p className="text-zinc-400 mt-3 line-clamp-3">
                    {
                      charity.description
                    }
                  </p>

                </div>

              </div>
            </Link>
          )
        )}

      </div>

    </div>
  );
}