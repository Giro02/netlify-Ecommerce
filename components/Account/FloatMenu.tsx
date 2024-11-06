"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { usePathname } from "next/navigation";

type NavItemsProps = {
  children: React.ReactNode;
  active: boolean;
};

const NavItems: React.FC<NavItemsProps> = ({ children, active }) => {
  return (
    <li
      className={` p-4 flex items-center ${
        active
          ? "text-color-1 bg-color-4/40 border-l-4 font-medium border-color-1 cursor-default hover:text-color-1"
          : "cursor-pointer hover:bg-color-4/40 border-l-4 border-l-color-3 hover:border-l-color-4/40"
      }`}
    >
      {children}
    </li>
  );
};

export default function FloatMenu() {
  const [collapse, setCollapsed] = useState(false);
  const pathName = usePathname();
  const [currentPath, setCurrentPath] = useState(pathName);

  const studio = pathName.startsWith("studio");
  if (studio) return null;

  const sanitazedPath: { [key: string]: string } = {
    "/costumer/account": "Minha Conta",
    "/costumer/orders": "Meus Pedidos",
    "/costumer/addresses": "Meus Endereços",
  };

  const handleClick = () => {
    setCollapsed(!collapse);
  };

  useEffect(() => {
    setCurrentPath(pathName);
  }, [pathName]);

  return (
    <div className="mt-2 text-color-5">
      <div className="hidden lg:block mt-3 rounded-lg bg-color-3 py-4 shadow-sm">
        {menu(currentPath)}
      </div>
      <div className="lg:hidden">
        <div
          className={` ${
            collapse ? "rounded-t-lg " : "rounded-lg shadow-md"
          } p-4 flex justify-between items-center cursor-pointer bg-color-3 text-xl text-color-1 font-normal`}
          onClick={handleClick}
        >
          <p className="font-medium">{sanitazedPath[currentPath]}</p>
          {collapse ? <IoIosArrowUp size={22} /> : <IoIosArrowDown size={22} />}
        </div>

        <div
          className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
            collapse ? "max-h-96 shadow-md" : "max-h-0"
          }`}
        >
          <div className="shadow-lg py-2 bg-color-3 rounded-b-lg">
            {menu(currentPath)}
          </div>
        </div>
      </div>
    </div>
  );
}

function menu(currentPath: string) {
  return (
    <ul className="flex flex-col">
      <Link href={"/costumer/account"}>
        <NavItems active={currentPath === "/costumer/account"}>
          Minha conta
        </NavItems>
      </Link>
      <Link href={"/costumer/orders"}>
        <NavItems active={currentPath === "/costumer/orders"}>
          Meus pedidos
        </NavItems>
      </Link>
      <Link href={"/costumer/addresses"}>
        <NavItems active={currentPath === "/costumer/addresses"}>
          Meus endereços
        </NavItems>
      </Link>

      <NavItems active={false}>Informações da conta</NavItems>

      <NavItems active={false}>
        Sair
        <VscSignOut size={18} className="ml-4" />
      </NavItems>
    </ul>
  );
}
