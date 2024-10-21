"use client";
import React, { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import GoogleImg from "@/public/images/google.png";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Login() {
  const [erro, setErro] = useState(false);
  const [message, setMessage] = useState("");
  const email = useRef<string>("");
  const password = useRef<string>("");
  const [showConfPass, setConfPass] = useState(false);

  const toggleCongPass = () => {
    setConfPass(!showConfPass);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.current === "" || password.current === "") {
      setMessage("Preencha os campos obrigatórios *");
      setErro(true);
    } else if (!email.current.includes("@") || !email.current.includes(".")) {
      setMessage("Digite um email válido");
      setErro(true);
    } else if (email.current && password.current !== "") {
      try {
        setMessage("");
        setErro(false);
        const result = await signIn("credentials", {
          email: email.current,
          password: password.current,
          redirect: true,
          callbackUrl: "/",
        });
      } catch (error) {
        setMessage("Credenciais inválidas");
        setErro(true);
      }
    }
  };

  const onGoogleSubmit = async () => {
    const result = await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className="md:container px-2 text-color-5 bg-color-3 flex items-center justify-center py-16">
      <div className="p-8 shadow-md border border-color-5/10 w-[400px] rounded-xl flex flex-col gap-6">
        <form className="flex gap-6 flex-col" onSubmit={onSubmit}>
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-semibold">Acesse sua Conta</h1>
          </div>
          <div
            className={`${
              erro ? "flex" : "hidden"
            } text-color-7 text-sm font-medium bg-color-7/30 px-4 py-2 text-cente rounded-md border-color-5/20 border`}
          >
            {message}
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="flex gap-2">
              <span className="font-semibold">E-mail</span>
            </div>

            <input
              type="email"
              className="p-2 rounded-md border border-color-5/20 focus:outline-none"
              placeholder="Digite o seu e-mail"
              required={true}
              onChange={(e) => {
                email.current = e.target.value;
              }}
            ></input>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">Senha</span>
            </div>
            <div className="relative">
              <input
                type={showConfPass ? "text" : "password"}
                className={`focus:outline-none p-2 rounded-md border border-color-5/20 w-full`}
                placeholder="Digite sua senha"
                required={true}
                onChange={(e) => (password.current = e.target.value)}
              ></input>
              <span
                onClick={toggleCongPass}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-color-1"
              >
                {showConfPass ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-end justify-end">
              <h2 className="text-color-1 text-base hover:text-color-2 cursor-pointer">
                Esqueci minha senha
              </h2>
            </div>

            <button
              type="submit"
              className="hover:bg-color-2 font-semibold text-lg w-full py-2 bg-color-1 rounded-md text-color-3"
            >
              Entrar
            </button>
          </div>
        </form>
        <div className=" flex gap-2 items-center text-center">
          <hr className="w-[40%] text-color-5/20"></hr>
          <p className="text-color-5/60">OU</p>
          <hr className="w-[40%] text-color-5/20"></hr>
        </div>
        <div
          onClick={onGoogleSubmit}
          className="cursor-pointer bg-color-5/5 flex items-center justify-center gap-4 font-semibold text-lg w-full py-2 rounded-md border border-color-5/20 text-color-5/50"
        >
          <Image src={GoogleImg} width={25} alt="google logo"></Image>
          Entrar com Google
        </div>
        <div className="flex items-center gap-4 justify-center mt-2">
          <p className="text-color-5/50">Não possui conta?</p>
          <Link href="/costumer/account/register">
            <p className="text-color-1 font-medium hover:text-color-2">
              Cadastre-se
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
