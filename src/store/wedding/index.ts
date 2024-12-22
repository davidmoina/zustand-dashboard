import { create } from "zustand";
import { createPersonSlice, PersonSlice } from "./slices/person.slice";
import { createGuestSlice, GuestSlice } from "./slices/guest.slice";
import { devtools } from "zustand/middleware";
import { createDateSlice, DateSlice } from "./slices/date.slice";
import {
  ConfirmationSlice,
  createConfirmationSlice,
} from "./slices/confirmation.slice";

type WeddingBounceState = PersonSlice &
  GuestSlice &
  DateSlice &
  ConfirmationSlice;

export const useWeddingStore = create<WeddingBounceState>()(
  devtools((...a) => ({
    ...createPersonSlice(...a),
    ...createGuestSlice(...a),
    ...createDateSlice(...a),
    ...createConfirmationSlice(...a),
  }))
);
