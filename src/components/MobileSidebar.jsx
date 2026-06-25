"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function MobileSidebar({
  links,
  title,
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        onClick={() =>
          setOpen(true)
        }
        className="md:hidden text-white text-3xl"
      >
        <FiMenu />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/70">

          <div className="bg-zinc-950 w-72 h-full p-5">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-white text-xl font-bold">
                {title}
              </h2>

              <button
                onClick={() =>
                  setOpen(false)
                }
                className="text-white text-3xl"
              >
                <FiX />
              </button>

            </div>

            <div className="flex flex-col gap-4">

              {links.map(
                (item) => (
                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    className="text-white font-semibold"
                    onClick={() =>
                      setOpen(
                        false
                      )
                    }
                  >
                    {
                      item.label
                    }
                  </Link>
                )
              )}

            </div>

          </div>

        </div>
      )}
    </>
  );
}