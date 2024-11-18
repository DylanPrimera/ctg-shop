import { Title } from "@/components";
import Link from "next/link";
import { CartProducts } from "./ui/CartProducts";

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-24 sm:mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Cart" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div className="flex flex-col mt-5 order-last md:order-first">
            {/* Some Info */}
            <span className="text-xl">Add more products</span>
            <Link href={"/"} className="underline mb-5">
              Purchase products
            </Link>
            {/* Cart Items*/}
            <CartProducts />
          </div>

          {/* Checkout*/}
          <div className="bg-white rounded-xl shadow-xl p-4 h-fit order-first md:order-last">
            <h2 className="text-2xl mb-2">Order summary</h2>
            <div className="grid grid-cols-2">
              <span>N°. products</span>
              <span className="text-rigth">3 products</span>
              <span>Subtotal</span>
              <span className="text-rigth">$100</span>
              <span>Taxes (15%)</span>
              <span className="text-rigth">$15</span>
              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$115</span>
            </div>
            <div className="mt-5 mb-2 w-full">
              <Link
                href={"/checkout/address"}
                className="flex btn-primary justify-center"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
