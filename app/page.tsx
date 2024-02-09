import { getCarousel, getCategories } from "@/sanity/sanity.query";
import Carousel from "../components/Carousel";
import { CarouselType } from "@/types";
import QiButton from "@/components/QiButton";

export default async function Home() {
  const prodsForYou: CarouselType = await getCarousel(0);

  return (
    <main>
      <div className="flex items-center justify-center">
        <QiButton
          {...QiButton.variants.lightGreen}
          leftIcon={QiButton.icons.circle}
          rightIcon={QiButton.icons.circle}
        >
          Aperta aqui pra pegar na minha jeba
        </QiButton>
      </div>

      <Carousel carousel={prodsForYou}></Carousel>
    </main>
  );
}
