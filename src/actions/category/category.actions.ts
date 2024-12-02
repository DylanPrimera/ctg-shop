"use server";

import prisma from "@/lib/prisma";

export const getCategories = async () => {
  try {
    const categoriesDB = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    if (!categoriesDB) return [];
   return categoriesDB;
  } catch (error) {
    console.log(error);
  }
};
