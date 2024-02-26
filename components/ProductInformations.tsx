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
    <div className="flex flex-col font-montse text-color-5 mt-24">
      <ThemeBreak />
      <h3 className="my-10 text-2xl">
        Descubra o {productName}: {description}
      </h3>
      {informations.explicacao ? (
        <>
          <ThemeBreak />
          <div className="my-8 flex flex-col gap-4">
            <h4 className="text-2xl">O que é?</h4>
            <h6 className="text-base">{informations.explicacao}</h6>
          </div>
        </>
      ) : (
        <></>
      )}
      {informations.beneficios ? (
        <>
          <ThemeBreak />
          <div className="my-8 flex flex-col gap-4">
            <h4 className="text-2xl">Quais os benefícios?</h4>
            <h6 className="text-base">{informations.beneficios}</h6>
          </div>
        </>
      ) : (
        <></>
      )}
      {informations.composicao ? (
        <>
          <ThemeBreak />
          <div className="my-8 flex flex-col gap-4">
            <h4 className="text-2xl">Qual a composição?</h4>
            <h6 className="text-base">{informations.composicao}</h6>
          </div>
        </>
      ) : (
        <></>
      )}
      {informations.uso ? (
        <>
          <ThemeBreak />
          <div className="my-8 flex flex-col gap-4">
            <h4 className="text-2xl">Como usar?</h4>
            <h6 className="text-base">{informations.uso}</h6>
          </div>
        </>
      ) : (
        <></>
      )}
      {informations.advertencias ? (
        <>
          <ThemeBreak />
          <div className="my-8 flex flex-col gap-4">
            <h4 className="text-2xl">Advertências</h4>
            <h6 className="text-base">{informations.advertencias}</h6>
          </div>
        </>
      ) : (
        <></>
      )}
      <ThemeBreak />
    </div>
  );
}

function ThemeBreak() {
  return <div className="h-[1px] w-full bg-gradient-to-l from-color-1" />;
}
