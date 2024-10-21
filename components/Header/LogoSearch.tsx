"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { QiLogoName } from "../Svgs";
import Procure from "../Procure";
import { usePathname } from "next/navigation";
import { AutomaBras } from "../Svgs";
import { ConectaMais } from "../Svgs";
import MobileMenu from "./MobileMenu";

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
      <div className="max-w-[200px] overflow-hidden">
        <Link href="/">
          <ConectaMais className=" text-[3.3rem]" />
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-4 md:gap-12 items-center">
        <div className="md:hidden" onClick={toggleMenu}>
          <MobileMenu
            allCategData={allCategData}
            userSerialized={userSerialized}
          ></MobileMenu>
        </div>

        <div>
          <Link href="/">
            <ConectaMais className=" text-[3rem]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
