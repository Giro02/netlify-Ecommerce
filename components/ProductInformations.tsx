import { ProductInfoType } from "@/types";

type Information = {
  informations: ProductInfoType;
  description: string;
  productName: string;
};

export default function ProductInformations({
  informations,
  description,
  productName,
}: Information) {
  return (
    <div className="md:container flex flex-col font-montse text-color-5 mt-12">
      {/* <ThemeBreak /> */}
      {/* <h3 className="my-10 text-2xl">
        Descubra o {productName}: {description}
      </h3> */}
      {informations.explicacao && (
        <>
          <ThemeBreak />
          <div className="my-8 flex flex-col gap-4 py-4">
            <h4 className="text-2xl">O que é {productName} ?</h4>
            <h6 className="text-sm">{informations.explicacao}</h6>
          </div>
        </>
      )}
      {informations.beneficios && (
        <>
          <ThemeBreak />
          <div className="my-8 flex flex-col gap-4 text-end py-4">
            <h4 className="text-2xl">Quais os benefícios?</h4>
            <h6 className="text-sm">{informations.beneficios}</h6>
          </div>
        </>
      )}
      {informations.composicao && (
        <>
          <ThemeBreak />
          <div className="my-8 flex flex-col gap-4 py-4">
            <h4 className="text-2xl">Qual a composição?</h4>
            <h6 className="text-sm">{informations.composicao}</h6>
          </div>
        </>
      )}
      {informations.uso && (
        <>
          <ThemeBreak />
          <div className="my-8 flex flex-col gap-4 py-4 text-end">
            <h4 className="text-2xl">Como usar?</h4>
            <h6 className="text-sm">{informations.uso}</h6>
          </div>
        </>
      )}
      {informations.advertencias && (
        <>
          <ThemeBreak />
          <div className="my-8 flex flex-col gap-4 py-4">
            <h4 className="text-2xl">Advertências</h4>
            <h6 className="text-sm">{informations.advertencias}</h6>
          </div>
        </>
      )}
    </div>
  );
}

function ThemeBreak() {
  return <div className="h-[1px] w-full bg-color-1/50 mt-4" />;
}
