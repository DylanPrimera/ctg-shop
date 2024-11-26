"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, ValidSize } from "@/interfaces";
import { useCartStore } from "@/store";
import clsx from "clsx";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<ValidSize>();
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const handleSizeChange = (size: ValidSize) => {
    if (size) {
      setSize(size);
    }
  };

  const handleQuantityChange = (value: number) => {
    if (quantity + value < 1) return;
    if (value) {
      setQuantity(quantity + value);
    }
  };

  const addToCart = () => {
    setSizeError(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id!,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    };

    addProductToCart(cartProduct);
    setSizeError(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {sizeError && !size && (
        <span className="mt-2 text-red-500 fade-in">
          You must select a size!
        </span>
      )}
      {product.inStock !== 0 && (
        <>
          <SizeSelector
            selectedSize={size}
            availableSizes={product.sizes}
            onSizeChange={handleSizeChange}
          />

          <QuantitySelector
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
            customClass="mt-5 mb-2"
          />
        </>
      )}

      <button
        className={clsx("my-5", {
          "btn-primary": product.inStock !== 0,
          "btn-disabled": product.inStock === 0,
        })}
        onClick={addToCart}
        disabled={product.inStock === 0}
      >
        Add to cart
      </button>
    </>
  );
};
