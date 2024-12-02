"use server";

import { Role } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  try {
    const usersDB = await prisma.user.findMany();
    if (!usersDB) return {
      ok: false,
      message: "Users not found",
    };

    return {
      ok: true,
      users: usersDB,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
};


export const changeUserRole = async (id: string, role: Role) => {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { role },
    });
    if(!user) return {
      ok: false,
      message: "User not found",
    };
    revalidatePath('/admin/users');
    return {
      ok: true,
      user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Something went wrong",
    };
  }
};