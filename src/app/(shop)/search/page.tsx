import { getProducts } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { notFound } from "next/navigation";

interface Props {
  searchParams: Promise<{ q: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;
  const { products, totalPages } = await getProducts({
    page: pageParam,
    search: q
  });

  if (q === undefined) {
    notFound();
  }
  console.log(products, totalPages);

  return (
    <>
      <Title title={`You search: ${q}`} subtitle='' />
      <ProductsGrid products={products} />
      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </>
  );
}
