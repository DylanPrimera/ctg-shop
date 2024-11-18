"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, ValidSize } from "@/interfaces";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
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
    console.log(size, quantity);
  };

  return (
    <>
      {sizeError && !size && (
        <span className="mt-2 text-red-500 fade-in">
          You must select a size!
        </span>
      )}

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

      <button className="btn-primary my-5" onClick={addToCart}>
        Add to cart
      </button>
    </>
  );
};
