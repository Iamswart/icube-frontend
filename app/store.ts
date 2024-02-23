import { create } from "zustand";

interface User {
  goggleFirstName: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setRefreshToken: (token: string) => void; 
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"), 
  accessToken: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user)); 
    set({ user });
  },

  setAccessToken: (token) => {
    localStorage.setItem("token", token); 
    set({ accessToken: token });
  },

  setRefreshToken: (token) => {
    localStorage.setItem("refreshToken", token); 
    set({ refreshToken: token });
  },


  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
    set({ user: null, accessToken: null});
  },
}));
