"use client";
import type { CategoryType, ProductArray } from "@/types";
import QiButton from "./QiButton";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import CategoryDropdown from "./CategoryDropdown";

interface CategoryProps {
  category: CategoryType;
  productsArray: ProductArray;
}

export default function Category({ category, productsArray }: CategoryProps) {
  const dropdownOptions = ["Relevância", "Nome", "Preço"];
  const [selectedOption, setSelectedOption] = useState("0");
  const [products, setProducts] = useState<JSX.Element[]>([]);
  const handleDropdownChange = (value: string) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    if (selectedOption === "0") {
      const sortedProducts = [...productsArray].sort(
        (a, b) => b.unitsSold - a.unitsSold
      );
      setProducts(GenerateProducts(sortedProducts));
    } else if (selectedOption === "1") {
      const sortedProducts = [...productsArray].sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
      setProducts(GenerateProducts(sortedProducts));
    } else if (selectedOption === "2") {
      const sortedProducts = [...productsArray].sort((a, b) =>
        b.title.localeCompare(`${a.title}`)
      );
      setProducts(GenerateProducts(sortedProducts));
    }
    function GenerateProducts(sortedProducts: ProductArray) {
      const products = sortedProducts.map((product, index) => {
        return (
          <div className="items-center justify-center flex" key={index}>
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
      return products;
    }
  }, [selectedOption]);

  return (
    <div className="container">
      <ul className="flex items-center justify-start font-montse text-sm text-color-5/75 my-5">
        <li>
          <Link href="/"> Início </Link>&nbsp;
        </li>
        <li>{">"}&nbsp;</li>
        <li className="font-semibold  text-color-5">{category.title}</li>
      </ul>
      <img
        className="rounded-xl"
        src={category.categoryImage.image}
        alt={category.categoryImage.alt}
      />
      <div className="flex  mt-6 justify-between items-center">
        <div className="flex justify-start items-end gap-3">
          <h1 className="text-4xl items-center flex justify-start text-color-5">
            <span className="font-montse">{category.title} /&nbsp;</span>
            <span className="font-noto text-3xl">{category.titleChinese}</span>
          </h1>
          <div className="text-base text-color-5/50">
            {productsArray.length} produtos encontrados
          </div>
        </div>
        <CategoryDropdown
          handleDropdownChange={handleDropdownChange}
          dropdownOptions={dropdownOptions}
          selectedOption={selectedOption}
        />
      </div>
      <div className="grid grid-cols-4 mt-6 gap-6">
        <div className="col-span-1 pr-6">
          <h3 className="font-montse text-lg text-center items-center flex justify-center text-color-5 border border-color-5/25 p-5 rounded-xl">{`${category.description}`}</h3>
        </div>
        <div className="col-span-3">
          <div className="container grid grid-cols-4 justify-center items-start ">
            {products}
          </div>
        </div>
      </div>
    </div>
  );
}
