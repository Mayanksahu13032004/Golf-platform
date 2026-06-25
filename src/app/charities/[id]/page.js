"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function CharityDetails({ params }) {
  const [charity, setCharity] = useState(null);

  useEffect(() => {
    loadCharity();
  }, []);

  const loadCharity = async () => {
    try {
      const { id } = await params;

      const res = await api.get(
        `/charity/${id}`
      );

      console.log(
        "Charity Data:",
        res.data.charity
      );

      setCharity(
        res.data.charity
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (!charity) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <img
        src={
          charity.image ||
          "https://placehold.co/1200x500"
        }
        alt={charity.name}
        className="w-full h-[400px] object-cover"
      />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-5xl font-bold mb-5">
          {charity.name}
        </h1>

        <p className="text-zinc-400 text-lg mb-10">
          {charity.description}
        </p>

        <div>
          <h2 className="text-3xl font-bold mb-5">
            Upcoming Events
          </h2>

          {charity.events &&
          charity.events.length > 0 ? (
            charity.events.map(
              (
                event,
                index
              ) => (
                <div
                  key={
                    event._id ||
                    index
                  }
                  className="bg-zinc-900 p-5 rounded-xl mb-4"
                >
                  <h3 className="text-xl font-bold">
                    {event.title}
                  </h3>

                  <p className="text-zinc-400 mt-2">
                    Date:
                    {" "}
                    {new Date(
                      event.date
                    ).toLocaleDateString()}
                  </p>
                </div>
              )
            )
          ) : (
            <div className="bg-zinc-900 p-5 rounded-xl">
              No Events Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}