import { create } from "zustand";

const useLocationStore = create((set) => ({
  activeLocation: null,

  setActiveLocation: (location) =>
    set({
      activeLocation: location,
    }),
}));

export default useLocationStore;