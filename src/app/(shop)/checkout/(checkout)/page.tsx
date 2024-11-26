import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";


export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-24 sm:mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Checkout" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div className="flex flex-col mt-5 order-last md:order-first">
            {/* Some Info */}
            <span className="text-xl">Adjust items</span>
            <Link href={"/cart"} className="underline mb-5">
              Edit cart
            </Link>
            {/* Cart Items*/}
            <ProductsInCart />
          </div>

          {/* Checkout*/}
          <PlaceOrder/>
        </div>
      </div>
    </div>
  );
}
