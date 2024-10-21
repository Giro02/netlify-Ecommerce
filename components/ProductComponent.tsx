import { ProductPreview } from "@/types";
import { formatCurrency } from "@/utils/UtilityFunctions";
import Link from "next/link";
import QiButton from "./QiButton";
//220 219 216

type ProductComponentProps = {
  product: ProductPreview;
};

export default function ProductComponent({ product }: ProductComponentProps) {
  const previousPrice = () => {
    return (
      product.priceBundle[0].unitPrice +
      (product.priceBundle[0].unitPrice * 30) / 100
    );
  };

  return (
    <Link href={`/produtos/${product.slug.current}`}>
      <div className="lg:hover:shadow-lg flex-col rounded-xl flex md:p-7 font-montse text-color-5">
        <div>
          <img
            src={product.productImage.image}
            alt={product.productImage.alt}
            className="w-full h-[250px] object-contain md:object-contain flex items-center justify-center"
          />
        </div>
        <div className=" pb-4 items-center">
          <h4 className="mt-4 text-lg overflow-hidden">{product.title}</h4>
          <div className="flex text-sm text-color-5/70">
            <h4>De &nbsp;</h4>
            <h4 className="line-through"> {formatCurrency(previousPrice())}</h4>
          </div>
          <div className="flex ">
            <h4>por &nbsp;</h4>
            <h4 className=" text-2xl font-semibold">
              {formatCurrency(product.priceBundle[0].unitPrice)}
            </h4>
          </div>

          <h5 className=" md:block text-color-5/50 text-sm overflow-hidden">
            {product.description}
          </h5>
          <div className="justify-center flex mt-6">
            {/* <div className=" bg-color-1 p-2 w-full text-center text-color-3 rounded-lg text-sm">
              Adicionar ao Carrinho
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
}
