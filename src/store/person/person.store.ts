import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { firebaseStorage } from "../storage/firebase-storage";
// import { logger } from "../middlewares/logger";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface PersonActions {
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}

const storeApi: StateCreator<
  PersonState & PersonActions,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value) => set({ firstName: value }, false, "setFirstName"),
  setLastName: (value) => set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonState & PersonActions>()(
  devtools(
    persist(storeApi, {
      name: "person-storage",
      storage: firebaseStorage,
    })
  )
);
