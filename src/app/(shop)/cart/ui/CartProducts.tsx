"use client";
import { QuantitySelector, Skeleton } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const CartProducts = () => {
  const cartProducts = useCartStore((state) => state.cartItems);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
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
        {cartProducts.map((product) => (
          <div
            key={`${product.slug}-${product.size}`}
            className="flex items-center mb-5"
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
                <Link
                  href={`/product/${product.slug}`}
                  className="hover:underline hover:text-gray-700 antialiased cursor-pointer"
                >
                  {product.title}
                </Link>
              </div>

              <p>$ {product.price.toFixed(2)}</p>
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChange={(quantity) =>
                  updateProductQuantity(product, quantity)
                }
              />
              <button className="underline mt-3">Remove</button>
            </div>
          </div>
        ))}
      </>
    );
  }
};
