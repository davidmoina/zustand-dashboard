import { createJSONStorage, StateStorage } from "zustand/middleware";

const storage: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    const data = sessionStorage.getItem(name);

    return data;
  },
  setItem: function (name: string, value: string): void {
    sessionStorage.setItem(name, value);

    return;
  },
  removeItem: function (name: string): unknown | Promise<unknown> {
    console.log("removeItem", name);

    return;
  },
};

export const customSessionStorage = createJSONStorage(() => storage);
