"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import useAuth from "@/hooks/useAuth";

export default function Register() {
  const router =
    useRouter();

  const { register } =
    useAuth();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await register(form);

        toast.success(
          "Registration Successful"
        );

        router.push("/login");
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Registration Failed"
        );
      }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-5">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-3"
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <button className="w-full bg-black text-white py-3 rounded">
          Register
        </button>
      </form>
    </div>
  );
}