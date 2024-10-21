"use client";
import type { CategoryType, ProductArray, ProductPreviewArray } from "@/types";
import { IoIosWarning } from "react-icons/io";
import Link from "next/link";
import { ConectaMais } from "./Svgs";
import ProductComponent from "./ProductComponent";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";

interface CategoryProps {
  category: CategoryType;
  productsArray: ProductPreviewArray;
  order: string;
  page: string;
  productCount: number;
  itemsPerPage: number;
}

export default function Category({
  category,
  productsArray,
  order,
  page,
  productCount,
  itemsPerPage,
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

  const finalProduct = itemsPerPage * parseInt(page);
  const initialProduct = finalProduct - itemsPerPage;
  const pageNumbers = Math.ceil(productCount / itemsPerPage);

  const products = productsArray.map((product, index) => {
    return <ProductComponent product={product} key={index} />;
  });

  return (
    <div className="px-4 md:container font-montse">
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
      <div className="flex mt-6 flex-col">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl items-center flex justify-start text-color-5">
            <span className="font-montse">{category.title} </span>
          </h1>
          <div className="flex w-full justify-between">
            {productsArray.length ? (
              <div className="text-base text-color-5/50">
                {productCount <= itemsPerPage ? (
                  <div>
                    {productCount === 1
                      ? `${productCount} item encontrado`
                      : `${productCount} itens encontrados`}
                  </div>
                ) : productCount > itemsPerPage &&
                  productsArray.length < itemsPerPage ? (
                  <div>
                    {productsArray.length === 1
                      ? `Item ${productCount} de ${productCount} encontrado`
                      : `Itens ${
                          productCount - productsArray.length
                        } - ${productCount} de ${productCount} encontrados`}
                  </div>
                ) : (
                  <div>
                    Itens {initialProduct + 1} - {finalProduct} de{" "}
                    {productCount} encontrados
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
            <div>
              <SortDropdown
                dropdownOptions={dropdownOptions}
                selectedOption={initialOrder}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col lg:flex-row gap-4">
        <div>
          {/* <div className="text-center flex-col hidden 2xl:flex border border-color-5/25 p-5 rounded-xl ">
            <h3 className="font-montse items-center font-semibold flex text-color-5 text-lg justify-center mb-2">
              Descrição
            </h3>
            <h3 className="font-montse text-justify items-center flex justify-center text-color-5 text-base">{`${category.description}`}</h3>
            <hr className="text-color-5/25 my-4" />
            <Link href="/" className="flex justify-center">
              <ConectaMais className="text-xl my-2" />
            </Link>
          </div> */}
        </div>
        <div className="w-full">
          {productsArray.length ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-20">
                {products}
              </div>
              {pageNumbers === 1 ? (
                <></>
              ) : (
                <Pagination currentPage={page} pageNumbers={pageNumbers} />
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
