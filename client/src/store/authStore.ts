// store/authStore.ts
import { create } from "zustand";

interface User {
  name: string;
  email?: string;
  avatarUrl?: string;
}

interface AuthState {
  token: string | null;
  isLoggedIn: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isLoggedIn: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),
  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, isLoggedIn: true, user });
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, isLoggedIn: false, user: null });
  },
}));
