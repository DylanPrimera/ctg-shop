"use client";
import { Product } from "@/interfaces";
import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import { sleep } from "@/utils";
import { SkeletonCards } from "@/components/ui/skeleton-cards/SkeletonCards";
import { NoData } from "@/components";

interface Props {
  products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {
  const [loading, setLoading] = useState(true);
  const handleLoading = async () => {
    await sleep(1);
    setLoading(false);
  };
  useEffect(() => {
    handleLoading();
  }, []);
  return (
    <>
      {loading && <SkeletonCards />}
      {!loading && products.length === 0 && (
       <NoData title="No products to show"/>
      )}
      {!loading && products.length !== 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 mb-10">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      )}
    </>
  );
};
