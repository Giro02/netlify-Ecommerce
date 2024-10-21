import { ProductPreviewArray } from "@/types";
import ProductComponent from "./ProductComponent";

type RelatedProductsProps = {
  similarProducts: ProductPreviewArray;
};

export default function RelatedProducts({
  similarProducts,
}: RelatedProductsProps) {
  const products = similarProducts.map((product, index) => {
    return <ProductComponent product={product} key={index} />;
  });
  return (
    <div>
      <h4 className="text-color-5 text-2xl my-6">Produtos Relacionados</h4>
      <div className={`grid xl:grid-cols-5 justify-center items-start gap-4`}>
        {products}
      </div>
    </div>
  );
}
