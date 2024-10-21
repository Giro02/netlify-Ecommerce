"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "@/app/context/CartContext";
import { usePathname } from "next/navigation";

export default function Cart() {
  const { cart } = useCart();
  const pathName = usePathname();
  const checkout = pathName.startsWith("/checkout");
  const studio = pathName.startsWith("studio");
  const [size, setSize] = useState(null);

  useEffect(() => {
    setSize(cart.length);
  }, [cart]);

  if (checkout || studio) {
    return null;
  }

  return (
    <div>
      <Link href="/shopping-cart">
        <div className="flex items-end mt-1 hover:text-color-1 cursor-pointer ">
          <HiOutlineShoppingBag className="stroke-[1.5] relative" size={24} />
          <div className="flex text-color-3 text-xs font-bold items-center justify-center rounded-full w-6 h-5 bg-color-1 absolute ml-[18px] mb-4">
            <div className="mb-[1px] mr-[1px]">{size}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}
