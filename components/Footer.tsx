"use client";
import React from "react";
import { ConectaMais } from "@/components/Svgs";
import Image from "next/image";
import Link from "next/link";
import MasterLogo from "/public/images/MasterLogo.svg";
import VisaLogo from "/public/images/visa.svg";
import GoogleLogo from "/public/images/GoogleLogo.png";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { CategoryType, ProductPreviewArray } from "@/types";

export default function Footer(allCategData: CategoryType) {
  const pathName = usePathname();
  const studio = pathName.startsWith("/studio");
  const date = new Date();
  const year = date.getFullYear();

  if (studio) {
    return null;
  } else {
    return (
      <div>
        <div className=" bg-color-4/20 text-color-5/90 ">
          <div className="container px-4 py-16 md:p-16">
            <div className="flex flex-col md:flex-row gap-8">
              <Link href={"/"}>
                <ConectaMais></ConectaMais>
              </Link>
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-color-5 text-2xl">Conecta +</h1>
                <h2 className="mt-2 ">Fale Conosco</h2>

                <Link href={"/quem-somos"}>
                  <h2>Sobre a Empresa</h2>
                </Link>
              </div>

              <div className="flex ">
                <div className="flex flex-col gap-2">
                  <h1 className="font-medium text-2xl text-color-5 mb-2">
                    Categorias
                  </h1>
                  {allCategData.allCategData
                    .slice(0, 4)
                    .map((category, index) => (
                      <div key={index}>
                        <Link href={`categorias/${category.slug.current}`}>
                          <div className="hover:text-color-1">
                            {category.title}
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>

                <div className="ml-8 md:ml-16 flex-col mt-8">
                  {allCategData.allCategData.slice(4).map((category, index) => (
                    <div key={index}>
                      <Link href={`categorias/${category.slug.current}`}>
                        <div className="hover:text-color-1 my-2">
                          {category.title}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between mt-16">
              <div className="font-medium">
                <h1 className="text-color-5 text-2xl">Formas de Pagamento</h1>
                <div className="flex gap-4 mt-2">
                  <Image
                    src={MasterLogo}
                    alt="mastercardLogo"
                    width={65}
                    height={65}
                  ></Image>
                  <Image src={VisaLogo} alt="mastercardLogo" width={65}></Image>
                </div>
              </div>
              <div className="font-medium text-color-5 mt-16">
                <h1 className="text-2xl">Segurança</h1>
                <div className="mt-[-30px]">
                  <Image src={GoogleLogo} alt="GoogleLogo" width={125}></Image>
                </div>
              </div>
              <div className="font-medium text-color-5">
                <h1 className=" text-2xl">Redes Sociais</h1>
                <div className="flex gap-4 mt-2">
                  <div className="rounded-full flex items-center justify-center bg-color-1/30 text-color-1 h-[50px] w-[50px]">
                    <FaInstagram size={25}></FaInstagram>
                  </div>
                  <div className="rounded-full flex items-center justify-center bg-color-1/30 text-color-1 h-[50px] w-[50px]">
                    <FaFacebookF size={25}></FaFacebookF>
                  </div>
                  <div className="rounded-full flex items-center justify-center bg-color-1/30 text-color-1 h-[50px] w-[50px]">
                    <FaLinkedin size={25}></FaLinkedin>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="my-4 w-full text-center ">
          © Copyright {year} Conecta+. Todos os direitos reservados
        </h1>
      </div>
    );
  }
}
