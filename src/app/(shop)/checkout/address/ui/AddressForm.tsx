"use client";

import { deleteUserAddress, setUserAddress } from "@/actions";
import { Address, Country } from "@/interfaces";
import { useAddressStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// interface FormInputs extends Address {
//   inClicked?: boolean;
// }

interface Props {
  countries: Country[];
  userAddress?: Partial<Address>;
}

export const AddressForm = ({ countries, userAddress }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
  } = useForm<Address>();
  const address = useAddressStore((state) => state.address);
  const setAddress = useAddressStore((state) => state.setAddress);

  const submitAddress = async (data: Address) => {
    setAddress(data);
    const { remember, ...rest } = data;
    if (remember) {
      await setUserAddress(rest, session!.user.id);
    } else {
      await deleteUserAddress(session!.user.id);
    }

    router.push('/checkout')
  };

  useEffect(() => {
    if (address.firstName === "" && userAddress) {
      reset(userAddress);
    }
    if (address.firstName && !userAddress) {
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
          <div className="inline-flex items-center mb-10">
            <label
              className="relative flex cursor-pointer items-center rounded-full p-3"
              htmlFor="checkbox"
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border bg-white  transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                id="checkbox"
                {...register("remember")}
              />
              <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
            <span className="antialiased">Remember direction?</span>
          </div>
          <button
            type="submit"
            className={clsx("flex w-full sm:w-1/2 justify-center", {
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
