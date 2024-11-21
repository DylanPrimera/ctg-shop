"use server";
import prisma from "@/lib/prisma";

export const getCountries = async () => {
  try {
    const resp = await prisma.country.findMany({
        orderBy: {
            name: 'asc'
        }
    });
    return resp
  } catch (error) {
    console.error(error);
    return [];
  }
};
