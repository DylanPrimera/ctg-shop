"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const userAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      address: userAddress,
    };
  } catch (error) {
    console.log("uno", error);
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const addressDb = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });
    const addressToSave = {
      userId: userId,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone as string,
      zipCode: address.zipCode,
      countryId: address.country,
    };
    
    if (addressDb === null) {
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
    console.log("dos", error);
  }
};
