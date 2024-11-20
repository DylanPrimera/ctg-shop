import { Address } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address;
  setAddress: (address: Address) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        zipCode: "",
        city: "",
        country: "",
        phone: "",
        remember: false,
      },
      setAddress: (address: Address) => {
        set({ address });
      }
    }),
    { name: "address-storage" }
  )
);
