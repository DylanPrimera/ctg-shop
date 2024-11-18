"use client";

import { Skeleton } from "@/components";
import { useCartStore } from "@/store";
import { currencyFormatter } from "@/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export const CartSummary = () => {
  const { getSummaryInformation } = useCartStore();
  const { subTotal, taxes, total, productsInCart } = getSummaryInformation();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <Skeleton customClass="h-full" />;

  return (
    <>
      {loaded && (
        <div className="bg-white rounded-xl shadow-xl p-4 h-fit order-first md:order-last">
          <h2 className="text-2xl mb-2">Order summary</h2>
          <div className="grid grid-cols-2">
            <span className="antialiased">N°. products</span>
            <span className="text-rigth antialiased">
              {productsInCart === 1 ? "1 product" : `${productsInCart} products`}
            </span>
            <span className="antialiased">Subtotal</span>
            <span className="text-rigth antialiased"> {currencyFormatter(subTotal)}</span>
            <span className="antialiased">Taxes (15%)</span>
            <span className="text-rigth antialiased"> {currencyFormatter(taxes)}</span>
            <span className="mt-5 text-2xl antialiased">Total:</span>
            <span className="mt-5 text-2xl text-right antialiased">
               {currencyFormatter(total)}
            </span>
          </div>
          <div className="mt-5 mb-2 w-full">
            <Link
              href={"/checkout/address"}
              className="flex btn-primary justify-center antialiased"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
