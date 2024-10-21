// components/Account/MyOrders.tsx
"use client";
import React, { useState } from "react";
import { Session } from "next-auth";
import FloatMenu from "./FloatMenu";
import { IoIosWarning } from "react-icons/io";

type Order = {
  _id: string;
  // Adicione outros campos conforme necessário
};

type LoggedMenuProps = {
  session: Session;
  orders: Order[]; // Atualizado para refletir um array de pedidos
};

const MyOrders: React.FC<LoggedMenuProps> = ({ session, orders }) => {
  const [haveOrders, setHaveOrders] = useState(orders.length > 0);

  return (
    <div className="md:container px-4 py-4 flex flex-col lg:flex-row text-color-5 justify-between">
      <FloatMenu />
      <div className="flex flex-col mx-auto px-0 lg:px-[4rem] w-[100%]">
        <h1 className="hidden lg:block text-center font-medium text-2xl">
          Meus pedidos
        </h1>
        <div className="flex gap-4 my-4">
          <div className="px-6 py-4 w-[100%] rounded-lg gap-2 flex flex-col">
            {haveOrders ? (
              <div>Opa, achamos um produto</div>
            ) : (
              <div className="bg-color-6 items-center justify-center rounded-md p-4 flex gap-4 text-base text-color-5">
                <IoIosWarning className="text-2xl" />
                Você ainda não fez nenhum pedido
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
