"use client";
import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import React, { useActionState } from "react";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <>
      <form action={formAction} className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name="email"
          placeholder="example@example.com"
        />

        <label htmlFor="password">Password</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name="password"
          placeholder="******"
        />

        <button
          className={clsx({
            "btn-primary": !isPending,
            "btn-disabled": isPending,
          })}
          type="submit"
          aria-disabled={isPending}
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

        {/* divisor l ine */}
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
