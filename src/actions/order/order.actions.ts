/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import type { Address, ValidSize } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: ValidSize;
}

interface Filters {
  page?: number;
  take?: number;
}

export const getOrders = async ({ page = 1, take = 10 }: Filters) => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  try {
    const session = await auth();
    let orders;
    let totalPages = 0;

    if (!session?.user.id) {
      return {
        ok: false,
        message: "No user session",
      };
    }
    if (session?.user.role === "user") {
      orders = await prisma.order.findMany({
        take,
        skip: (page - 1) * take,
        where: {
          userId: session?.user.id,
        },
        orderBy:{
          isPaid: "asc"
        },
        include: {
          OrderAddress: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      totalPages = Math.ceil(
        (await prisma.order.count({
          where: {
            userId: session?.user.id,
          },
        })) / take
      );
    } else {
      orders = await prisma.order.findMany({
        take,
        skip: (page - 1) * take,
        orderBy:{
          isPaid: "asc"
        },
        include: {
          OrderAddress: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      totalPages = Math.ceil(
        (await prisma.order.count()) / take
      );
    }

    return {
      ok: true,
      orders: orders,
      totalPages,
      currentPage: page,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error.message,
    };
  }
};

export const placeOrder = async (
  products: ProductToOrder[],
  address: Address
) => {
  try {
    const session = await auth();
    if (!session?.user.id) return { ok: false, error: "No user session" };

    // get products info
    const productsDB = await prisma.product.findMany({
      where: {
        id: {
          in: products.map((product) => product.productId),
        },
      },
    });

    // calculte amounts
    const itemsInOrder = products.reduce(
      (count, product) => count + product.quantity,
      0
    );

    // calculate subtotal, tax, total
    const { subTotal, taxes, total } = products.reduce(
      (totals, item) => {
        const productQuantity = item.quantity;
        const productDB = productsDB.find((p) => p.id === item.productId);

        if (!productDB) throw new Error("Product not found");

        const subTotal = productDB.price * productQuantity;

        totals.subTotal += subTotal;
        totals.taxes += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
      },
      { subTotal: 0, taxes: 0, total: 0 }
    );

    // transactions
    try {
      const prismaTx = await prisma.$transaction(async (tx) => {
        // 1. Update the product stock
        const updateProductsPromises = productsDB.map((product) => {
          // values accumulated
          const productQuantity = products
            .filter((cartItem) => cartItem.productId === product.id)
            .reduce((acc, item) => acc + item.quantity, 0);

          if (productQuantity === 0) {
            throw new Error(`Product ${product.title} not found.`);
          }

          return tx.product.update({
            where: { id: product.id },
            data: {
              inStock: {
                decrement: productQuantity,
              },
            },
          });
        });

        const updatedProduts = await Promise.all(updateProductsPromises);

        // Check if the stock is negative
        updatedProduts.forEach((product) => {
          if (product.inStock < 0) {
            throw new Error(`Product ${product.title} has no stock.`);
          }
        });

        // 2. Create order header and detail
        const order = await tx.order.create({
          data: {
            userId: session?.user.id,
            itemsInOrder: itemsInOrder,
            subTotal: subTotal,
            taxes: taxes,
            total: total,
            orderItem: {
              createMany: {
                data: products.map((product) => {
                  return {
                    quantity: product.quantity,
                    size: product.size,
                    productId: product.productId,
                    price:
                      productsDB.find((p) => p.id === product.productId)
                        ?.price ?? 0,
                  };
                }),
              },
            },
            isPaid: true,
          },
        });

        // 3. Create order address
        const orderAddress = await tx.orderAddress.create({
          data: {
            orderId: order.id,
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone.toString(),
            zipCode: address.zipCode,
          },
        });

        return {
          order: order,
          updatedProduts: updatedProduts,
          orderAddress: orderAddress,
        };
      });
      return {
        ok: true,
        message: "Order placed successfully",
        order: prismaTx.order,
        prismaTx: prismaTx,
      };
    } catch (error: any) {
      return {
        ok: false,
        message: error.message,
      };
    }
  } catch (error) {
    console.error(error);
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const session = await auth();
    if (!session?.user.id) return { ok: false, error: "No user session" };

    const orderDB = await prisma.order.findUnique({
      where: { id: orderId, userId: session.user.id },
      include: {
        OrderAddress: true,
        orderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (session.user.role === "user") {
      if (session.user.id !== orderDB?.userId) {
        throw new Error("Order not belongs to the current user");
      }
    }
    if (!orderDB) return { ok: false, message: "Order not found" };

    return {
      ok: true,
      order: orderDB,
      products: orderDB.orderItem,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
