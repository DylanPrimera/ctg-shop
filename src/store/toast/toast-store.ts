import { create } from "zustand";
import { toast } from "sonner";


interface State {
  showToast: (message: string, type: string) => void;
}

export const useToastStore = create<State>(() => ({
  showToast: (message: string, type: string) => {
    switch (type) {
      case 'success': {
        toast.success(message);
        break;
      }
      case 'error': {
        toast.error(message);
        break;
      }
      case 'warning': {
        toast.warning(message);
        break;
      }
      case 'info': {
        toast.info(message);
        break;
      }
      default: {
        toast(message);
        break;
      }
    }
  },
}));
