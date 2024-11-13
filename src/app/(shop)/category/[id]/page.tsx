import { ProductsGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const pageCategories = ["men", "women", "kid"];

const burnedProducts = initialData.products;

function capitalizeFirstLetter(text: string) {
  const capText = text.charAt(0).toUpperCase() + text.slice(1);
  return capText;
}

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  const categoryProducts = burnedProducts.filter(
    (product) => product.gender === id
  );

  if (!pageCategories.includes(id!)) {
    notFound();
  }

  return (
    <>
      <Title
        title={capitalizeFirstLetter(id)}
        subtitle={`All ${id}'s products`}
      />
      <ProductsGrid products={categoryProducts} />
    </>
  );
}
