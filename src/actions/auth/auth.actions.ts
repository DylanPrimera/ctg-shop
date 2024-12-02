"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { AuthError } from "next-auth";
import brcyptjs from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
    return "Success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function Logout() {
  await signOut({
    redirect: true,
  });
}

export async function UserLogin(
  email: string,
  password: string,
  redirecTo: string = "/"
) {
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!userExists) {
      return {
        ok: false,
        message: "User does not exist",
      };
    }
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirecTo,
    });
    return {
      ok: true,
      message: "User logged in successfully!",
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      ok: false,
      message: "Invalid credentials",
    };
  }
}

export async function RegisterUser(
  name: string,
  email: string,
  password: string
) {
  try {
    const userExists = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (userExists) {
      return {
        ok: false,
        message: "Email already taken",
      };
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: brcyptjs.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      message: "User register successfully!",
      user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Cannot create user",
    };
  }
}
