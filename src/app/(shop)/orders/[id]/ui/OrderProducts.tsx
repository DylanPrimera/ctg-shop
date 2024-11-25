import { CartProduct } from "@/interfaces";
import { currencyFormatter } from "@/utils";
import Image from "next/image";

interface Props {
  products: CartProduct[];
}
export const OrderProducts = ({ products }: Props) => {
  return (
    <>
      {products.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className="flex items-center mb-5"
        >
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            className="mr-5 rounded"
            width={100}
            height={100}
          />
          <div>
            <span className="flex items-center gap-2">
              {product.size} - {product.title}
            </span>
            <p>
              {currencyFormatter(product.price)} x {product.quantity}
            </p>
            <p className="font-bold">
              Subtotal: {currencyFormatter(product.price)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
