"use client";
import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import { redirect } from "next/navigation";

export const CartProducts = () => {
  const cartProducts = useCartStore((state) => state.cartItems);
  const updateProducQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  if (cartProducts.length <= 0) {
    redirect("/empty");
  }

  return (
    <>
      {cartProducts.map((product, index) => (
        <div key={index} className="flex items-center mb-5">
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
              <p>{product.title}</p>
            </div>

            <p>$ {product.price.toFixed(2)}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) =>
                updateProducQuantity(product, quantity)
              }
            />
            <button className="underline mt-3">Remove</button>
          </div>
        </div>
      ))}
    </>
  );
};
