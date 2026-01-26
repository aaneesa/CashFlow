import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import { UserContext } from "./UserContext";
import type { User } from "./userTypes";

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async (): Promise<void> => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (role === "admin") {
      navigate("/admin", { replace: true });
      return;
    }

    try {
      const { data } = await api.get<User>("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      localStorage.setItem("isPremium", data.isPremium ? "true" : "false");
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setUser(null);
      navigate("/user/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}
