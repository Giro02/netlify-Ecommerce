"use client";
import type { ProductType } from "@/types";

interface ProductProps {
  product: ProductType;
}

export default async function Product({ product }: ProductProps) {
  return (
    <div>
      <div>{product._id}</div>
      <div>{product.title}</div>
      <div>{product.slug.current}</div>
      <img src={product.productImage.image} alt={product.productImage.alt} />
    </div>
  );
}
