import { create } from "zustand";

interface State {
  isMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUIStore = create<State>((set) => ({
  isMenuOpen: false,
  openSideMenu: () => set({ isMenuOpen: true }),
  closeSideMenu: () => set({ isMenuOpen: false }),
}));
