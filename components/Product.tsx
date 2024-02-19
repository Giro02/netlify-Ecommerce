"use client";
import type { ProductType } from "@/types";

interface ProductProps {
  product: ProductType;
}

export default async function Product({ product }: ProductProps) {
  const test = product.category.map((category, index) => (
    <div key={index}>
      <div>{category.title}</div>
    </div>
  ));
  return (
    <div>
      <div>{product._id}</div>
      <div>{product.title}</div>
      <div>{product.slug.current}</div>
      <img src={product.productImage.image} alt={product.productImage.alt} />
      {test}
    </div>
  );
}
