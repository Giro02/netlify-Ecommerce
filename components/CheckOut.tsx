"use client";

import { useCart } from "@/app/context/CartContext";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import ProductCard from "./ProductCard";
import AddressesForm from "./Account/AddressesForm";
import { IoMdClose } from "react-icons/io";

type UserAddress = {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  cpfCnpj: string;
  city: string;
  state: string;
  userId: string;
  __v: number;
};

interface AddressesShowProps {
  userAddress: string;
  userId: string;
}

export default function CheckOut({ userAddress, userId }: AddressesShowProps) {
  const [render, setRender] = useState(true);
  const { cart, removeItem, updateItem } = useCart();
  const [userAddressArray, setUserAddressArray] = useState<UserAddress[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      redirect("/shopping-cart");
    } else {
      setRender(true);
    }
  }, [cart]);

  useEffect(() => {
    if (userAddress) {
      try {
        const parsedAddress = JSON.parse(userAddress);
        setUserAddressArray(parsedAddress);
      } catch (error) {
        console.error("Erro ao desserializar o JSON:", error);
      }
    }
  }, [userAddress]);

  const [frete] = React.useState(24);
  const valor = cart.reduce((sum, item) => sum + item.total, 0);
  const total = valor + frete;

  const handleDelete = (index: number) => {
    removeItem(index);
  };

  const handleAddUnit = (index: number) => {
    const updatedCart = [...cart];
    updatedCart[index].unitsNumber += 1;
    updatedCart[index].total =
      updatedCart[index].unitsNumber * updatedCart[index].unitPrice;
    updateItem(index, updatedCart[index]);
  };

  const handleRemoveUnit = (index: number) => {
    const updatedCart = [...cart];
    if (updatedCart[index].unitsNumber > 1) {
      updatedCart[index].unitsNumber -= 1;
      updatedCart[index].total =
        updatedCart[index].unitsNumber * updatedCart[index].unitPrice;
      updateItem(index, updatedCart[index]);
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handlePopupClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  if (!render) {
    return null;
  }

  return (
    <div className="bg-color-4/40">
      <div className="sm:container flex flex-col xl:flex-row justify-center py-6 xl:px-40 text-color-5 lg:gap-6">
        <div className="flex flex-col w-full gap-3">
          <div className="py-4 px-6 bg-color-3 rounded-t-lg">
            <h1 className="text-2xl font-medium">Endereços de entrega</h1>
            {userAddressArray.length === 0 && (
              <div
                className="cursor-pointer mt-4 text-color-1 text-lg flex items-center gap-2"
                onClick={() => setIsPopupOpen(true)}
              >
                <FaPlus />
                Adicionar Novo Endereço
              </div>
            )}
            {userAddressArray.length > 0 && (
              <div className="text-color-5 mt-4 flex items-center justify-between">
                <div>
                  <div className="flex gap-4">
                    <p className="font-medium">
                      {userAddressArray[userAddressArray.length - 1].firstName}
                      &nbsp;
                      {userAddressArray[userAddressArray.length - 1].lastName}
                    </p>
                    <p>
                      {
                        userAddressArray[userAddressArray.length - 1]
                          .phoneNumber
                      }
                    </p>
                  </div>
                  <div className="flex">
                    <p>
                      {userAddressArray[userAddressArray.length - 1].address},
                      &nbsp;
                      {userAddressArray[userAddressArray.length - 1].number};
                    </p>
                    <p>
                      &nbsp;
                      {userAddressArray[userAddressArray.length - 1].complement}
                      ;
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <p>
                      {
                        userAddressArray[userAddressArray.length - 1]
                          .neighborhood
                      }
                      , {userAddressArray[userAddressArray.length - 1].city} -{" "}
                      {userAddressArray[userAddressArray.length - 1].state},
                    </p>
                    <p>
                      {userAddressArray[userAddressArray.length - 1].zipCode}
                    </p>
                  </div>
                </div>

                <div className="text-color-1 text-lg cursor-pointer">Mudar</div>
              </div>
            )}
          </div>
          <div className="py-4 px-6 bg-color-3">
            <h2 className="text-2xl font-medium">Métodos de pagamento</h2>
          </div>
          <div className="py-4 px-6 bg-color-3">
            {cart.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                price={product.unitPrice}
                imageSrc={product.image}
                onDelete={() => handleDelete(index)}
                unit={product.unitsNumber}
                onAddUnit={() => handleAddUnit(index)}
                onRemoveUnit={() => handleRemoveUnit(index)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col max-w-full xl:max-w-[350px] w-[350px] gap-3">
          <div className="py-4 px-6 flex flex-col bg-color-3 w-full rounded-t-lg gap-6">
            <h1 className="font-medium text-2xl">Resumo</h1>
            {cart.length > 0 && (
              <div className="flex gap-4 flex-col">
                <div className="flex justify-between gap-6">
                  <h2 className="font-normal">Subtotal</h2>
                  <h3 className="font-medium">
                    R$ {valor.toFixed(2).replace(".", ",")}
                  </h3>
                </div>
                <div className="flex justify-between">
                  <h4>Frete</h4>
                  <h5 className="font-medium">
                    R$ {frete.toFixed(2).replace(".", ",")}
                  </h5>
                </div>
                <div className="flex justify-between font-bold text-xl">
                  <h6>Total</h6>
                  <h6>R$ {total.toFixed(2).replace(".", ",")}</h6>
                </div>
                <div className="text-sm text-color-5/50 text-end"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Janela Pop-Up */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-color-5 bg-opacity-50 backdrop-blur-sm"
          onClick={handlePopupClose}
        >
          <div
            className="bg-color-3  rounded-lg relative max-w-[850px] max-h-[800px] flex flex-col overflow-auto text-color-5 py-4 sm:py-0"
            onClick={handlePopupClick}
          >
            <div className="flex items-center justify-between pt-10 sm:pt-8 mx-8">
              <h2 className="font-semibold mb-4 text-2xl">Novo Endereço</h2>
              <div onClick={handlePopupClose} className="cursor-pointer">
                <IoMdClose
                  size={36}
                  className="cursor-pointer text-color-5/40"
                ></IoMdClose>
              </div>
            </div>
            <hr className="border-none h-1 bg-color-1"></hr>
            <AddressesForm userId={userId} />
          </div>
        </div>
      )}
    </div>
  );
}
