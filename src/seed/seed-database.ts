import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products } = initialData;
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  // Categories
  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // Products
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;
    const categoryId = categoriesMap[type];
    const productDB = await prisma.product.create({
      data: {
        ...rest,
        categoryId,
      },
    });
    const imagesData = images.map((image: string) => ({
      url: image,
      productId: productDB.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
