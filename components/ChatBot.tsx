"use client";
import Image from "next/image";
import React, { useState } from "react";
import AvatarImg from "@/public/images/Avatar.png";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

export default function ChatBot() {
  const [toggleBtn, setToggleBtn] = useState(false);
  const [toggleShadow, setToggleShadow] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 ">
      <div
        onClick={() => setToggleBtn(true)}
        className={` ${
          toggleBtn
            ? "w-[400px] h-[560px] border-1 border-color-5 rounded-xl cursor-default shadow-2xl space-y-3 bg-color-3 overflow-hidden"
            : "rounded-full h-16 w-16 cursor-pointer shadow-lg flex items-center justify-center text-center bg-color-1/90"
        }     transition-all  duration-300 `}
      >
        <div
          className={`${
            toggleBtn ? "hidden" : "flex text-color-3 text-center"
          }`}
        >
          <IoChatbubbleEllipsesSharp
            className="ml-[60px]"
            size={35}
          ></IoChatbubbleEllipsesSharp>
        </div>

        <div
          className={`${
            toggleBtn
              ? "container flex flex-col p-6 h-full transition-all duration-500"
              : "invisible"
          }  `}
        >
          <div className="flex justify-between text-color-5">
            <h1 className="leading-relaxed font-medium text-xl">Chat AI</h1>
            <div
              className="cursor-pointer text-xl"
              onClick={(e) => {
                setToggleBtn(false);
                e.stopPropagation();
              }}
            >
              X
            </div>
          </div>
          <h2 className="text-sm leading-relaxed text-color-5/70">
            Assistênte Virtual Bernardo.
          </h2>
          {/* CHAT WINDOW */}
          <div className="h-full flex mt-4 w-full">
            <iframe
              className="h-full w-full mb-4 text-[11px]"
              src="https://typebot.co/faq-zau0hah"
            ></iframe>
            {/* BOT RESPONSE */}
            {/* <div className="flex gap-3 text-sm mt-4 ">
              <div className="w-[40px] h-[40px]  rounded-full overflow-hidden ">
                <Image src={AvatarImg} width={60} alt="Avataar"></Image>
              </div>
              <div className="leading-relaxed max-w-[265px] py-2 p-4 border shadow-sm rounded-xl border-color-4">
                <span className="block font-bold text-color-5">Bernardo:</span>
              </div>
            </div> */}
            {/* USER RESPONSE */}
            {/* <div className="flex gap-3 text-sm mt-4 text-right justify-end">
              <div className="leading-relaxed max-w-[265px] py-2 px-4 border shadow-sm rounded-xl border-color-4">
                <span className="block font-bold  text-color-5 ">Você:</span>
                <p className="p-1 text-pretty">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam nostrum blanditiis nobis,
                </p>
              </div>
              <div className="w-[40px] h-[40px]  rounded-full overflow-hidden ">
                <Image src={AvatarImg} width={60} alt="Avataar"></Image>
              </div>
            </div> */}
          </div>
          {/* CHAT FOOTER */}
          {/* <div className="flex">
            <input
              onSelect={() => setToggleShadow(!toggleShadow)}
              placeholder="Digite..."
              className={`${
                toggleShadow ? "shadow-xl" : "shadow-sm"
              }py-2 px-4 w-full border border-color-4  rounded-s-full outline-0`}
            ></input>
            <div className="py-2 px-4 flex items-center justify-center text-color-3 bg-color-1 shadow-md rounded-e-xl cursor-pointer">
              Enviar
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
