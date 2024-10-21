"use client";
import Pagination from "@/components/Pagination";
import ProductComponent from "@/components/ProductComponent";
import SortDropdown from "@/components/SortDropdown";
import { ConectaMais } from "@/components/Svgs";
import { FuseProductResultArray, ProductPreviewArray } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { IoIosRefresh } from "react-icons/io";

type BuscaCatalogadaProps = {
  order: string;
  query: string;
  page: string;
  allProducts: ProductPreviewArray;
};

export default function BuscaCatalogada({
  order,
  query,
  page,
  allProducts,
}: BuscaCatalogadaProps) {
  const itemsPerPage = 12;
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
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<FuseProductResultArray>();
  const [productsResult, setProductsResult] = useState<JSX.Element[]>([]);
  const [productCount, setProductCount] = useState(0);
  const Fuse = require("fuse.js");
  const options = {
    keys: ["title", "description", "category.title"],
  };
  const fuse = new Fuse(allProducts, options);
  const pageNumbers = Math.ceil(productCount / itemsPerPage);

  function GenerateProducts(results: FuseProductResultArray) {
    const generatedProducts = results.map((product, index) => {
      return <ProductComponent product={product.item} key={index} />;
    });
    return generatedProducts;
  }

  useEffect(() => {
    if (query) {
      setLoading(true);
      setResults(fuse.search(query));
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    if (results) {
      setProductCount(results.length);
      if (initialOrder === "0") {
        const sortedResults = [...results];
        setProductsResult(
          GenerateProducts(sortedResults.slice(initialProduct, finalProduct))
        );
      } else if (initialOrder === "1") {
        const sortedResults = [...results].sort(
          (a, b) =>
            a.item.priceBundle[0].unitPrice - b.item.priceBundle[0].unitPrice
        );
        setProductsResult(
          GenerateProducts(sortedResults.slice(initialProduct, finalProduct))
        );
      } else if (initialOrder === "2") {
        const sortedResults = [...results].sort((a, b) =>
          b.item.title.localeCompare(`${a.item.title}`)
        );
        setProductsResult(
          GenerateProducts(sortedResults.slice(initialProduct, finalProduct))
        );
      }
    }
  }, [results, initialOrder, page]);

  if (loading) {
    return (
      <div className="container font-montse text-color-5">
        <div className="bg-color-1 items-center justify-center rounded-md p-4 flex gap-4 text-base  text-color-3 mt-8 animate-pulse">
          Buscando Produtos
          <IoIosRefresh className="text-2xl animate-spin-slower" />
        </div>
      </div>
    );
  }

  if (query) {
    return (
      <div className="container font-montse text-color-5">
        <ul className="flex items-center justify-start font-montse text-sm text-color-5/75 my-5">
          <li>
            <Link href="/"> Início </Link>&nbsp;
          </li>
          <li>{">"}&nbsp;</li>
          <li className="font-semibold  text-color-5">
            Resultados da busca por: '{query}'
          </li>
        </ul>
        <div className="flex  mt-6 justify-between items-center">
          <div className="flex justify-start items-end gap-3">
            <h1 className="text-3xl items-center flex justify-start text-color-5">
              <span className="font-montse ">
                Resultados da busca por: '{query}'
              </span>
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between font-montse mt-4">
          <div>
            {productsResult.length ? (
              <div className="text-base text-color-5/50">
                {productCount <= itemsPerPage ? (
                  <div>
                    {productCount === 1
                      ? `${productCount} item encontrado`
                      : `${productCount} itens encontrados`}
                  </div>
                ) : productCount > itemsPerPage &&
                  productsResult.length < itemsPerPage ? (
                  <div>
                    {productsResult.length === 1
                      ? `Item ${productCount} de ${productCount} encontrado`
                      : `Itens ${
                          productCount - productsResult.length
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
          </div>
          <SortDropdown
            dropdownOptions={dropdownOptions}
            selectedOption={initialOrder}
            query={query}
          />
        </div>
        <div className="grid grid-cols-5 mt-6 gap-4">
          <div className="col-span-1 pr-6">
            <div className="text-center flex-col flex border border-color-5/25 p-5 rounded-xl ">
              <Link href="/" className="flex justify-center">
                <ConectaMais className="text-2xl my-2" />
              </Link>
            </div>
          </div>
          <div className="col-span-4">
            {productsResult.length ? (
              <div className="flex flex-col justify-center">
                <div className="grid grid-cols-4 justify-center items-start gap-4">
                  {productsResult}
                </div>
                {pageNumbers === 1 ? (
                  <></>
                ) : (
                  <Pagination
                    currentPage={page}
                    pageNumbers={pageNumbers}
                    query={query}
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
  } else {
    return (
      <div className="container font-montse text-color-5">
        <div className="bg-color-6 items-center justify-center rounded-md p-4 flex gap-4 text-base  mt-8">
          <IoIosWarning className="text-2xl" />
          Busca inválida
        </div>
      </div>
    );
  }
}
