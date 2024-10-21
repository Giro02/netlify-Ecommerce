import { ProductPreviewArray } from "@/types";
import { CartProvider, useCart } from "@/app/context/CartContext";
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
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allProductsPreview: ProductPreviewArray = await getProductsForContext();
  const allCategData = await getCategories();
  const session = await getServerSession(options);
  const userSerialized = JSON.stringify(session?.user);

  return (
    <CartProvider>
      <div className="text-color-5 ">
        <div className="flex w-full px-4 md:container h-[100px] items-center">
          <div>
            <LogoSearch
              allProductsPreview={allProductsPreview}
              allCategData={allCategData}
              userSerialized={userSerialized}
            />
          </div>
          <div className="px-10 hidden lg:block w-full">
            <Procure productsSearch={allProductsPreview} />
          </div>
          <div className="flex px-4 items-center md:gap-8 ">
            <LoginBtn />
            <MyProds />
            <div className="hidden md:block">
              <Cart></Cart>
            </div>
          </div>
        </div>
        <div className="mb-4 lg:hidden px-4">
          <Procure productsSearch={allProductsPreview} />
        </div>
        <Header
          allProductsPreview={allProductsPreview}
          allCategData={allCategData}
        />
      </div>
      {children}
      <Footer allCategData={allCategData} />
      <ChatBot />
    </CartProvider>
  );
}
