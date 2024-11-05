"use client";
import { ProductPreview } from "@/types";
import { formatCurrency } from "@/utils/UtilityFunctions";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

type ProductComponentProps = {
  product: ProductPreview;
};

export default function ProductComponent({ product }: ProductComponentProps) {
  const previousPrice = () =>
    product.priceBundle[0].unitPrice +
    (product.priceBundle[0].unitPrice * 30) / 100;

  const [Saiba, setSaiba] = useState<number | null>(null);

  const sharedContainerClasses =
    "lg:hover:shadow-lg flex-col  h-[578px] w-[325px] rounded-xl flex justify-center items-center p-0 md:p-6 font-montse text-color-5 relative";

  const sharedImageClasses =
    "w-full h-[250px] object-contain flex items-center justify-center";

  const productLayout = () => (
    <Link
      className="flex items-center justify-center"
      href={`/produtos/${product.slug.current}`}
    >
      <div
        className={sharedContainerClasses}
        onMouseEnter={() => setSaiba(1)}
        onMouseLeave={() => setSaiba(null)}
      >
        <div>
          <img
            src={product.productImage.image}
            alt={product.productImage.alt}
            className={sharedImageClasses}
          />
        </div>
        <div className="pb-4 items-center">
          <h4 className="mt-4 text-lg overflow-hidden">{product.title}</h4>
          <div className="flex text-sm text-color-5/70">
            <h4>De &nbsp;</h4>
            <h4 className="line-through">{formatCurrency(previousPrice())}</h4>
          </div>
          <div className="flex">
            <h4>por &nbsp;</h4>
            <h4 className="text-2xl font-semibold">
              {formatCurrency(product.priceBundle[0].unitPrice)}
            </h4>
          </div>
          <h5 className="md:block text-color-5/50 text-sm overflow-hidden">
            {product.description}
          </h5>
          <div
            className={`h-10 bg-color-1 ${
              Saiba === 1 ? "flex" : "flex sm:invisible"
            } items-center justify-center text-color-branco text-[16px] w-full py-4 rounded-lg mt-6 text-color-3`}
          >
            Ver detalhes
          </div>
        </div>
      </div>
    </Link>
  );

  const produtOutOfSotck = () => (
    <Link
      className="flex items-center justify-center"
      href={`/produtos/${product.slug.current}`}
    >
      <div
        className={sharedContainerClasses}
        onMouseEnter={() => setSaiba(1)}
        onMouseLeave={() => setSaiba(null)}
      >
        <div>
          <Image
            src={product.productImage.image}
            alt={product.productImage.alt}
            className={sharedImageClasses}
            width={250}
            height={250}
            sizes="(max-width: 250px) 100vw, 250px"
            priority
          />
        </div>
        <div className="pb-4 items-center">
          <h4 className="mt-4 text-lg overflow-hidden">{product.title}</h4>

          <div className="flex">
            <h4 className="text-lg text-color-7 font-semibold">
              Sob encomenda
            </h4>
          </div>
          <div className=" text-color-5/50 text-sm overflow-hidden">
            <h4>Verifique a disponibilidade conosco</h4>
          </div>
          {/* <h5 className="md:block text-color-5/50 text-sm overflow-hidden">
            {product.description}
          </h5> */}
          <div
            className={`h-10 bg-color-1 ${
              Saiba === 1 ? "flex" : "flex sm:invisible"
            } items-center justify-center text-color-branco text-[16px] mt-6 w-full py-4 rounded-lg  text-color-3 `}
          >
            Ver detalhes
          </div>
        </div>
      </div>
    </Link>
  );

  const outOfStock = () =>
    product.priceBundle[0].unitPrice === 0
      ? produtOutOfSotck()
      : productLayout();

  return outOfStock();
}
