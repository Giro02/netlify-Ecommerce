import React from "react";

export default function save() {
  return (
    <div>
      <div className="container py-12 flex flex-col lg:flex-row text-color-5 justify-between">
        <FloatMenu></FloatMenu>
        <div className="flex flex-col mx-auto px-0 lg:px-[4rem]  w-[100%]">
          <h1 className="text-center font-medium text-2xl">
            Endereços de Entrega
          </h1>
          {!form && (
            <div className="p-4">
              <IoIosArrowRoundBack></IoIosArrowRoundBack>
            </div>
          )}
          {form && (
            <div className="flex w-full text-end justify-end">
              <div
                onClick={() => {
                  showForm(false);
                }}
                className="p-2 rounded-lg bg-color-1 text-color-3 cursor-pointer mt-4"
              >
                + Adicionar endereço
              </div>
            </div>
          )}
          {!form && (
            <div>
              <AddressesForm userId={userId}></AddressesForm>
            </div>
          )}

          <div className="flex gap-4 my-4">
            <div className="px-6 py-4 bg-color-3 w-[100%] rounded-lg gap-2 flex flex-col "></div>
          </div>
        </div>
      </div>
    </div>
  );
}
