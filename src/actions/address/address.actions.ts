"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
  try {
    const userAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (!userAddress) return;

    return {
      firstName: userAddress.firstName,
      lastName: userAddress.lastName,
      address1: userAddress.address1,
      address2: userAddress.address2 || "",
      zipCode: userAddress.zipCode,
      city: userAddress.city,
      country: userAddress.countryId,
      phone: +userAddress.phone,
      remember: true,
    };
  } catch (error) {
    console.error(error);
    throw "Failed to get user address";
  }
};

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const userAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      address: userAddress,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Failed to set user address",
    }
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    if (!userId) {
      throw new Error("UserId is required.");
    }

    const addressToSave = {
      firstName: address.firstName ?? null,
      lastName: address.lastName ?? null,
      address1: address.address1 ?? null,
      address2: address.address2 ?? null,
      city: address.city ?? null,
      zipCode: address.zipCode ?? null,
      phone: address.phone?.toString() ?? null,
      countryId: address.country,
      userId: userId,
    };

    console.log({ addressToSave });

    if (
      !addressToSave.address1 ||
      !addressToSave.city ||
      !addressToSave.firstName
    ) {
      throw new Error("Required address fields are missing.");
    }
    const countryExists = await prisma.country.findUnique({
      where: {
        id: address.country,
      },
    });

    if (!countryExists) {
      throw new Error("Invalid country ID provided.");
    }

    const addressDb = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (!addressDb) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave,
      });
      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: {
        userId,
      },
      data: addressToSave,
    });

    return updatedAddress;
  } catch (error) {
    console.error("Error in createOrReplaceAddress:", error);
    return {
      ok: false,
      message: "Failed to Create or replace address",
    }
  }
};

export const deleteUserAddress = async (userId: string) => {
  try {
    const isAlreadySaved = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (!isAlreadySaved) return;

    await prisma.userAddress.delete({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    throw "Failed to delete user address";
  }
};
