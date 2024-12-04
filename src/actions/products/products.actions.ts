"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

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
        ProductImage: true,
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
    return { ok: false, message: parsedProduct.error.message };
  }
  const product = parsedProduct.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "_").trim();

  const { id, ...rest } = product;
  // transaction
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let productDB: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());
      if (id) {
        productDB = await tx.product.update({
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
        if (!productDB) {
          return {
            ok: false,
            message: "Cannot update the product",
            productDB,
          };
        }
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

      // Porduct images
      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images) {
          throw new Error("Error uploading images");
        }
        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image,
            productId: productDB.id,
          })),
        });
      }
      
      return {
        ok: true,
        productDB,
        message: "Product information saved successfully",
      };
    });

    //revalidate paths
    revalidatePath("/admin/products");
    revalidatePath("/admin/product/" + prismaTx.productDB.slug);
    revalidatePath("/products/" + prismaTx.productDB.slug);

    return {
      ok: prismaTx.ok,
      productDB: prismaTx.productDB,
      message: prismaTx.message,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error creating or updating product",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages.filter((image) => image !== null);
  } catch (error) {
    console.log(error);
    return null;
  }
};
