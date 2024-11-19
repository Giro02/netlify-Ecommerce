"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { QiLogoName } from "../Svgs";
import Procure from "../Procure";
import { usePathname } from "next/navigation";
import { AutomaBras } from "../Svgs";
import { ConectaMais } from "../Svgs";
import MobileMenu from "./MobileMenu";
import Image from "next/image";
import Cart from "./Cart";

export default function LogoSearch({
  allProductsPreview,
  allCategData,
  userSerialized,
}) {
  const pathName = usePathname();
  const studio = pathName.startsWith("/studio");
  const checkout = pathName.startsWith("/checkout");
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
  }

  if (checkout) {
    return (
      <div className=" overflow-hidden">
        <Link href="/">
          <ConectaMais className=" md:w-[3rem] md:h-[3rem] w-[16rem] h-[5rem]" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-between w-full items-center">
      <div className="md:hidden" onClick={toggleMenu}>
        <MobileMenu
          allCategData={allCategData}
          userSerialized={userSerialized}
        ></MobileMenu>
      </div>
      <Link href="/">
        <ConectaMais className="md:w-[3rem] md:h-[3rem] w-[16rem] h-[5rem]" />
      </Link>
      <Cart></Cart>
    </div>
  );
}
