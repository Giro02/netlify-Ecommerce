import React from "react";
import { FaTruckArrowRight } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";
import { FaRegCreditCard } from "react-icons/fa";

export default function Benefits() {
  return (
    // Add Font
    <div className="flex justify-center overflow-hidden">
      <div className="flex flex-row justify-between container">
        <CreateBenefits
          Title="Politica de Entrega"
          Entrega={true}
          Description="* Consulte condições"
          Icon={<FaTruckArrowRight size={32} />}
        ></CreateBenefits>
        <CreateBenefits
          Title="Parcele em até 12X"
          Entrega={false}
          Description="Com o Melhor Preço"
          Icon={<FaRegCreditCard size={32} />}
        ></CreateBenefits>
        <CreateBenefits
          Title="Seu Melhor Encapsulado"
          Entrega={false}
          Description="Com o Menor Preço"
          Icon={<FaMoneyBillWave size={32} />}
        ></CreateBenefits>
        <CreateBenefits
          Title="Site Seguro"
          Entrega={false}
          Description="Suas Informações Estão Protegidas"
          Icon={<BiSolidLock size={32} />}
        ></CreateBenefits>
      </div>
    </div>
  );
}

type ItemProps = {
  Title: string;
  Entrega: boolean;
  Description: string;
  Icon: React.ReactNode;
};

function CreateBenefits({ Title, Description, Icon, Entrega }: ItemProps) {
  return (
    // Add Font
    <div className="hidden lg:flex mt-16">
      <div
        className={`${
          Entrega ? "cursor-pointer" : "cursor-default"
        } w-[300px] py-4 h-[150px] text-center md:text-left md:h-[80px] border border-color-4 px-4 rounded-xl flex flex-col md:flex-row items-center text-color-5 gap-4 mt-8`}
      >
        <div className="text-color-1"> {Icon}</div>
        <div className="w-full">
          <div className="font-bold text-[13px] ">{Title}</div>
          <div className=" text-[11px]">{Description}</div>
        </div>
      </div>
    </div>
  );
}
