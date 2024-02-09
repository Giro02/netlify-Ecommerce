import React, { useCallback, useEffect, useState } from "react";
import { useEmblaCarousel } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../../styles/carousel.css";
import { IoIosArrowForward } from "react-icons/io";
import { getProdForYouCarousel } from "@/sanity/sanity.query";

const App = () => {
  return (
    <div className="flex justify-center w-full overflow-hidden">
      <div className="">
        <Constructor></Constructor>
      </div>
    </div>
  );
};

export default App;

function Constructor() {
  const [selected, setSelected] = useState(0);
  const Products = ProdData.ProdsForYou;
  const [Saiba, setSaiba] = useState(null);
  const SlideElements = Products.map((product, index) => (
    <div key={index}>
      <div
        className={`rounded-xl relative p-4 cursor-pointer transition-all hover:shadow-2xl w-[200px] h-[400px] md:w-[240px] md:h-[450px] flex items-center justify-center flex-col text-center`}
        onMouseEnter={() => setSaiba(index)}
        onMouseLeave={() => setSaiba(null)}
      >
        <div className="w-full h-[140px] md:h-[160px]">
          <img
            src={require(`../../images/Prods/${product.url}`).default}
            className="w-full h-full object-contain"
            alt={product.name}
          />
        </div>
        <div>
          <p className="text-[16px] md:h-8 h-12 text-color-preto mt-4">
            {product.name}
          </p>
        </div>
        <div>
          <p className="text-[13px] h-14 text-color-preto/70">{product.desc}</p>
        </div>
        <div>
          <p className="text-[16px] h-10  text-color-preto font-bold">
            R$ {product.price}
          </p>
        </div>
        <div
          className={`h-10 bg-color-verde w-full ${
            Saiba === index ? "flex" : " flex sm:invisible "
          } items-center justify-center text-color-branco text-[16px]  rounded-lg mt-4 md:mt-8`}
        >
          Saiba Mais
        </div>
      </div>
    </div>
  ));

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  });

  const onSelect = useCallback((emblaApi: any) => {
    setSelected(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (emblaApi) emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  return (
    <div className="relative">
      <div className="flex lg:max-w-[1120px] md:max-w-[750px] sm:max-w-[600px] max-w-[350px] px-8 w-full overflow-hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex justify-start w-full gap-1 py-8 px-8">
            {SlideElements}
          </div>
        </div>
      </div>
      <div
        onClick={scrollPrev}
        className={`${
          selected === 0
            ? "text-color-preto/20 cursor-default"
            : "text-color-preto cursor-pointer"
        } rounded-full w-11 h-11 flex absolute left-[-15px] top-1/2 rotate-180  -translate-y-1/2  items-center justify-center text-color-branco/90 `}
      >
        <IoIosArrowForward size={25}></IoIosArrowForward>
      </div>
      <div
        onClick={scrollNext}
        className={`${
          selected === 4
            ? "text-color-preto/20 cursor-default"
            : "text-color-preto cursor-pointer"
        } rounded-full w-11 h-11  absolute right-[-15px] top-1/2 -translate-y-1/2 flex items-center justify-center text-color-branco/90 `}
      >
        <IoIosArrowForward size={25}></IoIosArrowForward>
      </div>
    </div>
  );
}
