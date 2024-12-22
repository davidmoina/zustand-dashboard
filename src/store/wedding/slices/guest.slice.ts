import { StateCreator } from "zustand";

export interface GuestSlice {
  guestsCount: number;

  setGuestsCount: (guestsCount: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice> = (set) => ({
  guestsCount: 0,
  setGuestsCount: (guestsCount) =>
    set({ guestsCount: guestsCount > 0 ? guestsCount : 0 }),
});
