import { ProductPreviewArray } from "@/types";
import Header from "./Header";
import { getProductsForContext } from "@/sanity/sanity.query";
import { ProductContext } from "./LayoutQi";

export default async function DBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allProductsQuery: ProductPreviewArray = await getProductsForContext();
  return (
    <ProductContext.Provider value={allProductsQuery}>
      <Header />
      {children}
    </ProductContext.Provider>
  );
}
