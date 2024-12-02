'use server'


import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface Filters {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getProducts = async ({ page = 1, take = 12, gender }: Filters) => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  try {
    //Get all products
    const productsDB = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
            id: true,
          },
        },
      },
      where: {
        gender,
      },
    });

    //Pagination
    const totalPages = Math.ceil(
      (await prisma.product.count({
        where: {
          gender,
        },
      })) / take
    );

    await Promise.all([productsDB, totalPages]);
    return {
      ok: true,
      currentPage: page,
      totalPages,
      products: productsDB.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching products");
  }
};

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        ProductImage: {
          select: {
            url: true,
            id: true,
          },
        },
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching product");
  }
};

export const getStockBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug,
      },
      select: {
        inStock: true,
      },
    });
    
    return product?.inStock ?? 0;
  } catch (error) {
    console.error(error);
    return 0;
  }
};
