import React from "react";
import { FaTruckArrowRight } from "react-icons/fa6";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiSolidLock } from "react-icons/bi";

export default function Benefits() {
  return (
    // Add Font
    <div className="flex justify-center">
      <div className="px-8 grid grid-cols-3 justify-between gap-2 lg:gap-32 xl:gap-40">
        <CreateBenefits
          Title="Politica de Entrega"
          Entrega={true}
          Description="* Consulte condições"
          Icon={<FaTruckArrowRight size={32} />}
        ></CreateBenefits>

        <CreateBenefits
          Title="Seu Melhor Encapsulado"
          Entrega={false}
          Description="Com o Melhor Preço"
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
    <div className="hidden sm:flex container">
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
