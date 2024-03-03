"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "../public/static/carousel.css";
import { IoIosArrowForward } from "react-icons/io";
import { CarouselType } from "@/types";
import Link from "next/link";

interface CarouselProps {
  carousel: CarouselType;
}

export default function Carousel({ carousel }: CarouselProps) {
  return (
    <div className="mt-6">
      <div>
        <Constructor carousel={carousel}></Constructor>
      </div>
    </div>
  );
}

function Constructor({ carousel }: CarouselProps) {
  const [selected, setSelected] = useState(0);
  const [Saiba, setSaiba] = useState<number | null>(null);

  const slideElements = carousel.products.map((product, index) => (
    <div key={index}>
      <Link className="w-full" href={`/produtos/${product.slug.current}`}>
        <div
          className={`rounded-xl relative p-4 cursor-pointer transition-all hover:shadow-xl w-[200px] h-[400px] md:w-[240px] md:h-[425px] flex items-center justify-center flex-col text-center`}
          onMouseEnter={() => setSaiba(index)}
          onMouseLeave={() => setSaiba(null)}
        >
          <div className="w-full h-[140px] md:h-[140px]">
            <img
              src={product.productImage.image}
              className="w-full h-full object-contain"
              alt={product.productImage.alt}
            />
          </div>
          <div>
            <p className="text-[16px] md:h-8 h-12 text-color-5 mt-4">
              {product.title}
            </p>
          </div>
          <div>
            <p className="text-[13px] mt-2 h-16 text-color-5/70">
              {product.description}
            </p>
          </div>
          <div>
            <div className="text-[16px] h-10 items-center text-center flex text-color-5 font-bold">
              <p>R$ {product.price}</p>
            </div>
          </div>

          <div
            className={`h-10 bg-color-1 ${
              Saiba === index ? "flex" : " flex sm:invisible "
            } items-center justify-center text-color-branco text-[16px] w-full  rounded-lg mt-4 text-color-3`}
          >
            Saiba Mais
          </div>
        </div>
      </Link>
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

  const canScrollNext = useCallback(() => {
    if (emblaApi) return emblaApi.canScrollNext();
  }, [emblaApi]);

  const carouselSize = useCallback(() => {
    if (emblaApi) return emblaApi.scrollSnapList().length;
  }, [emblaApi]);

  return (
    <div className="container py-12">
      <div className="flex relative px-[15px]">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container  flex justify-start gap-1 py-8">
            {slideElements}
          </div>
        </div>

        <div
          onClick={scrollPrev}
          className={`${
            selected === 0
              ? "text-color-5/20 cursor-default"
              : "text-color-5 cursor-pointer"
          } rounded-full w-11 h-11 flex absolute left-[-35px] top-1/2 rotate-180 -translate-y-1/2  items-center justify-center text-color-branco/90 `}
        >
          <IoIosArrowForward size={35}></IoIosArrowForward>
        </div>
        <div
          onClick={scrollNext}
          className={`${
            canScrollNext() == false
              ? "text-color-5/20 cursor-default"
              : "text-color-5 cursor-pointer"
          } rounded-full w-11 h-11  absolute right-[-35px] top-1/2 -translate-y-1/2 flex items-center justify-center text-color-branco/90 `}
        >
          <IoIosArrowForward size={35}></IoIosArrowForward>
        </div>
      </div>
      <Dots Quantity={carouselSize()} Selected={selected}></Dots>
    </div>
  );
}
type Items = {
  Quantity: any;
  Selected: number;
};

function Dots({ Quantity, Selected }: Items) {
  const dots = [];

  for (let i = 0; i < Quantity; i++) {
    dots.push(
      <div
        key={i}
        className={
          i === Selected
            ? "h-3 w-3 bg-color-5 rounded-full transition-all"
            : "h-2 w-2 bg-color-5/70 rounded-full transition-all"
        }
      ></div>
    );
  }

  return (
    <div className=" container mt-[-15px] mb-[15px]">
      <div className="flex items-center justify-center gap-2 h-6 ">{dots}</div>
    </div>
  );
}
