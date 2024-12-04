import { Title } from "@/components";

import { getOrderById } from "@/actions";

import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

import { auth } from "@/auth";
import { OrderGrid } from "./ui/OrderGrid";

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
  const session = await auth();
  const { order, products } = await getOrderById(id);
  if (!session?.user.id) {
    redirect("/auth/login?redirectTo=/orders/" + id);
  }
  if (!order) {
    notFound();
  }

  return (
    <div className="flex justify-center items-center mb-24 sm:mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order #${id.split("-").at(-1)}`} />
        <OrderGrid order={order} products={products}/>
      </div>
    </div>
  );
}
