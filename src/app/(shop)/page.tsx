import { getProducts } from "@/actions/products/products-actions";
import { ProductsGrid, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products } = await getProducts({ page });
  if (products.length === 0) redirect("/");

  return (
    <>
      <Title title="Store" subtitle="All products" />
      <ProductsGrid products={products} />
    </>
  );
}
