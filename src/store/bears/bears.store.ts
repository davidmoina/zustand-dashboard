import { create } from "zustand";

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;
}

interface BearActions {
  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
}

export const useBearStore = create<BearState & BearActions>()((set) => ({
  blackBears: 10,
  polarBears: 5,
  pandaBears: 1,
  increaseBlackBears: (by) =>
    set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by) =>
    set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by) =>
    set((state) => ({ pandaBears: state.pandaBears + by })),
}));
