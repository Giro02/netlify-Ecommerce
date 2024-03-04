import { FuseProductResultArray, ProductPreviewArray } from "@/types";
import { formatCurrency } from "@/utils/UtilityFunctions";
import Link from "next/link";
import { KeyboardEvent, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

type ProcureProps = {
  productsSearch: ProductPreviewArray;
};

export default function Procure({ productsSearch }: ProcureProps) {
  const Fuse = require("fuse.js");
  const options = {
    keys: ["title", "description", "category.title"],
  };
  const fuse = new Fuse(productsSearch, options);
  const [query, setQuery] = useState<FuseProductResultArray>();
  const [searchInput, setSearchInput] = useState("");
  const [fetchedProducts, setFetchedProducts] = useState<JSX.Element[]>([]);
  const [visible, setVisible] = useState(false);
  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(fuse.search(e.target.value).slice(0, 5));
    setSearchInput(e.target.value);
  }

  const handleFocus = () => {
    setVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setVisible(false);
    }, 200);
  };

  useEffect(() => {
    if (query !== null && query !== undefined) {
      setFetchedProducts(GenerateFetchedProducts(query));
    }

    function GenerateFetchedProducts(queryResult: FuseProductResultArray) {
      const productComponent = queryResult.map((product, index) => {
        const value = formatCurrency(product.item.priceBundle[0].unitPrice);
        return (
          <div key={index} className="px-6 py-1">
            <Link
              href={`/produtos/${product.item.slug.current}`}
              className="items-center grid grid-cols-6 border border-color-1 border-opacity-0 hover:border-opacity-100 transition rounded-lg px-2 py-2"
            >
              <img
                src={product.item.productImage.image}
                alt={product.item.productImage.alt}
                className="object-contain h-[50px] w-full col-span-1 flex justify-start items-start"
              />
              <div className="col-span-4 truncate">{product.item.title}</div>
              <div className="col-span-1 items-center flex justify-center font-semibold  text-sm">
                {value}
              </div>
            </Link>
          </div>
        );
      });
      return productComponent;
    }
  }, [query]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput) {
      document.getElementById("searchLink")?.click();
      setTimeout(() => {
        setVisible(false);
      }, 200);
    }
  };

  return (
    <div
      className=" max-w-[520px] w-full hidden md:flex md:flex-col"
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="flex w-full overflow-hidden z-20">
        <input
          className="h-[40px] border border-color-4 w-full px-4 rounded-l-md "
          placeholder="Pesquisar na loja toda..."
          onChange={handleSearchInput}
          autoComplete="off"
          onKeyDown={handleKeyDown}
        ></input>
        {searchInput ? (
          <Link
            id="searchLink"
            href={`/buscacatalogada?q=${searchInput}`}
            className="w-[48px] h-[40px] bg-color-1 rounded-r-md flex items-center justify-center text-2xl text-color-3"
          >
            <IoIosSearch />
          </Link>
        ) : (
          <button className="w-[48px] h-[40px] bg-color-1 rounded-r-md flex items-center justify-center text-2xl text-color-3">
            <IoIosSearch />
          </button>
        )}
      </div>
      {visible ? (
        <div className="flex w-full relative">
          <div className="absolute w-full flex-col flex z-20 bg-color-3 font-montse text-color-5 rounded-b-lg">
            {fetchedProducts}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div
        className={` ${
          visible ? " opacity-100 " : "opacity-0 invisible"
        } fixed z-10 bg-color-5/60 w-full h-full transition-all duration-700 top-0 left-0`}
      />
    </div>
  );
}
