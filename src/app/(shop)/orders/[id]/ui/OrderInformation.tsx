"use client";
import { Order } from "@/interfaces";
import { currencyFormatter } from "@/utils";
import React from "react";
import { PayedTag } from "./PayedTag";
import { PayPalButtton } from "@/components";

interface Props {
  order: Order;
}

export const OrderInformation = ({ order }: Props) => {
  const { OrderAddress: address } = order;

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-4 order-first md:order-last h-fit">
        <h2 className="text-2xl mb-2 font-bold">Delivery address</h2>
        <div className="mb-10">
          <p className="text-xl">
            {address.firstName} {address.lastName}
          </p>
          <p>{address.address1}</p>
          <p>{address.address2}</p>
          <p>
            {address.city}, {address.countryId}
          </p>
          <p>{address.zipCode}</p>
          <p>{address.phone}</p>
        </div>
        <hr className="w-full h-0.5 rounded bg-gray-200 mb-10" />
        <h2 className="text-2xl mb-2 font-bold">Order summary</h2>
        <div className="grid grid-cols-2">
          <span>N°. products</span>
          <span className="text-end">
            {order.itemsInOrder === 1
              ? "1 product"
              : `${order.itemsInOrder} products`}
          </span>
          <span>Subtotal</span>
          <span className="text-end">{currencyFormatter(order.subTotal)}</span>
          <span>Taxes (15%)</span>
          <span className="text-end">{currencyFormatter(order.taxes)}</span>
          <span className="mt-5 text-2xl">Total:</span>
          <span className="mt-5 text-2xl text-right">
            {currencyFormatter(order.total)}
          </span>
        </div>

        {order?.isPaid && <PayedTag isPaid={order?.isPaid as boolean} customClass="my-5" />}
        {!order?.isPaid && (
          <div className="my-3">
            <PayPalButtton amount={order.total} orderId={order.id} />
          </div>
        )}
      </div>
    </>
  );
};
