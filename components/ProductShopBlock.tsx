"use client";
import { formatCurrency } from "@/utils/UtilityFunctions";
import { TbPigMoney } from "react-icons/tb";
import BundleDropdown from "./BundleDropdown";
import { Link as Scroll } from "react-scroll";
import { IoIosArrowDropdownCircle, IoIosArrowForward } from "react-icons/io";
import { ProductType } from "@/types";
import { useCart } from "@/app/context/CartContext";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaCheckSquare } from "react-icons/fa";
import useEmblaCarousel from "embla-carousel-react";
import { FaWhatsappSquare } from "react-icons/fa";
import "../public/static/carousel.css";
import { CiMail } from "react-icons/ci";
import { PiPackage } from "react-icons/pi";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { CiShare2 } from "react-icons/ci";

type ProductShopBlockProps = {
  selectedOption: number;
  product: ProductType;
};

export default function ProductShopBlock({
  selectedOption,
  product,
}: ProductShopBlockProps) {
  const { addItem } = useCart();
  const selectedPrice = product.priceBundle[selectedOption];
  const productDetails = {
    title: product.title,
    unitPrice: selectedPrice.unitPrice,
    unitsNumber: selectedPrice.unitsNumber,
    total: selectedPrice.unitPrice * selectedPrice.unitsNumber,
    image: product.productImage.image,
    description: product.informations.explicacao,
  };
  const [axis, setAxis] = useState("y");
  const [popUp, setPopUp] = useState(false);
  const [selected, setSelected] = useState(0);
  const [isIndex, setIsIndex] = useState(0);
  const [mainImage, setMainImage] = useState(product.productImages[0].image);
  const [viewportRef, emblaApi] = useEmblaCarousel(
    {
      skipSnaps: false,
      dragFree: true,
    },
    [WheelGesturesPlugin({ forceWheelAxis: axis })]
  );

  const onSelect = useCallback((emblaApi: any) => {
    setSelected(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (emblaApi) emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const handleAddToCart = () => {
    addItem(productDetails);
    setPopUp(true);
    setTimeout(() => {
      setPopUp(false);
    }, 3000);
  };
  const handleImageClick = (image: string, index: number) => {
    scrollTo(index);
    setSelected(index);
    setMainImage(image);
    setIsIndex(index);
  };
  const scrolToNextImage = (isIndex) => {
    if (isIndex < product.productImages.length - 1) {
      scrollTo(isIndex + 1);
      setSelected(isIndex + 1);
      setMainImage(product.productImages[isIndex + 1].image);
      setIsIndex(isIndex + 1);
    }
    console.log(isIndex);
  };
  const scrolToPrevImage = (isIndex) => {
    if (isIndex >= 1) {
      setIsIndex(isIndex - 1);
      scrollTo(isIndex - 1);
      setSelected(isIndex - 1);
      setMainImage(product.productImages[isIndex - 1].image);
    }
  };

  const scrollToIndex = (index) => {
    console.log(index);
    setIsIndex(index);
    scrollTo(index);
    setSelected(index);
    setMainImage(product.productImages[index].image);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setAxis("x");
    } else {
      setAxis("y");
    }
  };
  useEffect(() => {
    handleResize(); // Executa ao montar o componente
    window.addEventListener("resize", handleResize); // Escuta redimensionamentos

    return () => {
      window.removeEventListener("resize", handleResize); // Limpa o listener
    };
  }, []);
  const startX = useRef(0);
  const endX = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX; // Armazenando a posição do toque inicial
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX; // Atualizando a posição do toque
  };

  const handleTouchEnd = () => {
    const threshold = 50; // Distância mínima para considerar um swipe
    const distance = endX.current - startX.current; // Calculando a distância do swipe

    if (distance > threshold) {
      // Swipe para a direita
      scrolToPrevImage();
    } else if (distance < -threshold) {
      // Swipe para a esquerda
      scrolToNextImage();
    }
  };

  const productOutOfStockLayout = () => {
    return (
      <div className="flex flex-col justify-between">
        <div className="max-w-[450px]">
          <h1 className="hidden lg:block text-color-5 text-[28px]">
            {product.title}
          </h1>
          <div className="hidden lg:block h-[2px] w-[400px] bg-gradient-to-r from-color-1" />

          <div className="mt-4">
            <a
              href={`https://wa.me/54999879778?text=${encodeURIComponent(
                `Olá gostaria de saber sobre a disponibilidade do produto ${product.title}`
              )}`}
            >
              <div className="bg-color-6 hover:bg-color-6/70 flex items-center justify-center gap-4 p-2 text-color-5 rounded-xl text-center cursor-pointer font-medium">
                <PiPackage size={36}></PiPackage>
                <div className="items-start justify-start text-left">
                  <p>Clique Para Encomendar</p>
                </div>
              </div>
            </a>
          </div>
          <div className="flex w-full justify-center mt-4">
            <p className="font-semibold">Ou</p>
          </div>
          <div className="mt-2">
            <p>
              Selecione uma das opções abaixo para fazer uma cotação com um de
              nossos atendentes
            </p>
          </div>
        </div>
        <div className="mt-4">
          <div className="bg-color-5 py-2 px-4 rounded-b rounded-xl text-color-3 font-semibold">
            ATENDIMENTO
          </div>
          <div className="flex gap-4 flex-col p-4  border border-color-4">
            <a
              href={`https://wa.me/54999879778?text=${encodeURIComponent(
                `Olá gostaria de saber sobre a disponibilidade do produto ${product.title}`
              )}`}
            >
              <div className="cursor-pointer gap-4 flex items-center hover:text text-color-5 underline underline-offset-4">
                <FaWhatsappSquare
                  className="text-color-8"
                  size={32}
                ></FaWhatsappSquare>{" "}
                (54)99987-9778{" "}
              </div>
            </a>
            <a
              href="mailto:conectamaisautomacao@gmail.com"
              className="cursor-pointer gap-4 flex items-center text-color-5 underline underline-offset-2"
              title="Enviar um e-mail para conectamaisautomacao@gmail.com"
            >
              <CiMail size={32} className="hidden md:block" />
              conectamaisautomacao@gmail.com
            </a>
          </div>
          <div className="max-w-[450px] bg-color-4 px-4 py-2 rounded-b-xl text-xs">
            <span className="font-medium">Horário de funcionamento:</span> De
            segunda à sexta das 08h às 18h, Sábado das 08h às 12h.
            <p></p>
          </div>
        </div>

        <Scroll
          to="InfoSection"
          smooth={true}
          duration={800}
          className="flex mt-4 items-center text-color-1"
          href="#InfoSection"
        >
          <IoIosArrowDropdownCircle />
          <div className="font-semibold">Veja Detalhes</div>
        </Scroll>
      </div>
    );
  };
  const productSellLayout = () => {
    return (
      <div className="flex flex-col justify-between">
        <div className="max-w-[450px]">
          <h1 className="hidden lg:block text-color-5 text-[28px]">
            {product.title}
          </h1>
          <div className="hidden lg:block h-[2px] w-[400px] bg-gradient-to-r from-color-1" />
          <div className="text-3xl mt-7">
            {formatCurrency(selectedPrice.unitPrice)}
          </div>
          <div className="flex text-base items-center gap-1 text-color-5/75 mt-7 mb-2">
            <TbPigMoney /> Compre mais e economize:
          </div>
          <BundleDropdown
            priceBundle={product.priceBundle}
            selectedOption={selectedOption}
          />
          <div className="text-color-5/75 flex mt-5 text-lg">
            Valor total :{" "}
            {formatCurrency(
              selectedPrice.unitPrice * selectedPrice.unitsNumber
            )}
          </div>

          <div className="mt-14">
            <div
              onClick={handleAddToCart}
              className="bg-color-1 p-2 text-color-3 rounded-xl text-center cursor-pointer font-medium hover:bg-color-2"
            >
              Adicionar ao Carrinho
            </div>
          </div>
          <p className="text-sm mt-7">Calcule o frete</p>
          <input
            type="text"
            placeholder="CEP"
            id="CEP"
            className={`mt-2 border-color-5/20 w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
          />
        </div>
        <Scroll
          to="InfoSection"
          smooth={true}
          duration={800}
          className="flex gap-1 items-center text-color-1"
          href="#InfoSection"
        >
          <IoIosArrowDropdownCircle />
          <div className="font-semibold">Veja Detalhes</div>
        </Scroll>
      </div>
    );
  };

  const productSellRender =
    product.priceBundle[0].unitPrice === 0
      ? productOutOfStockLayout()
      : productSellLayout();

  return (
    <div className=" flex justify-center flex-col lg:flex-row gap-8 lg:gap-36 mt-2 md:mt-7">
      {popUp && (
        <div className="fixed flex items-center gap-4 top-0 left-1/2 transform -translate-x-1/2 bg-color-8 text-color-3 px-4 py-2 rounded-b-lg">
          <FaCheckSquare size={18} className="text-color-3"></FaCheckSquare>
          Item Adicionado ao carrinho
        </div>
      )}
      {/* Carrousel Desktop */}
      <div className="flex flex-col md:flex-row gap-2 items-end">
        <div className=" max-w-[150px]  max-h-[515px] hidden md:block">
          <div className="embla2" ref={viewportRef}>
            <div className="h-[515px] w-[100px]">
              {product.productImages.map((img, index) => (
                <div
                  key={index}
                  className={` ${
                    selected === index
                      ? "border-2 border-color-5/30 rounded-lg"
                      : ""
                  } embla__slide2 cursor-pointer`}
                  onMouseEnter={() => handleImageClick(img.image, index)}
                >
                  <Image
                    src={img.image}
                    alt={img.alt}
                    width={100}
                    height={100}
                    className={`object-cover rounded-md 
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Imagem Principal */}
        <div className="text-2xl font-medium">{product.title}</div>

        <div
          className="mt-4 max-w-[550px]  p-4 max-h-[550px] md:flex items-center justify-center rounded-md  relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={mainImage}
            alt="Imagem do Produto"
            className="object-contain"
            width={550}
            height={550}
            sizes="(max-width: 550px) 100vw, 550px"
            priority
          />

          <div
            className="absolute rounded-full p-2 bg-color-1 top-0 right-2 cursor-pointer"
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title: document.title,
                    text: "Confira este produto que encontrei!",
                    url: window.location.href,
                  })
                  .catch((error) =>
                    console.log("Erro ao compartilhar:", error)
                  );
              } else {
                alert(
                  "A funcionalidade de compartilhamento não é suportada neste dispositivo."
                );
              }
            }}
          >
            <CiShare2 className="text-color-3" size={20} />
          </div>
          <div className="absolute top-1 left-2 bg-color-4/50 text-color-5 rounded-full py-1 px-4 text-xs font-medium">
            Item {isIndex + 1}/{product.productImages.length}
          </div>

          <button
            onClick={() => scrolToPrevImage(isIndex)}
            disabled={isIndex === 0}
            className={`${
              isIndex === 0
                ? "text-color-5/20 cursor-default"
                : "text-color-5 cursor-pointer"
            }  rounded-full w-11 h-11 flex absolute left-0 top-1/2 rotate-180 -translate-y-1/2 items-center justify-center text-color-branco/90`}
            aria-label="Previous Image"
          >
            <IoIosArrowForward size={28} />
          </button>
          <button
            onClick={() => scrolToNextImage(isIndex)}
            disabled={isIndex === product.productImages.length - 1}
            className={`${
              isIndex === product.productImages.length - 1
                ? "text-color-5/20 cursor-default"
                : "text-color-5 cursor-pointer"
            }  rounded-full w-11 h-11 absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-color-branco/90`}
            aria-label="Next Image"
          >
            <IoIosArrowForward size={28} />
          </button>
        </div>
        {/* Carrousel Mobile */}
        <div className="relative flex max-w-[325px] mt-[-35px] md:hidden">
          <div className="embla" ref={viewportRef}>
            <div className="embla__container">
              {product.productImages.map((img, index) => (
                <div
                  key={index}
                  className={`${
                    isIndex === index
                      ? "border-2 border-color-5/30 rounded-lg"
                      : ""
                  } embla__slide2 cursor-pointer`}
                  onClick={() => scrollToIndex(index)}
                >
                  <Image
                    src={img.image}
                    alt={img.alt}
                    width={75}
                    height={75}
                    className="object-cover rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {productSellRender}
    </div>
  );
}
