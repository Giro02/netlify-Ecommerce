import { ProductPreviewArray } from "@/types";
import Header from "./Header";
import { getProductsForContext } from "@/sanity/sanity.query";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allProductsPreview: ProductPreviewArray = await getProductsForContext();

  return (
    <>
      <Header allProductsPreview={allProductsPreview} />
      {children}
    </>
  );
}
