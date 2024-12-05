import { getProducts } from "@/actions";
import { SearchGrid } from "./ui/SearchGrid";

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


  return <SearchGrid products={products} totalPages={totalPages} q={q} />;
}
