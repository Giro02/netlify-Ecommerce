import { ProductPreviewArray } from "@/types";
import Header from "./Header";
import { getProductsForContext } from "@/sanity/sanity.query";
import { getCategories } from "@/sanity/sanity.query";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allProductsPreview: ProductPreviewArray = await getProductsForContext();
  const allCategData = await getCategories();

  return (
    <>
      <Header
        allProductsPreview={allProductsPreview}
        allCategData={allCategData}
      />
      {children}
      <Footer allCategData={allCategData}></Footer>

      <ChatBot></ChatBot>
    </>
  );
}
