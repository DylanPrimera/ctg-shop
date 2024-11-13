import { ProductsGrid, Title } from "@/components";
import { ValidCategory } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: ValidCategory;
  };
}

const burnedProducts = initialData.products;

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  const categoryProducts = burnedProducts.filter(
    (product) => product.gender === id
  );
  const validCategories: Record<ValidCategory, string> = {
    'men': "for men",
    'women': "for women",
    'kid': "for kid",
    'unisex': "for everybody"
  }
 
  if (!(id in validCategories)) {
    notFound();
  }

  return (
    <>
      <Title
        title={`Articles ${validCategories[id]}`}
        subtitle={`All ${id}s products`}
      />
      <ProductsGrid products={categoryProducts} />
    </>
  );
}
