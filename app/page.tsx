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
      <div className="container">
        <div className="mt-2">
          <Benefits></Benefits>
        </div>
        <div>
          <CarouselCategory images={carouselCategory}></CarouselCategory>
        </div>
        <div className="mt-24">
          <TitleHome title={"PRODUTOS PARA VOCÊ"}></TitleHome>
        </div>

        <div>
          <Carousel carousel={carouselArray[1]}></Carousel>
        </div>
        <div>
          <BannersHome BannerName={banner1}></BannersHome>
        </div>
        <div className="mt-24">
          <TitleHome title={"ESSÊNCIA QI INDICA"}></TitleHome>
        </div>

        <div>
          <Carousel carousel={carouselArray[2]}></Carousel>
        </div>
        <TitleHome title={"MELHORES PREÇOS"}></TitleHome>
        <div>
          <Carousel carousel={carouselArray[0]}></Carousel>
        </div>
        <BannerBottomHome></BannerBottomHome>
      </div>
    </main>
  );
}

function TitleHome({ title }: { title: string }) {
  return (
    <div className="container font-medium  text-[32px] text-center md:text-start text-color-5/80 border-b-color-4 border-b-1 ">
      {title}
      <hr className="text-color-4 mt-2"></hr>
    </div>
  );
}
