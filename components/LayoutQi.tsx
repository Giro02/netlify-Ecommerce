import { ProductPreviewArray } from "@/types";
import Header from "./Header/Header";
import { getProductsForContext } from "@/sanity/sanity.query";
import { getCategories } from "@/sanity/sanity.query";
import Footer from "./Footer";
import ChatBot from "./ChatBot";
import LoginBtn from "./Header/LoginBtn";
import MyProds from "./Header/MyProds";
import Cart from "./Header/Cart";
import LogoSearch from "./Header/LogoSearch";
import Procure from "./Procure";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allProductsPreview: ProductPreviewArray = await getProductsForContext();
  const allCategData = await getCategories();

  return (
    <>
      <div>
        <div className="flex container h-[100px] flex-row items-center">
          <div className="w-2/3 ml-4">
            <LogoSearch
              allProductsPreview={allProductsPreview}
              allCategData={allCategData}
            ></LogoSearch>
          </div>
          <div className="flex items-center md:gap-8 ml-4 md:ml-8">
            <LoginBtn></LoginBtn>
            <MyProds></MyProds>
            <Cart></Cart>
          </div>
        </div>
        <div className="px-4 mb-4 md:hidden">
          <Procure productsSearch={allProductsPreview} />
        </div>
        <div>
          <Header
            allProductsPreview={allProductsPreview}
            allCategData={allCategData}
          />
        </div>
      </div>

      {children}
      <Footer allCategData={allCategData}></Footer>

      <ChatBot></ChatBot>
    </>
  );
}
