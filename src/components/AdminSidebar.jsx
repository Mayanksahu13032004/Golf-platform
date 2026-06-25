"use client";

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="hidden md:block w-64 bg-zinc-950 text-white min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-8">
        Admin Panel
      </h2>

      <div className="flex flex-col gap-4">

        <Link href="/admin">
          Dashboard
        </Link>

        <Link href="/admin/charities">
          Charities
        </Link>

        <Link href="/admin/draws">
          Draws
        </Link>

        <Link href="/admin/winners">
          Winners
        </Link>

        <Link href="/admin/analytics">
          Analytics
        </Link>

      </div>

    </aside>
  );
}