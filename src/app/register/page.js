"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-side Gmail check
    // const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // if (!gmailRegex.test(form.email)) {
    //   toast.error("Please use a valid @gmail.com address");
    //   return;
    // }

    // 2. Client-side Password strength check
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      toast.error("Password requires 8+ chars, a capital letter, a number, and a special character");
      return;
    }

    try {
      await register(form);
      toast.success("Registration Successful");
      router.push("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 sm:p-6 lg:p-8 selection:bg-indigo-500 selection:text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2 text-white tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          Password must contain a capital letter, number, and special character.
        </p>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email "
              required
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full bg-gray-800 border border-gray-700 text-white p-3 rounded-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-medium py-3 rounded-xl mt-6 transition-all duration-200 shadow-lg shadow-indigo-600/20 text-sm sm:text-base">
          Register
        </button>
      </form>
    </div>
  );
}