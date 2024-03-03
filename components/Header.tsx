"use client";
import React, { SetStateAction, useState, Dispatch, useEffect } from "react";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import Logo from "/public/images/LogoQi.png";
import Procure from "./Procure";
import { usePathname } from "next/navigation";
import { CategoryType, ProductPreviewArray } from "@/types";

type SlugObject = { [key: string]: boolean };
type MenuCreatorProps = {
  allCategData: Array<CategoryType>;
  toggleSecondMenu: SlugObject;
  setToggleSecondMenu: React.Dispatch<React.SetStateAction<SlugObject>>;
};

function PrimaryMenu({
  allCategData,
  toggleSecondMenu,
  setToggleSecondMenu,
}: MenuCreatorProps) {
  return (
    <div className="flex flex-col text-color-5 mb-2 mt-8 text-[15px]">
      {allCategData &&
        allCategData.map((category) => (
          <DropDownOptions
            key={category._id}
            text={category.title}
            slug={category.slug.current}
            toggleSecondMenu={toggleSecondMenu}
            setToggleSecondMenu={setToggleSecondMenu}
          />
        ))}
    </div>
  );
}

type HeaderProps = {
  allProductsPreview: ProductPreviewArray;
  allCategData: Array<CategoryType>;
};

export default function Header({
  allProductsPreview,
  allCategData,
}: HeaderProps) {
  const pathName = usePathname();
  const studio = pathName.startsWith("/studio");
  const [Down, setDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toggleSecondMenu, setToggleSecondMenu] = useState({});

  function toggleMenu() {
    setIsMenuOpen((prevMobileMenu) => !prevMobileMenu);
  }

  useEffect(() => {
    const slugs = allCategData.map((name) => {
      const {
        slug: { current },
      } = name;
      return { [current]: false };
    });

    setToggleSecondMenu((prevToggleSecondMenu) => {
      return { ...prevToggleSecondMenu, ...Object.assign({}, ...slugs) };
    });
  }, [allCategData]);

  if (studio) {
    return null;
  } else
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
          } md:hidden z-40 left-0 h-full bg-color-3 fixed overflow-hidden transition-[width] duration-300`}
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
            {/* CONCERTAR O MENU DE MOBILE */}
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
        <div className="flex justify-center ">
          <div className=" container h-[100px] flex justify-between items-center">
            <div className="md:hidden mr-4 overflow-hidden">
              <div onClick={toggleMenu}>
                <HamburguerPhone></HamburguerPhone>
              </div>
            </div>

            <Link href={"/"}>
              <Image src={Logo} className="overflow-hidden" alt="Logo"></Image>
            </Link>

            <Procure productsSearch={allProductsPreview} />
            <div className="md:ml-4 overflow-hidden ">
              <MdOutlineShoppingCart size={38}></MdOutlineShoppingCart>
            </div>
          </div>
        </div>
        {/* MOBILE SEARCH BAR */}
        <div className=" w-full flex items-center justify-center md:hidden mb-4">
          <Procure productsSearch={allProductsPreview} />
        </div>

        {/* GREEN MENU, HIDDES IN MOBILE*/}
        <div className="h-12 bg-color-1 w-full mt-[-10px] items-end justify-center relative hidden md:flex">
          <div className=" flex items-center container justify-between text-white">
            <Hamburguer
              setDown={setDown}
              Down={Down}
              allCategData={allCategData}
              toggleSecondMenu={toggleSecondMenu}
              setToggleSecondMenu={setToggleSecondMenu}
            ></Hamburguer>
            <Link href={"/categorias/queda-capilar"}>
              <Menu text="Queda Capilar"></Menu>
            </Link>
            <Link href={"/categorias/emagrecimento"}>
              <Menu text="Emagrecimento"></Menu>
            </Link>
            <Link href={"/categorias/dormir-bem"}>
              <Menu text="Dormir Bem"></Menu>
            </Link>
            <Link href={"/categorias/saude-sexual"}>
              <Menu text="Saúde Sexual"></Menu>
            </Link>
            <Link href={"/categorias/desempenho-fisico"}>
              <Menu text="Desempenho Físico"></Menu>
            </Link>
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
    <div className="cursor-pointer h-12 flex items-center px-4 hover:bg-color-2 text-color-3 ">
      {text}
    </div>
  );
}

type MenuProps = {
  setDown: Dispatch<SetStateAction<boolean>>;
  Down: boolean;
  allCategData: Array<CategoryType>;
  toggleSecondMenu: SlugObject;
  setToggleSecondMenu: React.Dispatch<React.SetStateAction<SlugObject>>;
};
export function Hamburguer({
  Down,
  setDown,
  allCategData,
  toggleSecondMenu,
  setToggleSecondMenu,
}: MenuProps) {
  function Isdropped(entering: boolean) {
    setDown(entering);
  }
  return (
    <div
      onMouseEnter={() => Isdropped(true)}
      onMouseLeave={() => Isdropped(false)}
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
        }  left-0 top-[42px] bg-color-3 rounded-b-xl absolute w-full z-40 overflow-hidden shadow-xl cursor-default`}
      >
        <div className={` flex flex-col text-center  text-color-5 text-[15px]`}>
          {PrimaryMenu({ allCategData, setToggleSecondMenu, toggleSecondMenu })}
        </div>
      </div>
      <div>
        {/* AQUI VAI SECONDARY MENU */}
        {allCategData.map((category) => (
          <div key={category.slug.current}>
            {toggleSecondMenu[category.slug.current] && (
              <SecondaryMenu
                toggleSecondMenu={toggleSecondMenu}
                setToggleSecondMenu={setToggleSecondMenu}
                text={category.title}
                slug={category.slug.current}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SecondaryMenu({
  toggleSecondMenu,
  setToggleSecondMenu,
  text,
  slug,
}: DropDownProps) {
  const openSecondMenu = () => {
    setToggleSecondMenu((prevState) => {
      return { ...prevState, [slug]: true };
    });
  };

  const closeSecondMenu = () => {
    setToggleSecondMenu((prevState) => {
      return { ...prevState, [slug]: false };
    });
  };
  return (
    <div
      onMouseEnter={openSecondMenu}
      onMouseLeave={closeSecondMenu}
      className="bg-color-3 absolute top-[43px] md:w-[500px] lg:w-[750px] xl:w-[1000px] h-[488px] md:left-[145px] lg:left-[200px] pl-12 cursor-default shadow-md pt-4 "
    >
      Opa entrei usando o botão:{text}
    </div>
  );
}

type DropDownProps = {
  text: string;
  slug: string;
  toggleSecondMenu: SlugObject;
  setToggleSecondMenu: React.Dispatch<React.SetStateAction<SlugObject>>;
};

function DropDownOptions({
  text,
  slug,
  setToggleSecondMenu,
  toggleSecondMenu,
}: DropDownProps) {
  var hrefi = `/categorias/${slug}`;

  const openSecondMenu = () => {
    setToggleSecondMenu((prevState) => {
      return { ...prevState, [slug]: true };
    });
  };

  const closeSecondMenu = () => {
    setToggleSecondMenu((prevState) => {
      return { ...prevState, [slug]: false };
    });
  };

  return (
    <div>
      <div
        onMouseEnter={openSecondMenu}
        onMouseLeave={closeSecondMenu}
        className="w-full h-16"
      >
        <Link href={hrefi}>
          <div className="cursor-pointer px-4 hover:text-color-1 flex items-center justify-between ">
            {text}
            <IoIosArrowForward></IoIosArrowForward>
          </div>
        </Link>
      </div>
    </div>
  );
}

type DropDownMobile = {
  text: string;
  slug: string;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DropDownMobile({ text, slug, setIsMenuOpen }: DropDownMobile) {
  var hrefi = `/categorias/${slug}`;
  return (
    <div>
      <div className="w-full">
        <Link href={hrefi} onClick={() => setIsMenuOpen(false)}>
          <div className="cursor-pointer px-4 hover:text-color-1 flex items-center justify-between ">
            {text}
            <IoIosArrowForward></IoIosArrowForward>
          </div>
        </Link>
      </div>
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
