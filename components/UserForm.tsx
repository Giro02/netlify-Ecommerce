"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const UserForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPass, setConfPass] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleCongPass = () => {
    setConfPass(!showConfPass);
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
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };
  return (
    <div className="container text-color-5 bg-color-3 flex items-center justify-center">
      <div className="p-8 shadow-md border border-color-5/10 w-[400px] mt-16 rounded-xl flex flex-col gap-6">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex gap-6 flex-col"
        >
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-semibold">Registre-se</h1>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">Nome</span>
              <span className="text-color-7">*</span>
            </div>
            <input
              id="name"
              name="name"
              onChange={handleChange}
              required={true}
              value={formData.name}
              placeholder="Nome"
              className="p-2 rounded-md border border-color-5/20 focus:outline-none"
            ></input>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">Email</span>
              <span className="text-color-7">*</span>
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

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <span className="font-semibold">Senha</span>
              <span className="text-color-7">*</span>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                required={true}
                value={formData.password}
                placeholder="Senha"
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
              <span className="font-semibold">Confirme sua Senha</span>
            </div>
            <div className="relative">
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfPass ? "text" : "password"}
                required={true}
                placeholder="Confirme sua senha"
                className="p-2 rounded-md border border-color-5/20 focus:outline-none w-full"
              ></input>
              <span
                onClick={toggleCongPass}
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
