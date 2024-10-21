"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import "../public/static/carousel.css";
import { IoIosArrowForward } from "react-icons/io";

// Define os tipos para as props do componente
interface CarouselCategoryProps {
  images: {
    [key: string]: {
      image: {
        image: string;
        alt: string;
      };
      categ: {
        slug: {
          current: string;
        };
      };
      title: string;
    };
  };
}

export default function CarouselCategory({ images }: CarouselCategoryProps) {
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

  const canScrollNext = useCallback(() => {
    if (emblaApi) return emblaApi.canScrollNext();
    return false;
  }, [emblaApi]);

  return (
    <div className="mt-32 md:container">
      <div className="relative lg:hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex justify-between text-center gap-12">
            {Object.keys(images).map((key) => (
              <div key={key}>
                <div className="cursor-pointer w-[100px] h-[100px]">
                  <Link href={`/categorias/${images[key].categ.slug.current}`}>
                    <div>
                      <Image
                        src={images[key].image.image}
                        alt={images[key].image.alt}
                        width={100}
                        height={100}
                      />
                    </div>
                  </Link>
                </div>
                <h1 className="text-color-5 mt-2 font-semibold">
                  {images[key].title}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={scrollPrev}
          className={`${
            selected === 0
              ? "text-color-5/20 cursor-default"
              : "text-color-5 cursor-pointer"
          } hidden rounded-full w-11 h-11 md:flex absolute left-[-45px] top-1/2 rotate-180 -translate-y-1/2 items-center justify-center text-color-branco/90`}
        >
          <IoIosArrowForward size={35} />
        </div>
        <div
          onClick={scrollNext}
          className={`${
            !canScrollNext()
              ? "text-color-5/20 cursor-default"
              : "text-color-5 cursor-pointer"
          } hidden rounded-full w-11 h-11 absolute right-[-45px] top-1/2 -translate-y-1/2 md:flex items-center justify-center text-color-branco/90`}
        >
          <IoIosArrowForward size={35} />
        </div>
      </div>
      <div className="container">
        <div className="justify-between  text-center hidden lg:flex">
          {Object.keys(images).map((key) => (
            <div key={key}>
              <div className="cursor-pointer w-[115px] h-[115px]">
                <Link href={`/categorias/${images[key].categ.slug.current}`}>
                  <Image
                    src={images[key].image.image}
                    alt={images[key].image.alt}
                    width={115}
                    height={115}
                  />
                </Link>
              </div>
              <h1 className="text-color-5 mt-2 font-semibold">
                {images[key].title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
