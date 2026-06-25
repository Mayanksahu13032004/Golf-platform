"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="text-center">

        <h1 className="text-8xl font-black text-blue-500">
          404
        </h1>

        <h2 className="text-4xl font-bold text-white mt-6">
          Page Not Found
        </h2>

        <p className="text-zinc-400 mt-4">
          The page you are looking for doesn't exist.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl mt-8 font-bold"
        >
          <FaHome />

          Go Home
        </Link>

      </div>

    </div>
  );
}