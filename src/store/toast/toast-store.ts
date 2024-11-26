import { toast, TypeOptions } from "react-toastify";
import { create } from "zustand";

interface State {
  showToast: (message: string, type: TypeOptions) => void;
}

export const useToastStore = create<State>(() => ({
  showToast: (message: string, type: TypeOptions) => {
    toast(message, {
      type: type,
    });
  },
}));
