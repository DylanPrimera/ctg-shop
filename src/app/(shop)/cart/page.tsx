import { Title } from "@/components";
import Link from "next/link";
import { CartProducts } from "./ui/CartProducts";
import { CartSummary } from "./ui/CartSummary";

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-24 sm:mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div className="flex flex-col mt-5 order-first">
            {/* Some Info */}
            <span className="text-xl">Add more products</span>
            <Link href={"/"} className="underline mb-5">
              Purchase products
            </Link>
            {/* Cart Items*/}
            <CartProducts />
          </div>

          {/* Checkout*/}
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
