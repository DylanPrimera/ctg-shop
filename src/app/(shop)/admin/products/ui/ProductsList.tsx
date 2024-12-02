"use client";

import { Product } from "@/interfaces";
import { currencyFormatter } from "@/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  products: Product[];
}

export const ProductsList = ({ products }: Props) => {
  return (
    <div className="mb-10">
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Image
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Title
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Price
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Gender
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Stock
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Sizes
            </th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="text-sm text-gray-900 font-light px-6 py-4 ">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded"
                  />
                </Link>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 ">
                <Link href={`/admin/products/${product.slug}`} className="underline text-gray-600 antialiased">
                  {product.title}
                </Link>
                
              </td>
              <td className="text-sm text-gray-900 font-semibold px-6 py-4 ">
                {currencyFormatter(product.price)}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4">
                {product.gender}
              </td>
              <td className="text-sm text-gray-900 font-semibold px-6 py-4">
                {product.inStock}
              </td>
              <td className="mt-4 text-sm text-gray-900 px-6 font-semibold">
                {product.sizes.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
