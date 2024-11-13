"use client";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const [displayImage, setdisplayImage] = useState(product.images[0]);

  const handleMouseEvent = (isEnter: boolean) => {
    if (isEnter) {
      setdisplayImage(product.images[1]);
      return;
    }
    setdisplayImage(product.images[0]);
  };

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover transition-all rounded"
          width={500}
          height={500}
          onMouseEnter={() => handleMouseEvent(true)}
          onMouseLeave={() => handleMouseEvent(false)}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          href={`/product/${product.slug}`}
          className="hover:text-gray-500 hover:underline"
        >
          {product.title}
        </Link>
        <span className="font-bold">$ {product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};
