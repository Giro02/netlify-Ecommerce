"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

// Send verification email
const UserForm = () => {
  const [erro, setErro] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    confPass: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfPass = () => {
    setShowConfPass(!showConfPass);
  };

  const handleChange = (e) => {
    let value = e.target.value.toLowerCase();
    const name = e.target.name;

    setFormdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      formData.email == "" ||
      formData.password == "" ||
      formData.name == ""
    ) {
      setMessage("Preencha os campos obrigatórios *");
      setErro(true);
    } else if (!formData.email.includes("@" || ".")) {
      setMessage("Digite um email válido");
      setErro(true);
    } else if (formData.confPass != formData.password) {
      setMessage("As senhas não correspondem.");
      setErro(true);
    } else if (
      formData.email != "" &&
      formData.name != "" &&
      formData.password != ""
    ) {
      const res = await fetch("/api/Users", {
        method: "POST",
        body: JSON.stringify({ formData }),
      });
      if (!res.ok) {
        const response = await res.json();
        setErrorMessage(response.message);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="container text-color-5 bg-color-3 flex items-center justify-center py-16">
      <div className="p-8 shadow-md border border-color-5/10 w-[400px] rounded-xl flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex gap-6 flex-col"
        >
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-semibold">Registre-se</h1>
          </div>
          <div
            className={`${
              erro ? "flex" : "hidden"
            } text-color-7  text-sm font-medium bg-color-7/30 px-4 py-2 text-cente rounded-md border-color-5/20 border`}
          >
            {message}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">Nome</span>
              {/* <span className="text-color-7">*</span> */}
            </div>
            <input
              id="name"
              name="name"
              onChange={handleChange}
              required={true}
              value={formData.name}
              // placeholder="Nome"
              className="p-2 rounded-md border border-color-5/20 focus:outline-none"
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">Email</span>
              {/* <span className="text-color-7">*</span> */}
            </div>
            <input
              id="email"
              name="email"
              onChange={handleChange}
              required={true}
              value={formData.email}
              placeholder="exemplo@exemplo.com"
              className="p-2 rounded-md border border-color-5/20 focus:outline-none"
            ></input>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <span className="font-semibold">Senha</span>
              {/* <span className="text-color-7">*</span> */}
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                required={true}
                value={formData.password}
                placeholder="Digite Sua Senha"
                className="p-2 rounded-md border border-color-5/20 focus:outline-none w-full"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-color-1"
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="font-semibold">Confirmar senha</span>
              {/* <span className="text-color-7">*</span> */}
            </div>
            <div className="relative">
              <input
                id="confPassword"
                type={showConfPass ? "text" : "password"}
                name="confPass"
                onChange={handleChange}
                required={true}
                value={formData.confPass}
                placeholder="Confirmar Senha"
                className="p-2 rounded-md border border-color-5/20 focus:outline-none w-full"
              />
              <span
                onClick={toggleConfPass}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-color-1"
              >
                {showConfPass ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </div>

          <input
            type="submit"
            value="Criar conta"
            className="bg-color-1 text-color-3 p-2 rounded-md cursor-pointer"
          ></input>
        </form>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};
export default UserForm;
