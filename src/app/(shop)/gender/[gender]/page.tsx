import { getProducts } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { ValidGender } from "@/interfaces";
import { notFound } from "next/navigation";

interface Props {
  params: {
    gender: ValidGender;
  };
  searchParams: {
    page?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page } = await searchParams;
  const { products: genderProducts, totalPages } = await getProducts({
    gender,
    page: page ? parseInt(page) : 1,
  });
  const validCategories: Record<ValidGender, string> = {
    men: "for men",
    women: "for women",
    kid: "for kid",
    unisex: "for everybody",
  };

  if (!(gender in validCategories) || genderProducts.length === 0) {
    notFound();
  }


  return (
    <>
      <Title
        title={`Articles ${validCategories[gender]}`}
        subtitle={`All ${gender}s products`}
      />
      <ProductsGrid products={genderProducts} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
