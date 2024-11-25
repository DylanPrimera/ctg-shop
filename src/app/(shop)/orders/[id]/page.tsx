import { Title } from "@/components";
import { OrderProducts } from "./ui/OrderProducts";
import { getOrderById } from "@/actions";
import { CartProduct, Order } from "@/interfaces";
import { OrderInformation } from "./ui/OrderInformation";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { PayedTag } from "./ui/PayedTag";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { order } = await getOrderById(id);
  return {
    title: `Order #${order?.id?.split("-").at(-1)}`,
    description: `Order #${order?.id?.split("-").at(-1)}`,
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  const { order, products } = await getOrderById(id);
  if (!order) {
    notFound();
  }

  return (
    <div className="flex justify-center items-center mb-24 sm:mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
          <div className="flex flex-col mt-5 order-last md:order-first">
            <PayedTag isPaid={order?.isPaid as boolean} />
            {/* Cart Items*/}
            <OrderProducts products={products as CartProduct[]} />
          </div>

          {/* Checkout*/}
          <OrderInformation order={order as Order} />
        </div>
      </div>
    </div>
  );
}
