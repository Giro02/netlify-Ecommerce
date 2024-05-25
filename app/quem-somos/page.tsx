import Link from "next/link";
import React from "react";

export default function QuemSomos() {
  return (
    <div className="container font-montse">
      <div>
        <ul className="flex items-center justify-start text-sm text-color-5/75 my-5">
          <li>
            <Link href="/"> Início </Link>&nbsp;
          </li>
          <li>{">"}&nbsp;</li>
          <li className="font-semibold  text-color-5">Quem Somos</li>
        </ul>

        <div className="text-color-5 max-w-[750px]">
          <h1 className="text-[40px]">Sobre Nós</h1>
          <p className=" mt-8 ">
            Na confluência entre tradição e inovação, surge a empresa Essência
            Qi, uma empresa comprometida em promover o equilíbrio do corpo,
            mente e espírito. O nome "Essência Qi" reflete a essência da
            vitalidade energética presente em todas as coisas, de acordo com a
            filosofia oriental. Qi, uma palavra chinesa que se refere à energia
            vital ou força vital que permeia o universo, é central na
            compreensão do equilíbrio e da harmonia.
          </p>
          <p className="mt-4">
            Criada no início do ano de 2024 com a missão de proporcionar
            bem-estar e beleza de dentro para fora, a Essência Qi oferece uma
            gama de produtos cuidadosamente formulados para nutrir não apenas a
            pele, mas também a alma.
          </p>
          <p className="mt-4">
            Em um mundo cada vez mais frenético e desconectado, a Essência Qi
            surge como um oásis de tranquilidade, oferecendo não apenas
            produtos, mas uma experiência transformadora que convida a
            reconectar-se consigo mesmo e com o mundo ao seu redor. Porque,
            afinal, a verdadeira beleza emerge quando corpo, mente e espírito
            estão em perfeita harmonia, e é nisso que a Essência Qi acredita e
            se empenha em proporcionar a todos os seus clientes.
          </p>
        </div>
      </div>
    </div>
  );
}
