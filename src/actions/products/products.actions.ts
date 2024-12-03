"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

interface Filters {
  page?: number;
  take?: number;
  gender?: Gender;
}

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(100),
  description: z.string().min(3).max(500),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val)),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
  categoryId: z.string().uuid(),
});

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
        ProductImage:true
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

export const createOrUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData.entries());
  const parsedProduct = productSchema.safeParse(data);
  if (!parsedProduct.success) {
    return { ok: false, message: parsedProduct.error };
  }
  const product = parsedProduct.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "_").trim();

  const { id, ...rest } = product;
  console.log(rest);
  // transaction
  const prismaTx = await prisma.$transaction(async (tx) => {
    let productDB: Product;
    const tagsArray = rest.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());
    if (id) {
      productDB = await prisma.product.update({
        where: {
          id,
        },
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[],
          },
          tags: {
            set: tagsArray,
          },
        },
      });
    } else {
      productDB = await prisma.product.create({
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[],
          },
          tags: {
            set: tagsArray,
          },
        },
      });
    }

    return {
      productDB,
    };
  });

  return {
    ok: true,
  }
};
