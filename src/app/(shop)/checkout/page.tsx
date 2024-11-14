import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const cartProducts = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-24 sm:mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Checkout" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div className="flex flex-col mt-5 order-last md:order-first">
            {/* Cart Items*/}

            {cartProducts.map((product) => (
              <div key={product.slug} className="flex items-center mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  className="mr-5 rounded"
                  width={100}
                  height={100}
                />
                <div>
                  <p>{product.title}</p>
                  <p>$ {product.price.toFixed(2)} x 3</p>
                  <p className="font-bold">Subtotal: ${(product.price * 3).toFixed(2)}</p>
                </div>
              </div>
            ))}
            {/* Some Info */}
            <span className="text-xl">Adjust items</span>
            <Link href={"/cart"} className="underline mb-5">
              Edit cart
            </Link>
          </div>

          {/* Checkout*/}
          <div className="bg-white rounded-xl shadow-xl p-4 order-first md:order-last h-fit">
            <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>
            <div className="mb-10">
              <p className="text-xl">John Doe</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. Centro</p>
              <p>CDMX</p>
              <p>ZP 12345</p>
              <p>000000000000</p>
            </div>
            <hr className="w-full h-0.5 rounded bg-gray-200 mb-10"/>
            <h2 className="text-2xl mb-2 font-bold">Order summary</h2>
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
              <p className="mb-5">
                <span className="text-xs">
                  By placing your order, you agree to our <a href="#" className="underline">privacy notice and condition of use</a>. 
                </span>
              </p>
              <Link href={"/orders/123"} className="flex btn-primary justify-center">Place order</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}