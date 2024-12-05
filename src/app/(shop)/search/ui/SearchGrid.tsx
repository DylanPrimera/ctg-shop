"use client";
import React from "react";
import { SearchBox } from "./SearchBox";
import { Pagination, ProductsGrid, Title } from "@/components";
import { Product } from "@/interfaces";
import { useRouter } from "next/navigation";

interface Props {
  products: Product[];
  q?: string;
  totalPages?: number;
}

export const SearchGrid = ({ products, q, totalPages }: Props) => {
  const router = useRouter();
  const handleSearch = async (q: string) => {
    if (q) {
      router.push(`/search?q=${q}`);
    }
  };
  return (
    <>
      <SearchBox q={q} onSearchValue={handleSearch} />

      {products && q !== undefined && (
        <Title title={`You search: ${q !== undefined ? q : ""}`} subtitle="" />
      )}
      {products && q !== undefined && <ProductsGrid products={products!} />}
      {totalPages! > 1 && products && q !== undefined && (
        <Pagination totalPages={totalPages!} />
      )}
    </>
  );
};
