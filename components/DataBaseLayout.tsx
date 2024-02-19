import { SearchProductArray } from "@/types";
import Header from "./Header";
import { getProductsForSearch } from "@/sanity/sanity.query";

export default async function DBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allProductsSearch: SearchProductArray = await getProductsForSearch();
  return (
    <>
      <Header productsSearch={allProductsSearch} />
      {children}
    </>
  );
}
