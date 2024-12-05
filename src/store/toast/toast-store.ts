import { create } from "zustand";
import { toast } from "sonner";

enum ToastOptions {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
}
interface State {
  showToast: (message: string, type: ToastOptions) => void;
}

export const useToastStore = create<State>(() => ({
  showToast: (message: string, type: ToastOptions) => {
    switch (type) {
      case ToastOptions.success: {
        toast.success(message);
        break;
      }
      case ToastOptions.error: {
        toast.error(message);
        break;
      }
      case ToastOptions.warning: {
        toast.warning(message);
        break;
      }
      case ToastOptions.info: {
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
