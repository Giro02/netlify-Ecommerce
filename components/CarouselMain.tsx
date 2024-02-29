"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "../public/static/carousel.css";
import { IoIosArrowForward } from "react-icons/io";
import { CarouselType } from "@/types";

interface CarouselProps {
  carousel: Array<CarouselType>;
}

export default function CarouselMain(carousel: CarouselProps) {
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

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
    <div className="flex justify-center w-full h-full flex-col items-center relative text-color-5">
      <div className="embla w-full" ref={emblaRef}>
        <div className="embla__container">
          {carousel.carousel.map((i, index) => (
            <div key={index} className="embla__slide">
              <Images Image={i.homeimages?.image || ""}></Images>
            </div>
          ))}
        </div>
      </div>
      <Dots Quantity={carousel.carousel.length} Selected={selected}></Dots>
      <div className="hidden md:block ">
        <IoIosArrowForward
          className="w-11 h-11  absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-color-branco/90 p-1 cursor-pointer"
          onClick={scrollNext}
        ></IoIosArrowForward>
      </div>
      <div className="hidden md:block">
        <IoIosArrowForward
          className="w-11 h-11  absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-color-branco/90 rotate-180 p-1 cursor-pointer"
          onClick={scrollPrev}
        ></IoIosArrowForward>
      </div>
    </div>
  );
}

type ItemProps = {
  Image: string;
};

function Images({ Image }: ItemProps) {
  return (
    <div
      className="bg-cover bg-center aspect-4.47/1 flex items-center justify-center"
      style={{ backgroundImage: `url(${Image})` }}
    ></div>
  );
}

type Items = {
  Quantity: number;
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
    <div className=" relative">
      <div className="flex items-center justify-center gap-2 absolute bottom-[-32px] ">
        {dots}
      </div>
    </div>
  );
}
