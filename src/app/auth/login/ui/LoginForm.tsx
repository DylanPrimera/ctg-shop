"use client";
import { authenticate } from "@/actions";
import Link from "next/link";
import React, { useActionState } from "react";

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

        <button className="btn-primary" type="submit" aria-disabled={isPending}>
          Login
        </button>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/register" className="btn-secondary text-center">
          Register
        </Link>
        {errorMessage && (
          <p className="bg-red-500 text-white my-5 rounded-lg p-2 text-center">
            {errorMessage}
          </p>
        )}
      </form>
    </>
  );
};
