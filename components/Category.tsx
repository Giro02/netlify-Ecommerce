"use client";
import type { CategoryType, ProductArray } from "@/types";
import QiButton from "./QiButton";
import { getProductsByCategory } from "@/sanity/sanity.query";

interface CategoryProps {
  category: CategoryType;
}

export default async function Category({ category }: CategoryProps) {
  const productsArray: ProductArray = await getProductsByCategory(
    category.slug.current
  );
  const products = productsArray.map((product, index) => {
    return (
      <div className="items-center justify-center flex">
        <div className="flex-col bg-color-1 rounded-lg flex w-[400px] h-[500px] items-center justify-center p-6">
          <img
            src={product.productImage.image}
            alt={product.productImage.alt}
            className="w-full h-[300px] object-contain"
          />
          <h4>{product.title}</h4>
          <h4>{product.price}</h4>
          <h5>{product.description}</h5>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="container">
        <h1 className="text-5xl drop-shadow-sm items-center flex justify-center mt-4 py-7 bg-color-1 text-color-3 rounded-2xl">
          <span className="font-montse">{category.title}&nbsp; / &nbsp; </span>
          <span className="font-noto">{category.titleChinese}</span>
        </h1>
        <img
          className="rounded-2xl mt-4 border-2 border-color-2"
          src={category.categoryImage.image}
          alt={category.categoryImage.alt}
        />
        <h3 className="mt-4 font-montse text-2xl text-center items-center flex justify-center bg-color-1 text-color-3 rounded-2xl p-6">{`${category.description}`}</h3>
        <div className="container grid grid-cols-3 justify-center items-start mt-4">
          {products}
        </div>
      </div>
    </div>
  );
}
