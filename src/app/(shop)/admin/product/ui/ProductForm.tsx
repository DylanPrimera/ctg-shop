"use client";

import { createOrUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage as ImageCustom } from "@/components";
import { Product, ProductImage, ValidSize } from "@/interfaces";
import { useToastStore } from "@/store";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product & { ProductImage?: ProductImage[] }>;
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
  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {
  const { handleSubmit, register, getValues, setValue, watch } =
    useForm<FormInputs>({
      defaultValues: {
        ...product,
        tags: product.tags?.join(", "),
        sizes: product.sizes ?? [],
        images: undefined,
      },
    });
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);
  const [loading, setLoading] = useState(false);
  watch("sizes"); // tells the form to re render by a field
  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    const { images, ...productToSave } = data;
    if (product.id) {
      formData.append("id", product.id ?? "");
    }

    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description ?? "");
    formData.append("price", productToSave.price.toString());
    formData.append("inStock", productToSave.inStock.toString());
    formData.append("sizes", productToSave.sizes.toString());
    formData.append("tags", productToSave.tags);
    formData.append("gender", productToSave.gender);
    formData.append("categoryId", productToSave.categoryId);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }
    const { ok, message, productDB } = await createOrUpdateProduct(formData);
    if (!ok) {
      showToast(message, 'error');
      return;
    }
    showToast(message, "success");
    setValue('images', undefined);
    router.replace(`/admin/product/${productDB?.slug}`);
  };

  const onSizeChanged = (size: string) => {
    const sizes = getValues("sizes");
    const sizeIndex = sizes.findIndex((s) => s === size);
    if (sizeIndex !== -1) {
      setValue(
        "sizes",
        sizes.filter((s) => s !== size)
      );
    } else {
      setValue("sizes", [...sizes, size]);
    }
  };
  const handleDeleteProductImage = async (id: number, url: string) => {
    setLoading(true);
    const { ok, message } = await deleteProductImage(id, url);
    if (!ok) {
      showToast(message, "error");
      setLoading(false);
      return;
    }
    showToast(message, "success");
    setLoading(false);
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
            placeholder="Product title"
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            placeholder="Product slug"
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            placeholder="Product description"
            rows={5}
            className="p-2 border rounded-md bg-gray-200 outline-none resize-none"
            {...register("description", { required: true, minLength: 10 })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            placeholder="0.00"
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            placeholder="example,example,example"
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

      {/* Select sizes and images */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            type="number"
            placeholder="0"
            className="p-2 border rounded-md bg-gray-200 outline-none"
            {...register("inStock", { required: true, min: 0 })}
          />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Sizes</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  "p-1 border cursor-pointer rounded-md mr-2 mb-2 w-10 transition-all text-center",
                  {
                    "bg-blue-500 text-white border-blue-500":
                      getValues("sizes").includes(size),
                  }
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Images</span>
            <input
              type="file"
              {...register("images", { required: true })}
              multiple
              className="p-2 border rounded-md bg-gray-200 outline-none"
              accept="image/png, image/jpeg, image/avif"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product?.ProductImage?.map((image) => (
              <div key={image.id}>
                <ImageCustom
                  src={image.url}
                  alt={product.title!}
                  width={300}
                  height={300}
                  className="rounded-t-xl shadow-md w-full"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteProductImage(image.id, image.url)}
                  className={clsx("w-full rounded-b-xl", {
                    "btn-disabled opacity-50 pointer-events-none": loading,
                    "btn-danger":!loading
                  })}
                  aria-disabled={loading}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};
