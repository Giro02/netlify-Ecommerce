import Product from "@/components/Product";
import { getSingleProduct } from "@/sanity/sanity.query";
import { ProductPreview } from "@/types";
import { Metadata } from "next";

type Props = {
  params: {
    product: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.product;
  const product: ProductPreview = await getSingleProduct(slug);
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
  const product: ProductPreview = await getSingleProduct(slug);
  return (
    <main>
      <Product product={product} />
    </main>
  );
}
