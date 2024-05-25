"use client";
import React, { useEffect, useState } from "react";
import { HamburguerPhone } from "./Header";
import Link from "next/link";
import { QiLogoName } from "../Svgs";
import Procure from "../Procure";
import { usePathname } from "next/navigation";

export default function LogoSearch({ allProductsPreview, allCategData }) {
  const pathName = usePathname();
  const studio = pathName.startsWith("/studio");
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

  return (
    <div>
      <div className="flex gap-4 md:gap-12 items-center">
        <div className="md:hidden ml-[-30px]" onClick={toggleMenu}>
          <HamburguerPhone />
        </div>

        <Link href="/">
          <QiLogoName className=" text-[2.3rem]" />
        </Link>

        <div className="hidden md:block w-full">
          <Procure productsSearch={allProductsPreview} />
        </div>
      </div>
    </div>
  );
}
