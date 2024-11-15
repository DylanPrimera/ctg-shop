import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getProducts = async ({
  page = 1,
  take = 12,
  gender
}: PaginationOptions) => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  try {
    //Get all products
    const productsDB = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        images: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
      where: {
        gender,
      },
    });

    //Pagination
    const totalPages = Math.ceil((await prisma.product.count({
      where: {
        gender,
      },
    })) / take);

    await Promise.all([productsDB, totalPages]);
    return {
      currentPage: page,
      totalPages,
      products: productsDB.map((product) => ({
        ...product,
        images: product.images.map((image) => image.url),
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
        images: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.images.map((image) => image.url),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching product");
  }
};
