"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiBox } from "react-icons/fi";
import Cart from "./Cart";
import { VscSignOut } from "react-icons/vsc";
import { LiaHomeSolid } from "react-icons/lia";
import { usePathname } from "next/navigation";
import { LuUser } from "react-icons/lu";

type UserArray = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  cpfCnpj: string;
  city: string;
  state: string;
  userId: string;
  __v: number;
};

export default function MobileMenu({ allCategData, userSerialized }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userArray, setUserArray] = useState<UserArray[]>([]);

  const pathName = usePathname();
  const isHome = pathName === "/";

  function toggleMenu() {
    setIsMenuOpen((prevMobileMenu) => !prevMobileMenu);
  }

  useEffect(() => {
    if (userSerialized) {
      try {
        const parsedAddress = JSON.parse(userSerialized);
        setUserArray(parsedAddress);
      } catch (error) {
        console.error("Erro ao desserializar o JSON:", error);
      }
    }
  }, [userSerialized]);

  return (
    <div className="text-color-5">
      <div className="md:hidden">
        <HamburguerPhone toggleMenu={toggleMenu} />
      </div>
      <div className="absolute top-0 overscroll-auto">
        <div
          onClick={toggleMenu}
          className={`${
            isMenuOpen ? "opacity-100" : "opacity-0 invisible"
          } fixed z-30 bg-color-5/60 w-full h-full md:hidden transition-all duration-300`}
        ></div>
        <div
          className={`${
            isMenuOpen ? "w-[85%]" : "w-0"
          } md:hidden z-40 left-0 h-full bg-color-3 fixed overflow-hidden transition-[width] duration-300`}
        >
          <div className="p-4 border-b bg-color-1 border-color-4 w-full">
            <div className="flex font-medium w-full text-2xl justify-between">
              <div className="flex text-color-3 gap-4 items-center">
                {userArray.length == 0 && (
                  <div onClick={() => setIsMenuOpen(false)}>
                    <Link href="/api/auth/signin">
                      <div className="flex items-center gap-4 text-color-3 cursor-pointer">
                        <LuUser size={38} className="text-color-3"></LuUser>

                        <div className="">
                          <p className="text-[12px] text-base">Bem-Vindo!</p>
                          <p className="text-[13px] font-normal mt-[-10px]">
                            Entre na sua conta
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                {userArray.length != 0 && (
                  <Link href={"/costumer/account"}>
                    <div
                      className="flex items-center gap-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LuUser size={38} className="text-color-3"></LuUser>
                      <div>
                        <h1 className="text-xl">{userArray?.name}</h1>
                        <div className="flex items-center gap-1">
                          <p className="text-sm font-light">Minha Conta</p>
                          <IoIosArrowForward size={13} className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>

              <IoMdClose
                className="text-color-3"
                onClick={toggleMenu}
              ></IoMdClose>
            </div>
          </div>
          <div className="p-4 flex flex-col font-medium mt-4">
            <div
              className="flex items-center justify-between "
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href={"/"}>
                <div
                  className={`${
                    isHome ? "text-color-1" : "text-color-5"
                  } flex flex-col items-center`}
                >
                  <LiaHomeSolid size={25}></LiaHomeSolid>
                  <p>Inicio</p>
                </div>
              </Link>
              <Link href={"/costumer/orders"}>
                <div className="flex flex-col items-center">
                  <FiBox className="stroke-[1.5] mt-1" size={24}></FiBox>
                  <p>Meus pedidos</p>
                </div>
              </Link>

              <div className="flex flex-col items-center">
                <Cart />
                <Link href={"shopping-cart"}>
                  <p>Carrinho</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="p-4 border-b border-color-4 w-full">
            <div className="flex font-medium w-full justify-between text-2xl">
              <h2>Categorias</h2>
            </div>
          </div>
          <div className="p-4 gap-8 flex flex-col font-medium mt-4">
            {allCategData &&
              allCategData.map((category) => (
                <DropDownMobile
                  key={category._id}
                  text={category.title}
                  slug={category.slug.current}
                  setIsMenuOpen={setIsMenuOpen}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HamburguerPhone({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <div onClick={toggleMenu} className="flex flex-col gap-1">
      <div className="border border-color-5 w-7 rounded-md"></div>
      <div className="border border-color-5 w-7 rounded-md"></div>
      <div className="border border-color-5 w-7 rounded-md"></div>
    </div>
  );
}

type DropDownMobileProps = {
  text: string;
  slug: string;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DropDownMobile({ text, slug, setIsMenuOpen }: DropDownMobileProps) {
  const hrefi = `/categorias/${slug}`;
  return (
    <div>
      <div className="w-full">
        <Link href={hrefi} onClick={() => setIsMenuOpen(false)}>
          <div className="px-4 hover:text-color-1 flex items-center justify-between">
            {text}
            <IoIosArrowForward></IoIosArrowForward>
          </div>
        </Link>
      </div>
    </div>
  );
}
