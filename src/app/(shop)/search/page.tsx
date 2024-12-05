import { getProducts } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { notFound } from "next/navigation";

interface Props {
  searchParams: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const pageParam = page ? parseInt(page) : 1;
  const { products, totalPages } = await getProducts({
    page: pageParam,
    search: q,
  });

  if (products.length === 0) {
    notFound();
  }
  console.log(products, totalPages);

  return (
    <>
      <div className="flex items-center justify-center w-50 mx-auto">
        <input type="Search" placeholder="Search" />
      </div>

      {products && q !== undefined && (
        <Title title={`You search: ${q !== undefined ? q : ""}`} subtitle="" />
      )}
      {products && q !== undefined && <ProductsGrid products={products} />}
      {totalPages > 1 && products && q !== undefined && <Pagination totalPages={totalPages} />}
    </>
  );
}
