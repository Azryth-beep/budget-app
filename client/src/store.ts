import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Format = { currency: string; decimals: number; separator: string };
type User = { id: number; email: string; token: string | null } | null;

type Store = {
  format: Format;
  user: User;
  setFormat: (format: Format) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  logout: () => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      format: { currency: 'RD$', decimals: 2, separator: '.' },
      user: null,
      setFormat: (format) => set({ format }),
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      logout: () => {
        set({ user: null });
        localStorage.removeItem('budget-app-storage');
      },
    }),
    { name: 'budget-app-storage' },
  ),
);