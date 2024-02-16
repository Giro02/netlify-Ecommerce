"use client";
import type { CategoryType, ProductArray } from "@/types";
import { IoIosWarning } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategoryDropdown from "./CategoryDropdown";
import { formatCurrency } from "@/utils/UtilityFunctions";
import CategoryPagination from "./CategoryPagination";

interface CategoryProps {
  category: CategoryType;
  productsArray: ProductArray;
  order: string;
  page: string;
  productCount: number;
}

export default function Category({
  category,
  productsArray,
  order,
  page,
  productCount,
}: CategoryProps) {
  const dropdownOptions = [
    { pt: "Relevância", en: "Relevance" },
    { pt: "Preço", en: "Price" },
    { pt: "Nome", en: "Name" },
  ];
  let initialOrder = "0";
  if (order === dropdownOptions[0].en.toLowerCase()) {
    initialOrder = "0";
  } else if (order === dropdownOptions[1].en.toLowerCase()) {
    initialOrder = "1";
  } else if (order === dropdownOptions[2].en.toLowerCase()) {
    initialOrder = "2";
  }

  const finalProduct = 2 * parseInt(page);
  const initialProduct = finalProduct - 2;
  const pageNumbers = Math.ceil(productCount / 12);

  const products = productsArray.map((product, index) => {
    return (
      <div className="items-center justify-center flex" key={index}>
        <div className="flex-col bg-color-1 rounded-lg flex w-[400px] h-[500px] items-center justify-center p-6">
          <img
            src={product.productImage.image}
            alt={product.productImage.alt}
            className="w-full h-[300px] object-contain"
          />
          <h4>{product.title}</h4>
          <h4>{formatCurrency(product.price)}</h4>
          <h5>{product.description}</h5>
        </div>
      </div>
    );
  });

  return (
    <div className="container font-montse">
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
          {productsArray.length ? (
            <div className="text-base text-color-5/50">
              {productCount <= 12 ? (
                <div>
                  {productCount === 1
                    ? `${productCount} item encontrado`
                    : `${productCount} itens encontrados`}
                </div>
              ) : productCount > 12 && productsArray.length < 12 ? (
                <div>
                  {productsArray.length === 1
                    ? `Item ${productCount} de ${productCount}`
                    : `Itens ${
                        productCount - productsArray.length
                      } - ${productCount} de ${productCount} encontrados`}
                </div>
              ) : (
                <div>
                  Itens {initialProduct + 1} - {finalProduct} de {productCount}{" "}
                  encontrados
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <CategoryDropdown
          dropdownOptions={dropdownOptions}
          selectedOption={initialOrder}
          slug={category.slug.current}
        />
      </div>
      <div className="grid grid-cols-5 mt-6 gap-4">
        <div className="col-span-1 pr-6">
          <div className="text-center flex-col flex border border-color-5/25 p-5 rounded-xl ">
            <h3 className="font-montse text-justify items-center flex justify-center text-color-5 text-base">{`${category.description}`}</h3>
            <hr className="text-color-5/25 my-4" />
          </div>
        </div>
        <div className="col-span-4">
          {productsArray.length ? (
            <div className="flex flex-col justify-center">
              <div className="grid grid-cols-4 justify-center items-start ">
                {products}
              </div>
              {pageNumbers === 1 ? (
                <></>
              ) : (
                <CategoryPagination
                  currentPage={page}
                  pageNumbers={pageNumbers}
                />
              )}
            </div>
          ) : (
            <div className="bg-color-6 items-center justify-center rounded-md p-4 flex gap-4 text-base text-color-5">
              <IoIosWarning className="text-2xl" />
              Não encontramos produtos correspondentes a seleção
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
