"use client";

import React from "react";
import { Session } from "next-auth";
import FloatMenu from "./FloatMenu";

type LoggedMenuProps = {
  session: Session;
};

const Myaccount: React.FC<LoggedMenuProps> = ({ session }) => {
  return (
    <div className=" px-4 md:container py-4 flex flex-col lg:flex-row text-color-5 justify-between">
      <FloatMenu></FloatMenu>
      <div className="flex flex-col mx-auto px-0 lg:px-[4rem]  w-[100%]">
        <h1 className="hidden lg:block text-center font-medium text-3xl">
          Minha Conta
        </h1>
        <div className="flex gap-4 my-4 flex-col">
          <div className="px-6 py-4 bg-color-3 w-[100%] rounded-lg gap-2 flex flex-col ">
            <p className="font-medium text-lg">Informações de contato</p>
            <p className="text-color-5/80">{session.user?.name}</p>
            <p className="text-color-5/80">{session.user?.email}</p>

            <div className="flex gap-16 font-medium mt-2">
              {/* O editar a conta evia a pessoa para informações da conta a onde tem um form */}
              <div className="cursor-pointer hover:text-color-1">Editar</div>
              {/* Se o o session.user.role for Google User o alterar senha deve ficar desabilitado */}
              <div className="cursor-pointer hover:text-color-1">
                Alterar senha
              </div>
            </div>
          </div>
          <p className="text-2xl font-medium">Meus endereços</p>
          <div className="px-6 py-4 bg-color-3 w-[100%] rounded-lg gap-2 flex flex-col "></div>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
