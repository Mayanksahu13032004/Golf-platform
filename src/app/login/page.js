"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/services/api";
import useAuth from "@/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await login(email, password);

      // Get latest profile after login
      const profile = await api.get("/auth/profile");
      const user = profile.data.user;

      toast.success(`Welcome ${user.name}`);

      if (user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("Login Error:", error);
      toast.error(
        error?.response?.data?.message || "Invalid Credentials"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 relative overflow-hidden">
      
      {/* Decorative ambient background blur vectors */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-zinc-900/40 border border-zinc-900/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative z-10"
      >
        {/* Branding header title context */}
        <div className="mb-6 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-100">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1.5">
            Log in to manage your Golf Charity platform panels.
          </p>
        </div>

        {/* Inputs stack fields configuration */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              required
              disabled={isSubmitting}
              className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 placeholder-zinc-600 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-emerald-500/60 transition-all duration-200 disabled:opacity-50"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              required
              disabled={isSubmitting}
              className="w-full bg-zinc-900/50 border border-zinc-800 text-zinc-100 placeholder-zinc-600 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-emerald-500/60 transition-all duration-200 disabled:opacity-50"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Primary Call To Action submit execution button toggles loading view */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-700 text-zinc-950 font-bold py-3 px-4 rounded-xl text-sm mt-6 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
              Authenticating...
            </>
          ) : (
            "Sign In"
          )}
        </button>

      </form>
    </div>
  );
}