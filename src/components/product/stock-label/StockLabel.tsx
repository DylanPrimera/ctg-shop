"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const stock = await getStockBySlug(slug);
    setStock(stock ?? 1);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="rounded animate-pulse bg-gray-200">&nbsp;</div>
      ) : (
        <h1
          className={`${titleFont.className} antialiased font-semibold text-lg my-2`}
        >
          Stock: {stock}
        </h1>
      )}
    </>
  );
};
