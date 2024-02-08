"use client";

import React, { SetStateAction, useState, Dispatch, useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import Logo from "/public/images/LogoQi.png";

export default function Header() {
  const [Down, setDown] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen((prevMobileMenu) => !prevMobileMenu);
  }

  return (
    // Add Font
    <div>
      <div
        onClick={toggleMenu}
        className={` ${
          isMenuOpen ? " opacity-100 " : "opacity-0 invisible"
        } fixed z-30 bg-color-5/60 w-full h-full  md:hidden transition-all duration-300`}
      ></div>
      <div
        className={`${
          isMenuOpen ? " w-[80%]" : " w-0"
        } md:hidden z-40 left-0 h-full bg-color-branco fixed overflow-hidden transition-[width] duration-300`}
      >
        <div className="p-4 border-b border-color-4 w-full h-16">
          <div className="flex font-medium w-full justify-between text-2xl">
            <p>Explorar</p>
            <p className="cursor-pointer" onClick={toggleMenu}>
              x
            </p>
          </div>
        </div>
        <div className="p-4 gap-8 flex flex-col font-medium mt-4">
          <DropDownOptions text="Beleza"></DropDownOptions>
          <DropDownOptions text="Saúde Feminina"></DropDownOptions>
          <DropDownOptions text="Emagrecimendo"></DropDownOptions>
          <DropDownOptions text="Queda Capilar"></DropDownOptions>
          <DropDownOptions text="Saúde Sexual"></DropDownOptions>
          <DropDownOptions text="Desempenho Físico"></DropDownOptions>
          <DropDownOptions text="Dormir Bem"></DropDownOptions>
        </div>
      </div>
      <div className="flex justify-center ">
        <div className="max-w-[1120px] w-full h-[100px] flex justify-between items-center px-8 overflow-hidden ">
          <div className="md:hidden mr-4">
            <div onClick={toggleMenu}>
              <HamburguerPhone></HamburguerPhone>
            </div>
          </div>

          <Image src={Logo} alt="Logo"></Image>
          <div className=" max-w-[520px] w-full hidden md:flex ">
            <Procure></Procure>
          </div>
          <div className="md:ml-4">
            <MdOutlineShoppingCart size={38}></MdOutlineShoppingCart>
          </div>
        </div>
      </div>
      {/* MOBILE SEARCH BAR */}
      <div className="px-8 w-full flex items center justify-center md:hidden mb-4">
        <Procure></Procure>
      </div>

      {/* GREEN MENU, HIDDES IN MOBILE*/}
      <div className="h-12 bg-color-1 w-full mt-[-10px] items-end justify-center relative hidden md:flex">
        <div className=" flex items-center  w-full max-w-[1120px] justify-between text-white px-8 ">
          <Hamburguer setDown={setDown} Down={Down}></Hamburguer>
          <SideMenu></SideMenu>
          <Menu text="Queda Capilar"></Menu>
          <Menu text="Emagrecimento"></Menu>
          <Menu text="Dormir Bem"></Menu>
          <Menu text="Saúde Sexual"></Menu>
          <Menu text="Desempenho Físico"></Menu>
        </div>
      </div>
    </div>
  );
}

type ItemProps = {
  text: string;
};

export function Menu({ text }: ItemProps) {
  return (
    <div className="cursor-pointer h-12 flex items-center px-4 hover:bg-color-2 text-color-3">
      {text}
    </div>
  );
}

type MenuProps = {
  setDown: Dispatch<SetStateAction<boolean>>;
  Down: boolean;
};
export function Hamburguer({ Down, setDown }: MenuProps) {
  function Isdropped() {
    setDown(!Down);
  }

  return (
    <div
      onMouseEnter={() => Isdropped()}
      onMouseLeave={() => Isdropped()}
      className={`flex items-center gap-2  ${
        Down
          ? "bg-color-3/90  z-30 text-color-1 rounded-t-xl  shadow-xl cursor-pointer"
          : " text-color-3"
      }  px-4 relative translate-y-[2px] h-[42px]  bottom-0 `}
    >
      <div className=" flex flex-col gap-1 translate-y-[-2px]">
        <div
          className={`border ${
            Down ? "border-color-1" : "border-color-3"
          } w-7 rounded-md`}
        ></div>
        <div
          className={`border ${
            Down ? "border-color-1" : "border-color-3"
          } w-7 rounded-md`}
        ></div>
        <div
          className={`border ${
            Down ? "border-color-1" : "border-color-3"
          } w-7 rounded-md`}
        ></div>
      </div>
      <p className="translate-y-[-2px]">Todas as Categorias</p>

      <div
        className={` ${Down ? "DropDown" : " invisible"}
        }  left-0 top-[42px] bg-color-3 rounded-b-xl absolute w-full z-30 overflow-hidden shadow-xl cursor-default`}
      >
        <div
          className={` flex flex-col text-center gap-10 text-color-5 mt-4 mb-2 p-4 text-[15px]`}
        >
          <DropDownOptions text="Beleza"></DropDownOptions>
          <DropDownOptions text="Saúde Feminina"></DropDownOptions>
          <DropDownOptions text="Emagrecimendo"></DropDownOptions>
          <DropDownOptions text="Queda Capilar"></DropDownOptions>
          <DropDownOptions text="Saúde Sexual"></DropDownOptions>
          <DropDownOptions text="Desempenho Físico"></DropDownOptions>
          <DropDownOptions text="Dormir Bem"></DropDownOptions>
        </div>
      </div>
    </div>
  );
}
type DropDownProps = {
  text: string;
};

function DropDownOptions({ text }: DropDownProps) {
  return (
    <div className="cursor-pointer hover:text-color-1 flex items-center justify-between ">
      {text}
      <IoIosArrowForward></IoIosArrowForward>
    </div>
  );
}
export function HamburguerPhone() {
  return (
    <div className="flex flex-col gap-1 cursor-pointer">
      <div className="border border-color-5 w-7 rounded-md"></div>
      <div className="border border-color-5 w-7 rounded-md"></div>
      <div className="border border-color-5 w-7 rounded-md"></div>
    </div>
  );
}

export function Procure() {
  return (
    <div className="flex w-full ">
      <input
        className="h-[40px] border border-color-4 w-full px-4 rounded-l-md "
        placeholder="Pesquisar na loja toda..."
      ></input>
      <button className="w-[48px] h-[40px] bg-color-1 rounded-r-md"></button>
    </div>
  );
}

export function SideMenu() {
  return (
    <div className="absolute flex bg-color-1 h-24 top-12 w-full max-w-[850px] ml-[205px]">
      <div></div>
    </div>
  );
}
