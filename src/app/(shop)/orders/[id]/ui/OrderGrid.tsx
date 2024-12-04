'use client'

import { Order, OrderItem } from "@/interfaces";
import { PayedTag } from "./PayedTag";
import { OrderProducts } from "./OrderProducts";
import { OrderInformation } from "./OrderInformation";
import { useCartStore } from "@/store";

interface Props {
    order: Order;
    products: OrderItem[]; 
}

export const OrderGrid = ({order, products}: Props) => {
    const clearCart = useCartStore(state=> state.clearCart);
    if(order) {
        clearCart();
    }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
      <div className="flex flex-col mt-5 order-last md:order-first">
        <PayedTag isPaid={order.isPaid ?? false} />
        {/* Cart Items*/}
        <OrderProducts products={products} />
      </div>

      {/* Checkout*/}
      <OrderInformation order={order as Order} />
    </div>
  );
};
