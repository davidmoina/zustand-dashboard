import { create, StateCreator } from "zustand";
import type { AuthStatus } from "../../interfaces/auth-status.interface";
import type { User } from "../../interfaces/user.interface";
import { AuthService } from "../../services/auth";
import { devtools, persist } from "zustand/middleware";

interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

const storeApi: StateCreator<AuthState & AuthActions> = (set) => ({
  status: "pending",
  token: undefined,
  user: undefined,
  login: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);

      set({ status: "authorized", token, user });
    } catch (error) {
      console.log(error);
      set({ status: "unauthorized", token: undefined, user: undefined });
      throw "Unauthorized";
    }
  },
  logout: () => {
    set({ status: "unauthorized", token: undefined, user: undefined });
  },
  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: "authorized", token, user });
    } catch (error) {
      console.log(error);
      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },
});

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(persist(storeApi, { name: "auth-storage" }))
);
