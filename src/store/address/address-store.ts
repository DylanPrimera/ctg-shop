import { Address } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address;
  addAdress: (address: Address) => void;
  getAddress: () => Address;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
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
      addAdress: (address: Address) => {
        set({ address });
      },
      getAddress: (): Address => {
        const { address } = get();
        return address;
      },
    }),
    { name: "address-storage" }
  )
);
