import {
  getProdCarouselHome,
  getCarouselMain,
  getBanners,
  getCategories,
  getCarouselCategory,
} from "@/sanity/sanity.query";
import Carousel from "../components/Carousel";
import { CarouselArray } from "@/types";
import CarouselMain from "../components/CarouselMain";
import BannersHome from "@/components/BannersHome";
import Benefits from "@/components/Benefits";
import BannerBottomHome from "@/components/BannerBottomHome";
import CarouselCategory from "@/components/CarouselCategory";
import { HiShoppingBag } from "react-icons/hi2";
import { AiOutlineLike } from "react-icons/ai";
import { TbPigMoney } from "react-icons/tb";

export default async function Home() {
  const carouselArray: CarouselArray = await getProdCarouselHome();
  const carouselMain: CarouselArray = await getCarouselMain();
  const carouselCategory = await getCarouselCategory();
  const banner1 = await getBanners("Banner1");
  const banner2 = await getBanners("Banner2");

  return (
    <main>
      <div>
        <CarouselMain carousel={carouselMain}></CarouselMain>
      </div>
      <div className="px-2 md:container">
        <div className="mt-2">
          <Benefits></Benefits>
        </div>
        <div>
          <CarouselCategory images={carouselCategory}></CarouselCategory>
        </div>
        <div className="mt-24 flex gap-4 text-color-1">
          <TitleHome
            title={"PRODUTOS PARA VOCÊ"}
            iconType={"shoppingBag"}
          ></TitleHome>
        </div>

        <div>
          <Carousel carousel={carouselArray[1]}></Carousel>
        </div>
        <div>
          <BannersHome BannerName={banner1}></BannersHome>
        </div>
        <div className="mt-12">
          <TitleHome title={"CONECTA+ INDICA"} iconType={"like"}></TitleHome>
        </div>

        <div>
          <Carousel carousel={carouselArray[2]}></Carousel>
        </div>
        <div className="mt-12">
          <TitleHome title={"MELHORES PREÇOS"} iconType={"pig"}></TitleHome>
        </div>

        <div>
          <Carousel carousel={carouselArray[0]}></Carousel>
        </div>
        <BannerBottomHome></BannerBottomHome>
      </div>
    </main>
  );
}

type TitleHomeProps = {
  title: string;
  iconType?: "shoppingBag" | "like" | "pig";
};

function TitleHome({ title, iconType = "shoppingBag" }: TitleHomeProps) {
  const renderIcon = () => {
    switch (iconType) {
      case "like":
        return <AiOutlineLike size={32} className="text-color-1" />;
      case "pig":
        return <TbPigMoney size={32} className="text-color-1" />;
      case "shoppingBag":
      default:
        return <HiShoppingBag size={32} className="text-color-1" />;
    }
  };

  return (
    <div className="md:container">
      <div className=" flex w-full gap-2 items-center py-2 font-medium text-[18px]  md:text-[28px] text-center md:text-start text-color-5 ">
        {renderIcon()}
        {title}
      </div>
      {/* <hr className=" w-full border-none h-[1px] bg-color-5/50"></hr> */}
    </div>
  );
}
