"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";

interface Props {
  q?: string;
  onSearchValue: (q: string) => void; 
}

interface FormInputs {
  search: string;
}

export const SearchBox = ({ q, onSearchValue }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues: {
      search: q || "",
    },
  });
  useEffect(() => {
    reset({ search: q || "" });
  }, [q, reset]);

  const onSearch = async (data: FormInputs) => {
    const {search} = data;
    if(search.trim() === "") return;
    onSearchValue(search);
  }
  return (
    <form className="relative mt-6 max-w-lg mx-auto" onSubmit={handleSubmit(onSearch)}>
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <IoSearchOutline size={20} />
      </span>

      <input
        className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Search"
        {...register("search")}
      />
    </form>
  );
};
