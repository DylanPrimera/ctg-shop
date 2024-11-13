import { Product } from "@/interfaces";
import { ProductCard } from "./ProductCard";

interface Props {
  products: Product[];
}

export const ProductsGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product}/>
      ))}
    </div>
  );
};
