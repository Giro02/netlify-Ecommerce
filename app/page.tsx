import {
  getProdCarouselHome,
  getCarouselMain,
  getBanners,
  getCategories,
} from "@/sanity/sanity.query";
import Carousel from "../components/Carousel";
import { CarouselArray } from "@/types";

import CarouselMain from "../components/CarouselMain";

import BannersHome from "@/components/BannersHome";

import Benefits from "@/components/Benefits";

export default async function Home() {
  const carouselArray: CarouselArray = await getProdCarouselHome();
  const carouselMain: CarouselArray = await getCarouselMain();
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
        <TitleHome title={"PRODUTOS PARA VOCÊ"}></TitleHome>
        <div>
          <Carousel carousel={carouselArray[1]}></Carousel>
        </div>
        <div>
          <BannersHome BannerName={banner1}></BannersHome>
        </div>
        <TitleHome title={"MELHORES PREÇOS"}></TitleHome>
        <div>
          <Carousel carousel={carouselArray[0]}></Carousel>
        </div>
        <div>
          <BannersHome BannerName={banner2}></BannersHome>
        </div>
      </div>
    </main>
  );
}

function TitleHome({ title }: { title: string }) {
  return (
    <div className="container mt-24 font-normal text-[32px] text-center md:text-start text-color-5 border-b-color-4 border-b-2 ">
      {title}
    </div>
  );
}
