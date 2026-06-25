"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import api from "@/services/api";


import useAuth from "@/hooks/useAuth";

export default function Login() {
  const router =
    useRouter();

  const { login } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password,
    setPassword] =
    useState("");


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await login(email, password);

    // Get latest profile after login
    const profile = await api.get(
      "/auth/profile"
    );

    const user = profile.data.user;

    toast.success(
      `Welcome ${user.name}`
    );

    if (
      user.role === "ADMIN"
    ) {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  } catch (error) {
    console.log(
      "Login Error:",
      error
    );

    toast.error(
      error?.response?.data
        ?.message ||
        "Invalid Credentials"
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
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-3"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button className="w-full bg-black text-white py-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
}