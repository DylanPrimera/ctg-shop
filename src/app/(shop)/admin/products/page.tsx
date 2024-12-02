import { Pagination, Title } from "@/components";
import { ProductsList } from "./ui/ProductsList";
import { getProducts } from "@/actions";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ page: string }>;
}

export const metadata = {
  title: "Products",
  description: "List of orders placed by users.",
};

export default async function ProductsPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;
  const { products, ok, totalPages } = await getProducts({ page: pageParam });
  
  return (
    <>
      <Title title="Products" />
      <div className="flex justify-end mb-4">
        <Link href="/admin/products" className="btn-primary">
          New product
        </Link>
      </div>

      <ProductsList products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
