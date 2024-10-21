"use client";
import type { ProductType } from "@/types";
import Link from "next/link";
import ProductInformations from "./ProductInformations";
import ProductShopBlock from "./ProductShopBlock";
import RelatedProducts from "./RelatedProducts";

interface ProductProps {
  product: ProductType;
  bundle: number;
}

export default function Product({ product, bundle }: ProductProps) {
  const selectedOption = bundle;
  return (
    <div className="px-4 md:container overflow-hidden font-montse text-color-5">
      <ul className="flex items-center justify-start font-montse text-sm text-color-5/75 my-5">
        <li className="flex items-center">
          <Link href="/"> Início </Link>&nbsp;
        </li>
        <li>{">"}&nbsp;</li>
        <li className="font-semibold  text-color-5 ">&nbsp;{product.title}</li>
      </ul>
      <div></div>
      <ProductShopBlock selectedOption={selectedOption} product={product} />
      {product.informations ? (
        <div id="InfoSection">
          <ProductInformations
            productName={product.title}
            informations={product.informations}
            description={product.description}
          />
        </div>
      ) : (
        <></>
      )}
      {product.similarProducts ? (
        <RelatedProducts similarProducts={product.similarProducts} />
      ) : (
        <></>
      )}
    </div>
  );
}
