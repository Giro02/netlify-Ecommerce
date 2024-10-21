"use client";
import { Session } from "next-auth";
import React, { useState } from "react";
import FloatMenu from "./FloatMenu";
import AddressesForm from "./AddressesForm";

type LoggedMenuProps = {
  session: Session;
  userId: string;
};

const Adresses: React.FC<LoggedMenuProps> = ({ session, userId }) => {
  return (
    <div className="px-4 md:container py-4 flex flex-col lg:flex-row text-color-5 justify-between">
      <FloatMenu />
      <div className="flex flex-col mx-auto px-0 lg:px-[4rem]  w-[100%]">
        <h1 className="hidden lg:block text-center font-medium text-2xl">
          Endereços de Entrega
        </h1>
        <div className="flex gap-4 my-4">
          <div className="px-6 py-4 bg-color-3 w-[100%] rounded-lg gap-2 flex flex-col ">
            <div className="flex gap-16 font-medium mt-2">
              <AddressesForm userId={userId}></AddressesForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adresses;
