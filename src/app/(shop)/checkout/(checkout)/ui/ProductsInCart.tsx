"use client";
import {  Skeleton } from "@/components";
import { CartProduct } from "@/interfaces";
import { useCartStore } from "@/store";
import { currencyFormatter } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const cartProducts = useCartStore((state) => state.cartItems);
  const [loaded, setLoaded] = useState(false);

  // effect to avoid hydratation issue
  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <Skeleton customClass="h-full" />;

  if (loaded && cartProducts.length <= 0) {
    redirect("/empty");
  }
  if (loaded) {
    return (
      <>
        {cartProducts.map((product: CartProduct) => (
          <div
            key={`${product.slug}-${product.size}`}
            className="flex mb-5"
          >
            <Image
              src={`/products/${product.image}`}
              alt={product.title}
              className="mr-5 rounded"
              width={100}
              height={100}
            />
            <div>
              <div className="flex items-center gap-1">
                <p>{product.size}</p>
                <span>-</span>
                <span className="antialiased">
                  {product.title}
                </span>
              </div>
              <p className="text-sm antialiased my-1">Quantity: {product.quantity}</p>

              <p className="antialiased font-bold">{ currencyFormatter(product.price * product.quantity) }</p>
            </div>
          </div>
        ))}
      </>
    );
  }
};
