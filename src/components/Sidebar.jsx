"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Profile", href: "/dashboard/profile" },
    { name: "Scores", href: "/dashboard/scores" },
    { name: "Subscription", href: "/dashboard/subscription" },
    { name: "Winnings", href: "/dashboard/winnings" },
  ];

  return (
    <aside className="hidden md:block w-64 bg-zinc-950 text-zinc-200 min-h-screen p-5 border-r border-zinc-900 flex-shrink-0">
      
      {/* Sidebar Header */}
      <div className="mb-8 px-2">
        <h2 className="text-xs font-bold tracking-widest text-emerald-500 uppercase">
          User Panel
        </h2>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col gap-1.5">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-emerald-950/40 border border-emerald-800/40 text-emerald-400"
                  : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100 border border-transparent"
              }`}
            >
              {/* Decorative side indicator bullet on hover/active */}
              <span 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  isActive 
                    ? "bg-emerald-400 scale-100" 
                    : "bg-zinc-700 scale-0 group-hover:scale-100 group-hover:bg-zinc-400"
                }`}
              />
              {link.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}