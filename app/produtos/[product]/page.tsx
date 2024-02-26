import Product from "@/components/Product";
import { getSingleProduct } from "@/sanity/sanity.query";
import { ProductType } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    product: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.product;
  const product: ProductType = await getSingleProduct(slug);
  if (!product) {
    notFound();
  } else
    return {
      title: `${product.title}`,
      description: `${product.description}`,
      openGraph: {
        description: `${product.description}`,
        images: product.productImage.image,
        title: `${product.title}`,
      },
    };
}

export default async function ProductLayout({ params }: Props) {
  const slug = params.product;
  const product: ProductType = await getSingleProduct(slug);
  if (!product) {
    notFound();
  } else {
    return (
      <main>
        <Product product={product} />
      </main>
    );
  }
}
