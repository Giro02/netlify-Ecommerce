import { ProductPreview } from "@/types";
import { formatCurrency } from "@/utils/UtilityFunctions";
import Link from "next/link";
import QiButton from "./QiButton";

type ProductComponentProps = {
  product: ProductPreview;
};

export default function ProductComponent({ product }: ProductComponentProps) {
  return (
    <Link href={`/produtos/${product.slug.current}`}>
      <div className="flex-col border border-color-5/0 hover:border-color-5/15 hover:shadow-xl rounded-xl flex  p-7 font-montse text-color-5">
        <img
          src={product.productImage.image}
          alt={product.productImage.alt}
          className="w-full h-[250px] object-contain flex items-center justify-center"
        />
        <h4 className="mt-4 flex items-center justify-center text-lg h-14 overflow-hidden">
          {product.title}
        </h4>
        <h4 className="my-6 text-2xl font-semibold">
          {formatCurrency(product.priceBundle[0].unitPrice)}
        </h4>
        <h5 className="text-color-5/50 text-sm h-10 overflow-hidden">
          {product.description}
        </h5>
        <div className="justify-center flex mt-6">
          <QiButton {...QiButton.variants.lightGreen} wfull>
            Saiba Mais
          </QiButton>
        </div>
      </div>
    </Link>
  );
}
