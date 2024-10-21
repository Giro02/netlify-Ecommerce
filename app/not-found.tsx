import { ConectaMais } from "@/components/Svgs";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <div className="container font-montse text-color-5 ">
      <div className="flex flex-col gap-8 justify-center items-center my-36">
        <Link href="/">
          <ConectaMais className="md:text-[4rem] text-5xl" />
        </Link>
        <h1 className="text-xl md:text-4xl">404 - Ocorreu um erro</h1>
        <h5 className="text-base md:text-xl">
          Não encontramos o URL solicitado.
        </h5>
      </div>
    </div>
  );
}
