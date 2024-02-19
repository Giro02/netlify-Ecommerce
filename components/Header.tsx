"use client";
import React, { SetStateAction, useState, Dispatch, useEffect } from "react";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import Logo from "/public/images/LogoQi.png";
import { getCategories } from "@/sanity/sanity.query";
import { useRouter } from "next/router";

async function Search() {
  const getCategory = await getCategories();
  return getCategory;
}

type SlugObject = { [key: string]: boolean };
type MenuCreatorProps = {
  categData: Category[];
  toggleSecondMenu: SlugObject[];
  setToggleSecondMenu: React.Dispatch<React.SetStateAction<SlugObject[]>>;
};

function MenuCreator({
  categData,
  toggleSecondMenu,
  setToggleSecondMenu,
}: MenuCreatorProps) {
  return (
    <div className="flex flex-col gap-10 text-color-5 mt-4 mb-2 text-[15px]">
      {categData &&
        categData.map((category) => (
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
interface Category {
  _id: string;
  title: string;
  [slug: string]: any;
}
export default function Header() {
  const [Down, setDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  var [categData, setCategData] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await Search();
      setCategData(data);
    };
    fetchData();
  }, []);

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
          {""}
        </div>
      </div>
      <div className="flex justify-center ">
        <div className=" container h-[100px] flex justify-between items-center  overflow-hidden ">
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
      <div className=" w-full flex items center justify-center md:hidden mb-4">
        <Procure></Procure>
      </div>

      {/* GREEN MENU, HIDDES IN MOBILE*/}
      <div className="h-12 bg-color-1 w-full mt-[-10px] items-end justify-center relative hidden md:flex">
        <div className=" flex items-center container justify-between text-white ">
          <Hamburguer
            setDown={setDown}
            Down={Down}
            categData={categData}
          ></Hamburguer>
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
    <div className="cursor-pointer h-12 flex items-center px-4 hover:bg-color-2 text-color-3 ">
      {text}
    </div>
  );
}

type MenuProps = {
  setDown: Dispatch<SetStateAction<boolean>>;
  Down: boolean;
  categData: Category[];
};
export function Hamburguer({ Down, setDown, categData }: MenuProps) {
  function Isdropped() {
    setDown(!Down);
  }

  interface Slug {
    current: string;
  }

  const slugs: { [key: string]: boolean }[] = [];
  categData.forEach((name, j) => {
    const {
      slug: { current },
    } = name;
    slugs.push({ [current]: false });
  });

  const [toggleSecondMenu, setToggleSecondMenu] = useState(slugs);
  // FAZER AQU A FUNÇÂO DO MENUISECUNDARIO
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
        }  left-0 top-[42px] bg-color-3 rounded-b-xl absolute w-full z-40 overflow-hidden shadow-xl cursor-default`}
      >
        <div
          className={` flex flex-col text-center gap-10 text-color-5 mt-4 mb-2 p-4 text-[15px]`}
        >
          {MenuCreator({ categData, toggleSecondMenu, setToggleSecondMenu })}
        </div>
      </div>
      <div className="container z-30 absolute left-[200px]">
        {/* AQUI VAO SECONDARY MENU */}
      </div>
    </div>
  );
}
type DropDownProps = {
  text: string;
  slug: string;
  toggleSecondMenu: SlugObject[];
  setToggleSecondMenu: React.Dispatch<React.SetStateAction<SlugObject[]>>;
};

function DropDownOptions({
  text,
  slug,
  setToggleSecondMenu,
  toggleSecondMenu,
}: DropDownProps) {
  var hrefi = `/categorias/${slug}`;
  const openSecondMenu = () => {
    setToggleSecondMenu((prevState) =>
      prevState.map((element) => ({
        ...element,
        [slug]: true,
      }))
    );
    console.log(`SeteiTrue: ${slug}`);
  };
  const closeSecondMenu = () => {
    setToggleSecondMenu((prevState) =>
      prevState.map((element) => ({
        ...element,
        [slug]: false,
      }))
    );
    console.log(`SeteiFalse: ${slug}`);
  };

  return (
    <div onMouseEnter={openSecondMenu} onMouseLeave={closeSecondMenu}>
      <Link href={hrefi}>
        <div className="cursor-pointer hover:text-color-1 flex items-center justify-between ">
          {text}
          <IoIosArrowForward></IoIosArrowForward>
        </div>
      </Link>
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
