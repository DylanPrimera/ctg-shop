'use-client'
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${product.images[0]}`}
          alt={product.title}
          className="w-full object-cover"
          width={500}
          height={500}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.slug}`} className="hover:text-gray-500 hover:underline">{product.title}</Link>
        <span className="font-bold">$ {product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};
