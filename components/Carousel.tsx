"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "../public/static/carousel.css";
import { IoIosArrowForward } from "react-icons/io";
import { CarouselType } from "@/types";
import Link from "next/link";
import { formatCurrency } from "@/utils/UtilityFunctions";

interface CarouselProps {
  carousel: CarouselType;
}

export default function Carousel({ carousel }: CarouselProps) {
  return (
    <div>
      <Constructor carousel={carousel}></Constructor>
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
          className={` rounded-xl text-color-5 shadow-lg hover:border-x  border-color-5/10 relative px-6 py-6 cursor-pointer transition-all hover:shadow-xl w-[235px] md:w-[240px] flex items-center justify-center flex-col text-center`}
          onMouseEnter={() => setSaiba(index)}
          onMouseLeave={() => setSaiba(null)}
        >
          <div className="w-full h-[200px]">
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
            <p className="text-[13px] h-16 mt-4 text-color-5/70">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex text-color-5/70 text-sm">
              <p>De &nbsp;</p>
              <p className="line-through">
                {formatCurrency(
                  product.priceBundle[0].unitPrice +
                    (product.priceBundle[0].unitPrice * 30) / 100
                )}
              </p>
            </div>

            <div className=" h-4 items-center text-center flex  ">
              <p>por &nbsp;</p>
              <p className="font-bold text-2xl ">
                {formatCurrency(product.priceBundle[0].unitPrice)}
              </p>
            </div>
          </div>

          <div
            className={`h-10 bg-color-1 ${
              Saiba === index ? "flex" : " flex sm:invisible "
            } items-center justify-center text-color-branco text-[16px] w-full py-4 rounded-lg mt-6 text-color-3`}
          >
            Saiba mais
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
    <div className=" md:container">
      <div className=" relative">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex px-4 py-8 gap-6">
            {slideElements}
          </div>
        </div>

        <div
          onClick={scrollPrev}
          className={`${
            selected === 0
              ? "text-color-5/20 cursor-default"
              : "text-color-5 cursor-pointer"
          } hidden rounded-full w-11 h-11 md:flex absolute left-[-35px] top-1/2 rotate-180 -translate-y-1/2  items-center justify-center text-color-branco/90 `}
        >
          <IoIosArrowForward size={35}></IoIosArrowForward>
        </div>
        <div
          onClick={scrollNext}
          className={`${
            canScrollNext() == false
              ? "text-color-5/20 cursor-default"
              : "text-color-5 cursor-pointer"
          } hidden rounded-full w-11 h-11  absolute right-[-35px] top-1/2 -translate-y-1/2 md:flex items-center justify-center text-color-branco/90 `}
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
    <div className="hidden lg:container mt-[-15px] mb-[15px]">
      <div className="flex items-center justify-center gap-2 h-6 ">{dots}</div>
    </div>
  );
}
