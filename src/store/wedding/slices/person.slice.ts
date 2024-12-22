import { StateCreator } from "zustand";

export interface PersonSlice {
  firstName: string;
  lastName: string;

  setFirstName: (name: string) => void;
  setLastName: (lastName: string) => void;
}

export const createPersonSlice: StateCreator<PersonSlice> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (name) => set({ firstName: name }),
  setLastName: (lastName) => set({ lastName: lastName }),
});
