import { getCarousel, getCategories } from "@/sanity/sanity.query";
import type { CategoryType } from "@/types";
import { QiLogo, QiLogoName } from "@/components/Svgs";
import Carousel from "../components/Carousel";
import { CarouselType } from "@/types";

export default async function Home() {
  const categories: CategoryType[] = await getCategories();
  const prodsForYou: CarouselType = await getCarousel(0);

  return (
    <main>
      <div>
        <Carousel carousel={prodsForYou}></Carousel>
      </div>
    </main>
  );
}
