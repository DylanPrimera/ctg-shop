import { getProducts } from "@/actions/products/products-actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;
  const { products, totalPages } = await getProducts({
    page: pageParam,
  });


  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title="Store" subtitle="All products" />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages}/>
    </>
  );
}
