import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CarouselCategory(images) {
  console.log(images.images[0].Imagem);
  return (
    <div>
      <div className="flex justify-evenly items-center text-center mt-32 ">
        {Object.keys(images.images).map((key) => (
          <div key={key}>
            <div>
              <div className="cursor-pointer">
                <Link
                  href={`/categorias/${images.images[key].categ.slug.current}`}
                >
                  <Image
                    src={images.images[key].image.image}
                    alt={images.images[key].image.alt}
                    width={125}
                    height={125}
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
  );
}
