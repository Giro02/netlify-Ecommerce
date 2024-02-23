import { ProductPreviewArray } from "@/types";
import Header from "./Header";
import { getProductsForContext } from "@/sanity/sanity.query";
import { ProductContext } from "./LayoutQi";
import { getCategories } from "@/sanity/sanity.query";

export default async function DBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allProductsQuery: ProductPreviewArray = await getProductsForContext();
  const categories = await getCategories();

  return (
    <ProductContext.Provider value={allProductsQuery}>
      <Header Products={categories} />
      {children}
    </ProductContext.Provider>
  );
}
