import Link from "next/link";
import React from "react";
import { FiBox } from "react-icons/fi";

export default function MyProds() {
  return (
    <div className=" hover:text-color-1 cursor-pointer">
      <Link href={"/meus-pedidos"} className="flex gap-2">
        <FiBox className="stroke-[1.5] mt-1 hidden sm:block" size={24}></FiBox>
        <p className="hidden mt-1.5 sm:block text-[15px] w-24">Meus pedidos</p>
      </Link>
    </div>
  );
}
