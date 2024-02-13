import { getProdCarouselHome } from "@/sanity/sanity.query";
import Carousel from "../components/Carousel";
import { CarouselArray } from "@/types";

export default async function Home() {
  const carouselArray: CarouselArray = await getProdCarouselHome();
  return (
    <main>
      <div>
        <Carousel carousel={carouselArray[0]}></Carousel>
      </div>
    </main>
  );
}
