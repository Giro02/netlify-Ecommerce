"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../public/static/carousel.css";
import { IoIosArrowForward } from "react-icons/io";
import { CarouselType } from "@/types";
import Link from "next/link";

interface CarouselProps {
  carousel: CarouselType;
}

export default function Carousel({ carousel }: CarouselProps) {
  return (
    <div className="flex justify-center w-full mt-6 overflow-hidden">
      <div>
        <Constructor carousel={carousel}></Constructor>
      </div>
    </div>
  );
}

function Constructor({ carousel }: CarouselProps) {
  const [selected, setSelected] = useState(0);
  const [Saiba, setSaiba] = useState<number | null>(null);
  const SlideElements = carousel.products.map((product, index) => (
    <div key={index}>
      <div
        className={`rounded-xl relative p-4 cursor-pointer transition-all hover:shadow-xl w-[200px] h-[400px] md:w-[240px] md:h-[450px] flex items-center justify-center flex-col text-center`}
        onMouseEnter={() => setSaiba(index)}
        onMouseLeave={() => setSaiba(null)}
      >
        <div className="w-full h-[140px] md:h-[160px]">
          <img
            src={product.productImage.image}
            className="w-full h-full object-contain"
            alt={product.productImage.alt}
          />
        </div>
        <div>
          <p className="text-[16px] md:h-8 h-12 text-color-preto mt-4">
            {product.title}
          </p>
        </div>
        <div>
          <p className="text-[13px] h-14 text-color-preto/70">
            {product.description}
          </p>
        </div>
        <div>
          <p className="text-[16px] h-10  text-color-preto font-bold">
            R$ {product.price}
          </p>
        </div>
        <Link className="w-full" href={`/produtos/${product.slug.current}`}>
          <div
            className={`h-10 bg-color-1 ${
              Saiba === index ? "flex" : " flex sm:invisible "
            } items-center justify-center text-color-branco text-[16px] w-full  rounded-lg mt-4 md:mt-8 text-color-3`}
          >
            Saiba Mais
          </div>
        </Link>
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

  const carouselSize = useCallback(
    (emblaApi: any) => {
      emblaApi.scrollSnapList();
    },
    [emblaApi]
  );

  return (
    <div className="relative">
      <div className="flex lg:max-w-[1120px] md:max-w-[750px] sm:max-w-[600px] max-w-[350px]  overflow-hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex justify-start gap-1 py-8">
            {SlideElements}
          </div>
        </div>
      </div>
      <div
        onClick={scrollPrev}
        className={`${
          selected === 0
            ? "text-color-5/20 cursor-default"
            : "text-color-5 cursor-pointer"
        } rounded-full w-11 h-11 flex absolute left-[-15px] top-1/2 rotate-180  -translate-y-1/2  items-center justify-center text-color-branco/90 `}
      >
        <IoIosArrowForward size={25}></IoIosArrowForward>
      </div>
      <div
        onClick={scrollNext}
        className={`${
          selected === carouselSize.length
            ? "text-color-5/20 cursor-default"
            : "text-color-5 cursor-pointer"
        } rounded-full w-11 h-11  absolute right-[-15px] top-1/2 -translate-y-1/2 flex items-center justify-center text-color-branco/90 `}
      >
        <IoIosArrowForward size={25}></IoIosArrowForward>
      </div>
    </div>
  );
}
