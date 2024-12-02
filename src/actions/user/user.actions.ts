"use server";

import { auth } from "@/auth";
import { Role } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface Filters {
  page?: number;
  take?: number;
}

export const getUsers = async ({ page = 1, take = 10 }: Filters) => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  try {
    const usersDB = await prisma.user.findMany({
      take,
      skip: (page - 1) * take,
    });

    if (!usersDB)
      return {
        ok: false,
        message: "Users not found",
      };
    const totalPages = Math.ceil((await prisma.user.count()) / take);

    return {
      ok: true,
      users: usersDB,
      totalPages,
      currentPage: page,
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
    const session = await auth();
    if (session?.user.id === id) {
      return {
        ok: false,
        message: "You can't change your own role",
      };
    }
    const user = await prisma.user.update({
      where: { id },
      data: { role: role },
    });
    if (!user)
      return {
        ok: false,
        message: "User not found",
      };
    revalidatePath("/admin/users");
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
