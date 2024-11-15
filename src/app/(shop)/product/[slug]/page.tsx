import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div>
      back
      <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="col-span-1 md:col-span-2">
          <ProductMobileSlideShow
            images={product.images}
            title={product.title}
            customClass="block md:hidden w-full"
          />
          <ProductSlideShow
            images={product.images}
            title={product.title}
            customClass="hidden md:block md:w-full m-auto lg:w-[80%] 2xl:w-[60%]"
          />
        </div>
        <div className="col-span-1 px-5 ">
          <h1
            className={`${titleFont.className} antialiased font-bold text-xl`}
          >
            {product.title}
          </h1>
          <p className="text-lg mb-5">$ {product.price.toFixed(2)}</p>

          <SizeSelector
            selectedSize={product.sizes[0]}
            availableSizes={product.sizes}
          />

          <QuantitySelector quantity={2} />

          <button className="btn-primary my-5">Add to cart</button>
          <h3 className="font-bold text-sm">Description</h3>
          <article>
            <p className="font-light">{product.description}</p>
          </article>
        </div>
      </div>
    </div>
  );
}
