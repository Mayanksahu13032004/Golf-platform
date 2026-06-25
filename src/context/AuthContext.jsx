"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "@/services/api";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const getProfile =
    async () => {
      try {
        const res =
          await api.get(
            "/auth/profile"
          );

        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

  const login = async (
    email,
    password
  ) => {
    const res = await api.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    await getProfile();

    return res.data;
  };

  const register =
    async (data) => {
      const res =
        await api.post(
          "/auth/register",
          data
        );

      return res.data;
    };

  const logout =
    async () => {
      await api.post(
        "/auth/logout"
      );

      setUser(null);
    };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        getProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);