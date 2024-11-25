"use client";
import { placeOrder } from "@/actions";
import { Skeleton } from "@/components";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormatter, sleep } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setPlacingOrder] = useState(false);
  const router = useRouter();

  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cartItems);
  const { getSummaryInformation } = useCartStore();
  const { subTotal, taxes, total, productsInCart } = getSummaryInformation();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setPlacingOrder(true);
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    // server action
    const orderResponse = await placeOrder(productsToOrder, address);
    if (!orderResponse?.ok) {
      setPlacingOrder(false);
      toast.error(orderResponse?.message, {
        position: "top-right",
      });
      return;
    }

 
    toast.success(orderResponse?.message, {
      position: "top-right",
    });
    await sleep(3);
    setPlacingOrder(false);
    // redirection
    router.replace("/orders/" + orderResponse?.order?.id);
  };

  if (!loaded) {
    return <Skeleton customClass="h-full" />;
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-4 order-first md:order-last h-fit">
        <ToastContainer />
        <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>
        <div className="mb-6">
          <p className="text-xl">
            {address.firstName} {address.lastName}
          </p>
          <p>{address.address1}</p>
          <p>{address.address2}</p>
          <p>
            {address.city}, {address.country}
          </p>
          <p>{address.zipCode}</p>
          <p>{address.phone}</p>
        </div>
        <hr className="w-full h-0.5 rounded bg-gray-200 mb-10" />
        <h2 className="text-2xl mb-2 font-bold">Order summary</h2>
        <div className="grid grid-cols-2">
          <span className="antialiased">N°. products</span>
          <span className="text-end antialiased">
            {productsInCart === 1 ? "1 product" : `${productsInCart} products`}
          </span>
          <span className="antialiased">Subtotal</span>
          <span className="text-end antialiased">
            {" "}
            {currencyFormatter(subTotal)}
          </span>
          <span className="antialiased">Taxes (15%)</span>
          <span className="text-end antialiased">
            {" "}
            {currencyFormatter(taxes)}
          </span>
          <span className="mt-5 text-2xl antialiased">Total:</span>
          <span className="mt-5 text-2xl text-end antialiased">
            {currencyFormatter(total)}
          </span>
        </div>
        <div className="mt-5 mb-2 w-full">
          <p className="mb-5">
            <span className="text-xs">
              By placing your order, you agree to our{" "}
              <a href="#" className="underline">
                privacy notice and condition of use
              </a>
              .
            </span>
          </p>
          <button
            className={clsx("flex w-full justify-center", {
              "btn-primary": !isPlacingOrder,
              "btn-disabled": isPlacingOrder,
            })}
            onClick={onPlaceOrder}
          >
            Place order
          </button>
        </div>
      </div>
    </>
  );
};
