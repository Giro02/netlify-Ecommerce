import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function Cart() {
  return (
    <div className="md:flex hidden items-end mt-1 hover:text-color-1 cursor-pointer ">
      <HiOutlineShoppingBag
        className="stroke-[1.5]"
        size={24}
      ></HiOutlineShoppingBag>
    </div>
  );
}
