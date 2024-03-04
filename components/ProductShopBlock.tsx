import { formatCurrency } from "@/utils/UtilityFunctions";
import { TbPigMoney } from "react-icons/tb";
import BundleDropdown from "./BundleDropdown";
import QiButton from "./QiButton";
import { Link as Scroll } from "react-scroll";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ProductType } from "@/types";
import Link from "next/link";

type ProductShopBlockProps = {
  selectedOption: number;
  product: ProductType;
};

export default function ProductShopBlock({
  selectedOption,
  product,
}: ProductShopBlockProps) {
  return (
    <div className="px-40 flex gap-28 mt-7">
      <div className="w-[500px] h-[500px] flex items-center justify-center border ml-14 rounded-md  border-color-5/10">
        <img
          src={product.productImage.image}
          alt={product.productImage.alt}
          className="flex items-center justify-center object-contain w-full h-[400px]"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-color-5 text-[28px]">{product.title}</h1>
          <div className="h-[2px] w-[400px] bg-gradient-to-r from-color-1" />
          <div className="text-3xl mt-7">
            {formatCurrency(product.priceBundle[selectedOption].unitPrice)}
          </div>
          <div className="flex text-base items-center gap-1 text-color-5/75 mt-7 mb-2">
            <TbPigMoney /> Compre mais e economize:
          </div>
          <BundleDropdown
            priceBundle={product.priceBundle}
            selectedOption={selectedOption}
          />
          <div className="text-color-5/75 flex mt-5 text-lg">
            Valor total :{" "}
            {formatCurrency(
              product.priceBundle[selectedOption].unitPrice *
                product.priceBundle[selectedOption].unitsNumber
            )}
          </div>
          <div className="mt-14">
            <Link
              href={`${product.priceBundle[selectedOption].bundleURL}`}
              target="_blank"
            >
              <QiButton wfull {...QiButton.variants.lightGreen}>
                Comprar
              </QiButton>
            </Link>
          </div>
        </div>
        <Scroll
          to="InfoSection"
          smooth={true}
          duration={800}
          className="flex  gap-1 items-center text-color-1"
          href="#InfoSection"
        >
          <IoIosArrowDropdownCircle />
          <div className="font-semibold">Veja Detalhes</div>
        </Scroll>
      </div>
    </div>
  );
}
