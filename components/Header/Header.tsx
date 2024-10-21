"use client";
import React, { SetStateAction, useState, Dispatch, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
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
  const checkout = pathName.startsWith("/checkout");
  const [Down, setDown] = useState(false);
  const [toggleSecondMenu, setToggleSecondMenu] = useState({});

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

  if (studio || checkout) {
    return null;
  } else
    return (
      // Add Font
      <div>
        {/* GREEN MENU, HIDDES IN MOBILE*/}
        <div className="h-12 bg-color-1 w-full  items-end justify-center relative hidden md:flex">
          <div className=" flex items-center container justify-between text-white">
            <Hamburguer
              setDown={setDown}
              Down={Down}
              allCategData={allCategData}
              toggleSecondMenu={toggleSecondMenu}
              setToggleSecondMenu={setToggleSecondMenu}
            ></Hamburguer>
            <Link href={"/categorias/interruptores"}>
              <Menu text="Interruptores"></Menu>
            </Link>
            <Link href={"/categorias/sensores"}>
              <Menu text="Sensores"></Menu>
            </Link>
            <Link href={"/categorias/gateways"}>
              <Menu text="Gateways"></Menu>
            </Link>
            <Link href={"/categorias/r-fiders"}>
              <Menu text="R-fiders"></Menu>
            </Link>
            <Link href={"/categorias/saude-sexual"} className="bg-color-2">
              <Menu text="Automação Industrial"></Menu>
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
    <div></div>
    // <div
    //   onMouseEnter={openSecondMenu}
    //   onMouseLeave={closeSecondMenu}
    //   className="bg-color-3 absolute top-[43px] md:w-[500px] lg:w-[750px] xl:w-[1000px] h-[488px] md:left-[145px] lg:left-[200px] pl-12 cursor-default shadow-md pt-4 "
    // >
    //   Opa entrei usando o botão:{text}
    // </div>
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
