"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FloatMenu from "./FloatMenu";
import AddressesForm from "./AddressesForm";
import AddressesEdit from "./AddressEdit";
import { IoLocationSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosArrowBack, IoIosWarning } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

type UserAddress = {
  _id: string; // Alterado para string para simplificar
  firstName: string;
  lastName: string;
  phoneNumber: string;
  zipCode: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  cpfCnpj: string;
  city: string;
  state: string;
  userId: string;
  __v: number;
};

interface AddressesShowProps {
  userAddress: string; // serialized JSON string
  userId: string;
}

export default function AddressesShow({
  userAddress,
  userId,
}: AddressesShowProps) {
  const initialAddresses: UserAddress[] = JSON.parse(userAddress);
  const [addresses, setAddresses] = useState<UserAddress[]>(initialAddresses);
  const [formVisible, setFormVisible] = useState(initialAddresses.length === 0);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<UserAddress | null>(null);
  const [deleteWarningVisible, setDeleteWarningVisible] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const router = useRouter();

  const addAddress = (newAddress: UserAddress) => {
    setAddresses((prevAddresses) => [newAddress, ...prevAddresses]);
    setFormVisible(false);
  };

  const deleteAddress = async (addressId: string) => {
    try {
      const response = await fetch("/api/Addresses", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: { AddressId: addressId },
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao excluir endereço: ${response.statusText}`);
      }
      // retorna um novo array para atualizar o state e atualizar os cards
      setAddresses((prevAddresses) => {
        const updatedAddresses = prevAddresses.filter(
          (address) => address._id !== addressId
        );
        return updatedAddresses;
      });
      setDeleteWarningVisible(false);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleEditClick = (address: UserAddress) => {
    setAddressToEdit(address);
    setEditFormVisible(true);
  };

  useEffect(() => {
    if (deleteWarningVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [deleteWarningVisible]);

  return (
    <div className="text-color-5 pb-24">
      {deleteWarningVisible && (
        <div className="w-screen h-screen flex items-center justify-center absolute top-0 left-0 z-50">
          <div
            className="w-full h-full bg-color-5/50 backdrop-blur-sm absolute z-10"
            onClick={() => setDeleteWarningVisible(false)}
          ></div>
          <div className="bg-color-3 w-[360px] p-6 rounded-lg shadow-lg z-20 flex flex-col items-center text-color-5 justify-center">
            <div className="flex gap-4 mb-2">
              <IoIosWarning size={24} className="text-color-7 " />
              <p className="font-medium text-lg">Excluir endereço de entrega</p>
              <IoMdClose
                size={24}
                onClick={() => setDeleteWarningVisible(false)}
                className="cursor-pointer font-semibold text-xl text-color-5/40"
              />
            </div>
            <p className="mb-4">
              Tem certeza de que deseja excluir o endereço?
            </p>
            <div className="flex gap-4 justify-end w-full">
              <button
                className="bg-color-1 text-color-3 px-4 py-2 rounded"
                onClick={() =>
                  addressToDelete && deleteAddress(addressToDelete)
                }
              >
                Excluir
              </button>
              <button
                className="bg-color-5/20 text-color-5 px-4 py-2 rounded"
                onClick={() => setDeleteWarningVisible(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 md:container p-4 flex flex-col lg:flex-row text-color-5 justify-between">
        <FloatMenu />
        <div className="flex flex-col mx-auto px-0 lg:px-[4rem] w-[100%]">
          <h1 className="hidden lg:block text-center font-medium text-2xl mb-4">
            Endereços de Entrega
          </h1>
          {formVisible && !editFormVisible && (
            <div>
              <div
                className="flex items-center gap-2 text-color-3 bg-color-1 cursor-pointer p-2 max-w-[110px] mb-4 rounded-md mt-4"
                onClick={() => setFormVisible(false)}
              >
                <IoIosArrowBack size={22} /> Voltar
              </div>
              <AddressesForm userId={userId} />
            </div>
          )}
          {!formVisible && !editFormVisible && addresses.length === 0 && (
            <div>
              <AddressesForm userId={userId} />
            </div>
          )}
          {!formVisible && !editFormVisible && addresses.length > 0 && (
            <>
              <div className="flex w-full text-end justify-end">
                <div
                  onClick={() => setFormVisible(true)}
                  className="mb-8 p-2 rounded-lg bg-color-1 text-color-3 cursor-pointer mt-8 md:mt-4 shadow-lg"
                >
                  + Adicionar endereço
                </div>
              </div>
              <div className="grid justify-center gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className="px-6 py-6 bg-color-3 w-[100%] rounded-lg gap-2 flex flex-col shadow-lg max-w-[350px] relative pb-16"
                  >
                    <div className="flex gap-4 items-center">
                      <FaUser className="text-color-5 mt-[-15px]" />
                      <div>
                        <p className="font-medium">
                          {address.firstName} {address.lastName}
                        </p>
                        <p>{address.phoneNumber}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <IoLocationSharp className="text-color-5" size={20} />
                      <div>
                        <p>
                          {address.address}, {address.number}
                        </p>
                        <p>
                          {address.city}, {address.state}, {address.zipCode}
                        </p>
                        <div className="flex gap-8 font-medium mt-8 absolute bottom-4">
                          <div
                            onClick={() => handleEditClick(address)}
                            className="hover:text-color-1 cursor-pointer"
                          >
                            Editar
                          </div>
                          <div
                            onClick={() => {
                              setDeleteWarningVisible(true);
                              setAddressToDelete(address._id);
                            }}
                            className="hover:text-color-1 cursor-pointer"
                          >
                            Excluir
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {editFormVisible && addressToEdit && (
            <div>
              <div
                className="flex items-center gap-2 text-color-3 bg-color-1 cursor-pointer p-2 max-w-[110px] rounded-md mt-8 md:mt-4"
                onClick={() => setEditFormVisible(false)}
              >
                <IoIosArrowBack size={22} /> Voltar
              </div>
              <AddressesEdit address={addressToEdit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
