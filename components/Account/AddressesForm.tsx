"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type LoggedMenuProps = {
  userId: string;
};

interface FormData {
  firstName: string;
  lastName: string;
  zipCode: string;
  phoneNumber: string;
  address: string;
  number: string;
  neighborhood: string;
  complement: string;
  cpfCnpj: string;
  city: string;
  state: string;
}

export default function AddressesForm({ userId }: LoggedMenuProps) {
  const [error, setError] = useState({
    firstName: false,
    lastName: false,
    zipCode: false,
    phoneNumber: false,
    address: false,
    number: false,
    neighborhood: false,
    complement: false,
    cpfCnpj: false,
    city: false,
    state: false,
  });

  const states = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const { register, handleSubmit, setValue, watch } = useForm();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    let newError = {};
    let hasError = false;

    data.zipCode = data.zipCode.replace(/[^0-9]/g, "");
    data.cpfCnpj = data.cpfCnpj.replace(/[^0-9]/g, "");

    for (let key in data) {
      if (data[key] === "") {
        newError[key] = true;
        hasError = true;
      } else {
        newError[key] = false;
      }
    }

    setError(newError);

    if (!hasError) {
      try {
        const response = await fetch("/api/Addresses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ formData: { ...data, userId } }),
        });

        if (response.status == 401) {
          const errorData = await response.json();
          setError((prevError) => ({
            ...prevError,
            cpfCnpj: true,
          }));
          return;
        }

        if (!response.ok) {
          throw new Error("Algo deu errado!");
        }

        const result = await response.json();
        console.log("Formulário submetido com sucesso:", result);
        if (response.status == 201) {
          router.refresh();
        }
      } catch (error) {
        console.error("Erro ao submeter o formulário:", error);
      }
    }
  };

  const checkCEP = async (e) => {
    const cep = e.target.value.replace(/[^0-9]/g, "");
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setValue("address", data.logradouro);
          setValue("neighborhood", data.bairro);
          setValue("city", data.localidade);
          setValue("state", data.uf);
        } else {
          console.log("CEP não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleInputClick = (fieldName: string) => {
    setError((prev) => ({
      ...prev,
      [fieldName]: false,
    }));
  };

  return (
    <div className="bg-color-3 rounded-md px-4 lg:px-8 py-8">
      <div className="p-4 hidden"> aviso</div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 grid-cols-1 lg:grid-cols-2 mx-auto"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1">
              Nome
            </label>
            <input
              onClick={() => handleInputClick("firstName")}
              type="text"
              placeholder="Nome do Contato"
              id="firstName"
              {...register("firstName")}
              className={`${
                error.firstName ? "border-color-7" : "border-color-5/20"
              } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
            />
            {error.firstName && (
              <p className="text-color-7 text-xs">Campo Obrigatório *</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1">
              Sobrenome
            </label>
            <input
              onClick={() => handleInputClick("lastName")}
              type="text"
              placeholder="Sobrenome"
              id="lastName"
              {...register("lastName")}
              className={`${
                error.lastName ? "border-color-7" : "border-color-5/20"
              } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
            />
            {error.lastName && (
              <p className="text-color-7 text-xs">Campo Obrigatório *</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-1">
            Número de telefone
          </label>
          <input
            onClick={() => handleInputClick("phoneNumber")}
            type="text"
            id="phoneNumber"
            placeholder="Exemplo: 54 99900-0000"
            {...register("phoneNumber")}
            className={`${
              error.phoneNumber ? "border-color-7" : "border-color-5/20"
            } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
          />
          {error.phoneNumber && (
            <p className="text-color-7 text-xs">Campo Obrigatório *</p>
          )}
        </div>
        <div>
          <label htmlFor="zipCode" className="block mb-1">
            CEP
          </label>
          <input
            onClick={() => handleInputClick("zipCode")}
            type="text"
            id="zipCode"
            {...register("zipCode")}
            onChange={checkCEP}
            className={`${
              error.zipCode ? "border-color-7" : "border-color-5/20"
            } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
          />
          {error.zipCode && (
            <p className="text-color-7 text-xs">Campo Obrigatório *</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="address" className="block mb-1">
              Endereço
            </label>
            <input
              onClick={() => handleInputClick("address")}
              type="text"
              id="address"
              {...register("address")}
              className={`${
                error.address ? "border-color-7" : "border-color-5/20"
              } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
            />
            {error.address && (
              <p className="text-color-7 text-xs">Campo Obrigatório *</p>
            )}
          </div>
          <div>
            <label htmlFor="number" className="block mb-1">
              Número
            </label>
            <input
              onClick={() => handleInputClick("number")}
              type="text"
              id="number"
              {...register("number")}
              className={`${
                error.number ? "border-color-7" : "border-color-5/20"
              } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
            />
            {error.number && (
              <p className="text-color-7 text-xs">Campo Obrigatório *</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="complement" className="block mb-1">
            Complemento
          </label>
          <input
            onClick={() => handleInputClick("complement")}
            type="text"
            id="complement"
            placeholder="Casa/Apartamento"
            {...register("complement")}
            className={`${
              error.complement ? "border-color-7" : "border-color-5/20"
            } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
          />
          {error.complement && (
            <p className="text-color-7 text-xs">Campo Obrigatório *</p>
          )}
        </div>
        <div>
          <label htmlFor="neighborhood" className="block mb-1">
            Bairro
          </label>
          <input
            onClick={() => handleInputClick("neighborhood")}
            type="text"
            id="neighborhood"
            {...register("neighborhood")}
            className={`${
              error.neighborhood ? "border-color-7" : "border-color-5/20"
            } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
          />
          {error.neighborhood && (
            <p className="text-color-7 text-xs">Campo Obrigatório *</p>
          )}
        </div>
        <div>
          <label htmlFor="cpfCnpj" className="block mb-1">
            CPF/CNPJ
          </label>
          <input
            onClick={() => handleInputClick("cpfCnpj")}
            type="text"
            id="cpfCnpj"
            placeholder="000.000.000-00"
            {...register("cpfCnpj")}
            className={`${
              error.cpfCnpj ? "border-color-7" : "border-color-5/20"
            } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
          />
          {error.cpfCnpj && (
            <p className="text-color-7 text-xs">Campo Obrigatório *</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block mb-1">
              Cidade
            </label>
            <input
              onClick={() => handleInputClick("city")}
              type="text"
              id="city"
              {...register("city")}
              className={`${
                error.city ? "border-color-7" : "border-color-5/20"
              } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
            />
            {error.city && (
              <p className="text-color-7 text-xs">Campo Obrigatório *</p>
            )}
          </div>
          <div>
            <label htmlFor="state" className="block mb-1">
              Estado
            </label>
            <select
              onClick={() => handleInputClick("state")}
              id="state"
              {...register("state")}
              className={`${
                error.state ? "border-color-7" : "border-color-5/20"
              } w-full px-3 py-2 border rounded-md font-light text-sm transition-colors hover:border-color-5/50 focus:border-color-5/50 focus:outline-none`}
            >
              <option value="">Selecione o estado</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {error.state && (
              <p className="text-color-7 text-xs">Campo Obrigatório *</p>
            )}
          </div>
        </div>
        <div>
          <p className="text-color-5/50 text-sm">
            Nós respeitamos a sua privacidade e a confidencialidade dos seus
            dados. Suas informações pessoais só serão coletadas, usadas e
            divulgadas de acordo com as ‘Políticas de Privacidade’.{" "}
          </p>
          <button
            type="submit"
            className="mt-4 hover:bg-color-2 font-semibold text-lg w-full py-2 bg-color-1 rounded-md text-color-3"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
