"use client";
import { formatCurrency } from "@/utils/UtilityFunctions";
import { TbPigMoney } from "react-icons/tb";
import BundleDropdown from "./BundleDropdown";
import { Link as Scroll } from "react-scroll";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ProductType } from "@/types";
import { useCart } from "@/app/context/CartContext";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaCheckSquare } from "react-icons/fa";
import ProductInformations from "./ProductInformations";

type ProductShopBlockProps = {
  selectedOption: number;
  product: ProductType;
};

export default function ProductShopBlock({
  selectedOption,
  product,
}: ProductShopBlockProps) {
  const { addItem } = useCart();
  const selectedPrice = product.priceBundle[selectedOption];
  const productDetails = {
    title: product.title,
    unitPrice: selectedPrice.unitPrice,
    unitsNumber: selectedPrice.unitsNumber,
    total: selectedPrice.unitPrice * selectedPrice.unitsNumber,
    image: product.productImage.image,
  };
  const [popUp, setPopUp] = useState(false);

  const handleAddToCart = () => {
    addItem(productDetails);
    setPopUp(true);
    setTimeout(() => {
      setPopUp(false);
    }, 3000);
  };
  console.log(product);
  return (
    <div className="lg:px-40 flex flex-col lg:flex-row gap-8 lg:gap-28 mt-7">
      {popUp && (
        <div className="fixed flex items-center gap-4 top-0 left-1/2 transform -translate-x-1/2 bg-color-1 text-color-3 px-4 py-2 rounded-b-lg">
          <FaCheckSquare size={18} className="text-color-3"></FaCheckSquare>
          Item Adicionado ao carrinho
        </div>
      )}
      <h1 className="block lg:hidden text-color-5 text-[28px]">
        {product.title}
      </h1>
      <div className="block lg:hidden h-[2px] w-[400px] bg-gradient-to-r from-color-1" />
      <div className="w-full max-w-[450px] border-2 p-4 max-h-[450px] flex items-center justify-center rounded-md border-color-5/10">
        <img
          src={product.productImage.image}
          alt={product.productImage.alt}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="max-w-[450px]">
          <h1 className="hidden lg:block text-color-5 text-[28px]">
            {product.title}
          </h1>
          <div className="hidden lg:block h-[2px] w-[400px] bg-gradient-to-r from-color-1" />
          <div className="text-3xl mt-7">
            {formatCurrency(selectedPrice.unitPrice)}
          </div>
          <div className="flex text-base items-center gap-1 text-color-5/75 mt-7 mb-2">
            <TbPigMoney /> Compre mais e economize:
          </div>
          <BundleDropdown
            priceBundle={product.priceBundle}
            selectedOption={selectedOption}
          />
          <div className="text-color-5/75 flex mt-5 text-lg">
            Valor total :{" "}
            {formatCurrency(
              selectedPrice.unitPrice * selectedPrice.unitsNumber
            )}
          </div>

          <div className="mt-14">
            <div
              onClick={handleAddToCart}
              className="bg-color-1 p-2 text-color-3 rounded-xl text-center cursor-pointer font-medium hover:bg-color-2"
            >
              Adicionar ao Carrinho
            </div>
          </div>
          <p className="text-sm mt-7">Calcule o frete</p>
          <input
            type="text"
            placeholder="CEP"
            id="CEP"
            className={`mt-2 border-color-5/20 w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
          />
        </div>
        <Scroll
          to="InfoSection"
          smooth={true}
          duration={800}
          className="flex gap-1 items-center text-color-1"
          href="#InfoSection"
        >
          <IoIosArrowDropdownCircle />
          <div className="font-semibold">Veja Detalhes</div>
        </Scroll>
      </div>
    </div>
  );
}
