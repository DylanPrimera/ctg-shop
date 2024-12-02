"use client";

import { Product, ProductImage, ValidSize } from "@/interfaces";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface Props {
  product: Product & { ProductImage?: ProductImage[] };
  categories: { id: string; name: string }[];
}

const sizes: ValidSize[] = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  id?: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kid" | "unisex";
  categoryId: string;
  images: string[];
}

export const ProductForm = ({ product, categories }: Props) => {
  const { handleSubmit, register, formState } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(", "),
      sizes: product.sizes ?? [],
    },
  });
  console.log({ formState });
  const onSubmit = async (data: FormInputs) => {
    console.log(data);
  };
  return (
    <form
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200 outline-none resize-none"
            {...register("description", { required: true, minLength: 10 })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("gender", { required: true })}
          >
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Select]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Save</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Sizes</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                className="flex  items-center justify-center w-10 h-10 mr-2 border rounded-md"
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Images</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200 outline-none"
              accept="image/png, image/jpeg"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product?.ProductImage?.map((image) => (
              <div key={image.id}>
                <Image
                  src={`/products/${image.url}`}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="rounded shadow-md"
                />
                <button className="btn-danger w-full">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
