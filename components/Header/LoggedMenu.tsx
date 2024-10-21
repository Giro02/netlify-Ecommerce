// components/LoggedMenu.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

type LoggedMenuProps = {
  session: Session;
};

const LoggedMenu: React.FC<LoggedMenuProps> = ({ session }) => {
  var name = session.user?.name;
  name = name?.split(" ")[0];

  const [dropDown, setDropDown] = useState(false);
  const handleChange = () => {
    setDropDown(!dropDown);
  };
  const pathName = usePathname();
  const checkout = pathName.startsWith("/checkout");
  const studio = pathName.startsWith("studio");

  if (checkout || studio) {
    return null;
  }

  return (
    <div className="relative hidden md:block">
      <div
        onMouseEnter={() => {
          setDropDown(true);
        }}
        onMouseLeave={() => {
          setDropDown(false);
        }}
        className={`text-base hover:text-color-1 text-color-5 cursor-pointer flex items-center gap-2 w-[100px]`}
      >
        <h1 className="">Olá, {name}</h1>
        <div className="flex items-center font-medium text-base text-center">
          <IoIosArrowDown />
        </div>
      </div>
      {dropDown && (
        <div
          onMouseEnter={() => {
            setDropDown(true);
          }}
          onMouseLeave={handleChange}
          className="absolute flex flex-col bg-color-3 z-10 p-4 shadow-xl rounded-xl gap-4 w-[150px] ml-[-15px]"
        >
          <Link href={"/costumer/account"}>
            <p className="cursor-pointer hover:text-color-2">Minha conta</p>
          </Link>

          <Link href={"/costumer/orders"}>
            <p className="cursor-pointer hover:text-color-2">Meus pedidos</p>
          </Link>
          <Link href={"/costumer/addresses"}>
            <p className="cursor-pointer hover:text-color-2">Meus endereços</p>
          </Link>

          <p className="cursor-pointer hover:text-color-2">
            <Link href="/api/auth/signout?callbackUrl=/">Sair</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default LoggedMenu;
