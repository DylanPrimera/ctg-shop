import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getProducts = async ({
  page = 1,
  take = 12,
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
    });

    //Pagination
    const totalPages = Math.ceil((await prisma.product.count()) / take);

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
