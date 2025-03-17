import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: { role: "cliente" | "admin" } | null;
  login: (role: "cliente" | "admin") => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (role) => set({ user: { role } }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: {
        getItem: (key) => {
          const storedValue = sessionStorage.getItem(key);
          return storedValue ? JSON.parse(storedValue) : null;
        },
        setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => sessionStorage.removeItem(key),
      },
    }
  )
);

export default useAuthStore;
