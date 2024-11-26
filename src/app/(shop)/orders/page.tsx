import { getOrders } from "@/actions";
import { Pagination, Title } from "@/components";
import { OrdersList } from "./ui/OrdersList";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export const metadata = {
  title: "Users Orders",
  description: "List of orders placed by users.",
};

export default async function OrdersPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;
  const { orders, ok, totalPages } = await getOrders({
    page: pageParam,
  });
  if (!ok) {
    redirect("/auth/login?redirectTo=/orders");
  }

  return (
    <>
      <Title title="Orders" />
      <OrdersList orders={orders}/>
      <Pagination totalPages={totalPages as number} />
    </>
  );
}
