export const revalidate = 60;


import { getProducts } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { Gender } from "@prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ gender: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page } = await searchParams;

  const validGenders: Record<string, string> = {
    'men': "for men",
    'women': "for women",
    'kid': "for kid",
    'unisex': "for everybody",
  };

  if (!(gender in validGenders)) {
    notFound();
  }
  const { products: genderProducts, totalPages } = await getProducts({
    gender: gender as Gender,
    page: page ? parseInt(page) : 1,
  });

  if(genderProducts.length === 0) notFound()

  return (
    <>
      <Title
        title={`Articles ${validGenders[gender]}`}
        subtitle={`All ${gender}s products`}
      />
      <ProductsGrid products={genderProducts} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
