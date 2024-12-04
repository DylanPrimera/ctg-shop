"use client";

import { Address, Country } from "@/interfaces";
import { useAddressStore} from "@/store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface Props {
  countries: Country[];
  userAddress?: Partial<Address>;
}

export const AddressForm = ({ countries }: Props) => {
  const address = useAddressStore((state) => state.address);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
  } = useForm<Address>({
    defaultValues: {
      ...address,
    },
  });
 
  const setAddress = useAddressStore((state) => state.setAddress);
  const submitAddress = async (data: Address) => {
    setAddress(data);
    router.push("/checkout");
  };

  useEffect(() => {
    if (address.firstName) {
      reset(address);
    }
  }, [address.firstName]);

  return (
    <>
      <form
        onSubmit={handleSubmit(submitAddress)}
        className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
      >
        <div className="flex flex-col mb-2">
          <span>Name</span>
          <input
            type="text"
            placeholder="Type ur name"
            {...register("firstName", { required: true })}
            className="p-2 border rounded-md bg-gray-200 outline-none"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Last name</span>
          <input
            type="text"
            placeholder="Type ur lastname"
            {...register("lastName", { required: true })}
            className="p-2 border rounded-md bg-gray-200 outline-none"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Address</span>
          <input
            type="text"
            placeholder="Type ur address"
            {...register("address1", { required: true })}
            className="p-2 border rounded-md bg-gray-200 outline-none"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Address 2 (optional)</span>
          <input
            type="text"
            placeholder="Address 2"
            {...register("address2", { required: false })}
            className="p-2 border rounded-md bg-gray-200 outline-none"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>ZIP Code</span>
          <input
            type="text"
            placeholder="Enter ur ZIP code"
            {...register("zipCode", { required: true })}
            className="p-2 border rounded-md bg-gray-200 outline-none"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>City</span>
          <input
            type="text"
            placeholder="Type ur city"
            {...register("city", { required: true })}
            className="p-2 border rounded-md bg-gray-200 outline-none"
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Country</span>
          <select
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("country", { required: true })}
          >
            <option value="">[ Select ]</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Phone</span>
          <input
            type="number"
            placeholder="Enter ur phone"
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("phone", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2 sm:mt-1">
          <button
            type="submit"
            className={clsx("flex w-full justify-center", {
              "btn-disabled": !isValid,
              "btn-primary": isValid,
            })}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};
