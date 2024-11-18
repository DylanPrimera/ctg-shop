"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, ValidSize } from "@/interfaces";
import React, {  useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<ValidSize>();

  const handleSizeChange = (size: ValidSize) => {
    if (size) {
      setSize(size);
    }
  }

  return (
    <>
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChange={handleSizeChange}
      />

      <QuantitySelector quantity={2} />

      <button className="btn-primary my-5">Add to cart</button>
    </>
  );
};
