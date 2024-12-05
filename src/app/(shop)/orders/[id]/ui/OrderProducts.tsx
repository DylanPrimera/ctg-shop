import { ProductImage } from "@/components";
import { OrderItem } from "@/interfaces";
import { currencyFormatter } from "@/utils";

interface Props {
  products: OrderItem[];
}
export const OrderProducts = ({ products }: Props) => {
  return (
    <>
      {products.map((item) => (
        <div
          key={`${item.product.slug}-${item.size}`}
          className="flex items-center mb-5"
        >
          <ProductImage
            src={item.product.ProductImage[0].url}
            alt={item.product.title}
            className="mr-5 rounded"
            width={100}
            height={100}
          />
          <div>
            <span className="flex items-center gap-2">
              {item.size} - {item.product.title}
            </span>
            <p>
              {currencyFormatter(item.price)} x {item.quantity}
            </p>
            <p className="font-bold">
              Subtotal: {currencyFormatter(item.price * item.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
