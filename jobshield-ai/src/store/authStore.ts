import { create } from "zustand";
import api from "@/lib/api";

export type User = { id: string; fullname: string; email: string; phone?: string; location?: string; avatar?: string; createdAt?: string };
type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  loadUser: () => Promise<User | null>;
  logout: () => Promise<void>;
};
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  setUser: (user) => set({ user }),
  loadUser: async () => {
    set({ loading: true });
    try { const { data } = await api.get("/user/me"); set({ user: data.user }); return data.user as User; }
    catch { set({ user: null }); return null; }
    finally { set({ loading: false }); }
  },
  logout: async () => { try { await api.post("/user/logout"); } finally { set({ user: null }); } },
}));
