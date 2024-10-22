"use client";
import React from "react";
import ProductCard from "./ProductCard";
import { IoIosWarning } from "react-icons/io";
import { FaTruckArrowRight } from "react-icons/fa6";
import { BiSolidLock } from "react-icons/bi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaCheckSquare } from "react-icons/fa";
import Image from "next/image";
import MasterLogo from "/public/images/MasterLogo.svg";
import VisaLogo from "/public/images/visa.svg";

import Pix from "/public/images/Pix.svg";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

export default function ShoppingCart() {
  const { cart, removeItem, updateItem } = useCart();
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
  console.log(cart);

  return (
    <div className="bg-color-4/40">
      <div className="md:container px-4 md:px-0 flex flex-col xl:flex-row justify-center py-6 xl:px-40 text-color-5 gap-6">
        <div className="flex flex-col w-full gap-3">
          <div className="py-4 px-6 bg-color-3 rounded-t-lg">
            <h1 className="text-2xl font-medium">
              Carrinho de Compras ({cart.length})
            </h1>
            <div className="flex gap-2 items-center mt-4">
              <FaCheckSquare size={26} className="text-color-1"></FaCheckSquare>
              <h2>Verifique todos os seus itens</h2>
            </div>
          </div>
          <div className="flex gap-8 flex-col bg-color-3 py-4 rounded-b-lg ">
            {cart.length === 0 && (
              <div className="bg-color-6 items-center justify-center rounded-md md:p-4 p-2 flex gap-4 text-base text-color-5">
                <IoIosWarning className="text-2xl w-12" />
                <p className="font-medium md:font-normal">
                  Você não possui nenhum item no seu carrinho
                </p>
              </div>
            )}
            {cart.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                price={product.unitPrice}
                description={product.description}
                imageSrc={product.image}
                onDelete={() => handleDelete(index)}
                unit={product.unitsNumber}
                onAddUnit={() => handleAddUnit(index)}
                onRemoveUnit={() => handleRemoveUnit(index)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col max-w-full xl:max-w-[350px] gap-3">
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
                <div className="text-sm text-color-5/50 text-end">
                  O valor do frete final está calculado na próxima página
                </div>
              </div>
            )}
            {cart.length === 0 && (
              <div className="flex gap-4 flex-col">
                <div className="flex justify-between">
                  <h2 className="font-normal">Subtotal</h2>
                  <h3 className="font-medium">R$ 0,00</h3>
                </div>
                <div className="flex justify-between">
                  <h4>Frete</h4>
                  <h5 className="font-medium">R$ 0,00</h5>
                </div>
                <div className="flex justify-between font-bold text-xl">
                  <h6>Total</h6>
                  <h6>R$ 0,00</h6>
                </div>
              </div>
            )}
            {cart.length > 0 ? (
              <Link href={"/checkout"}>
                <button className="rounded-full w-full p-2 bg-color-1 text-color-3 font-medium">
                  Continuar ({cart.length})
                </button>
              </Link>
            ) : (
              <button
                disabled
                className="rounded-full w-full p-2 bg-color-1 text-color-3 font-medium"
              >
                Continuar ({cart.length})
              </button>
            )}
          </div>
          <div className="py-4 px-6 flex flex-col bg-color-3 w-full rounded-b-lg">
            <div className="flex gap-4 text-color-5">
              <FaTruckArrowRight size={28} />
              <h1 className="font-medium text-lg">Método de Entrega</h1>
            </div>
            <p className="text-sm text-color-5/50 mt-2">
              Garantimos o Reembolso se os itens chegarem danificados, se o
              pacote for perdido ou se não for entregue em 50 dias
            </p>
            <div className="flex gap-4 text-color-5 mt-8">
              <BiSolidLock size={28} />
              <h1 className="font-medium text-lg">Segurança e privacidade</h1>
            </div>
            <p className="text-sm text-color-5/50 mt-2">
              Nós protegemos sua privacidade e mantemos suas informações
              pessoais seguras.
            </p>
            <div className="flex gap-4 text-color-5 mt-8">
              <AiFillSafetyCertificate size={28} />
              <h1 className="font-medium text-lg">Pagamentos seguros</h1>
            </div>
            <div className="flex gap-4 mt-2">
              <Image src={MasterLogo} alt="MastercardLogo" width={45}></Image>
              <Image src={VisaLogo} alt="VisaLogo" width={45}></Image>
              <Image src={Pix} alt="PixLogo" width={65}></Image>
            </div>
            <p className="text-sm text-color-5/50 mt-2">
              Com parceiros de pagamento populares fica tudo mais fácil, seus
              dados estão seguros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
