"use client";
import { UserLogin } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoInformationOutline } from "react-icons/io5";

interface FormInputs {
  email: string;
  password: string;
}

interface Props {
  redirecTo?: string;
}

export const LoginForm = ({redirecTo}: Props) => {
  const {
    register,
    handleSubmit,
  } = useForm<FormInputs>();

  const [isLogining, setIsLogining] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin =async(data:FormInputs)=> {
    const { email, password } = data;
    setIsLogining(true);
    const response = await UserLogin(email.toLowerCase(), password, redirecTo);
    if(!response.ok) {
      setIsLogining(false);
      setErrorMessage(response.message);
      return;
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5 outline-none"
          type="email"
          placeholder="example@example.com"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          })}
        />

        <label htmlFor="password">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5 outline-none"
          type="password"
          placeholder="******"
          {...register("password", { required: true, minLength: 6 })}
        />

        <button
          className={clsx({
            "btn-primary": !isLogining,
            "btn-disabled": isLogining,
          })}
          type="submit"
          aria-disabled={isLogining}
        >
          Login
        </button>

        <div
          className="flex h-8 items-end space-x-1 my-3"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <IoInformationOutline
                className="h-5 w-5 text-red-500"
                size={15}
              />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>

        {/* divisor line */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/register" className="btn-secondary text-center">
          Register
        </Link>
      </form>
    </>
  );
};
