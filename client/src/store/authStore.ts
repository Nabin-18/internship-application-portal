
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      user: null,
      login: (token, user) => {
        set({ token, isLoggedIn: true, user });
      },
      logout: () => {
        set({ token: null, isLoggedIn: false, user: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
);
