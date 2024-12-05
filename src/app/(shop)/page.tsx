export const revalidate = 60;

import { getProducts } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";


interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function Home({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;
  const { products, totalPages } = await getProducts({
    page: pageParam,
  });


  return (
    <>
      <Title title="Store" subtitle="All products" />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages}/>
    </>
  );
}
