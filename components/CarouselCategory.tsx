"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import "../public/static/carousel.css";
import { IoIosArrowForward } from "react-icons/io";

export default function CarouselCategory(images) {
  const [selected, setSelected] = useState(0);
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
    <div className="mt-32 container">
      <div className=" relative px-[15px] lg:hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            <div className="flex gap-20 text-center justify-between">
              {Object.keys(images.images).map((key) => (
                <div key={key}>
                  <div>
                    <div className="cursor-pointer md:w-[115px] md:h-[115px] w-[105px] h-[105px]">
                      <Link
                        href={`/categorias/${images.images[key].categ.slug.current}`}
                      >
                        <Image
                          src={images.images[key].image.image}
                          alt={images.images[key].image.alt}
                          width={115}
                          height={115}
                        ></Image>
                      </Link>
                    </div>

                    <h1 className="text-color-5 mt-2 font-semibold">
                      {images.images[key].title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          onClick={scrollPrev}
          className={`${
            selected === 0
              ? "text-color-5/20 cursor-default"
              : "text-color-5 cursor-pointer"
          } rounded-full w-11 h-11 flex absolute left-[-45px] top-1/2 rotate-180  -translate-y-1/2  items-center justify-center text-color-branco/90 `}
        >
          <IoIosArrowForward size={35}></IoIosArrowForward>
        </div>
        <div
          onClick={scrollNext}
          className={`${
            selected === 10
              ? "text-color-5/20 cursor-default"
              : "text-color-5 cursor-pointer"
          } rounded-full w-11 h-11  absolute right-[-45px] top-1/2 -translate-y-1/2 flex items-center justify-center text-color-branco/90 `}
        >
          <IoIosArrowForward size={35}></IoIosArrowForward>
        </div>
      </div>
      <div className="container ">
        <div className=" justify-between text-center hidden lg:flex">
          {Object.keys(images.images).map((key) => (
            <div key={key}>
              <div>
                <div className="cursor-pointer w-[115px] h-[115px]">
                  <Link
                    href={`/categorias/${images.images[key].categ.slug.current}`}
                  >
                    <Image
                      src={images.images[key].image.image}
                      alt={images.images[key].image.alt}
                      width={115}
                      height={115}
                    ></Image>
                  </Link>
                </div>

                <h1 className="text-color-5 mt-2 font-semibold">
                  {images.images[key].title}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
