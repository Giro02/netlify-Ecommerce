// components/LoggedMenu.tsx
"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Session } from "next-auth";

type LoggedMenuProps = {
  session: Session;
};

const LoggedMenu: React.FC<LoggedMenuProps> = ({ session }) => {
  const name = session.user?.name;
  const [dropDown, setDropDown] = useState(false);
  const [isdow, setIsDown] = useState(false);

  const handleChange = () => {
    setDropDown(!dropDown);
  };

  return (
    <div className="relative group">
      <div
        onMouseEnter={() => {
          setDropDown(true);
        }}
        onMouseLeave={() => {
          setDropDown(false);
        }}
        className={`text-sm hover:text-color-1 text-color-5 cursor-pointer flex items-center gap-2`}
      >
        <h1>Olá, {name}</h1>
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
          className="absolute flex flex-col bg-color-3 z-10 p-4 shadow-xl rounded-xl gap-2"
        >
          <p>Minha conta</p>
          <p>Meus pedidos</p>
          <p>Meus endereços</p>
          <li>
            <Link href="/api/auth/signout?callbackUrl=/">Sair</Link>
          </li>
        </div>
      )}

      {/* <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden group-hover:block">
        <ul className="py-2">
          <li className="px-4 py-2 hover:bg-color-4">
            <Link href="/profile">Minha conta</Link>
          </li>
          <li className="px-4 py-2 hover:bg-color-4">
            <Link href="/api/auth/signout?callbackUrl=/">Sair</Link>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default LoggedMenu;
