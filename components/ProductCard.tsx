"use client";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";

const ProductCard = ({
  title,
  price,
  description,
  imageSrc,
  onDelete,
  unit,
  onAddUnit,
  onRemoveUnit,
}) => {
  function NumbToString(number: number) {
    return number.toFixed(2).toString().replace(".", ",");
  }

  return (
    <div className="w-full items-center h-52 flex  md:p-4 text-color-5 md:gap-6">
      <FaCheckSquare size={26} className=" text-color-1 hidden md:block" />
      <div>
        <img src={imageSrc} alt={title} className="w-20  object-cover" />
      </div>
      <div className="flex-1 md:gap-4">
        <div className="flex justify-between">
          <div className="text-base md:text-lg font-semibold">{title}</div>
          <button onClick={onDelete} className="flex gap-2 font-medium">
            <IoTrashOutline size={22} className="text-color-1" />
            <p className="hidden md:block">Excluir</p>
          </button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="font-bold text-base md:text-lg">
            {" "}
            R$ {NumbToString(price)}
          </div>
          <div className="flex gap-2 md:gap-4 items-center justify-center">
            <div
              onClick={onRemoveUnit}
              className="flex bg-color-4 p-2 rounded-full w-6 h-6 items-center cursor-pointer text-color-5"
            >
              <FiMinus />
            </div>
            <p className="font-bold text-lg">{unit}</p>
            <div
              onClick={onAddUnit}
              className="flex bg-color-4 p-2 rounded-full w-6 h-6 items-center cursor-pointer text-color-5"
            >
              <FaPlus />
            </div>
          </div>
        </div>
        <div className="max-h-[58px] overflow-y-auto mt-4">
          <p className="font-medium text-sm">Descrição:</p>
          <p className="text-xs text-color-5/80">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
