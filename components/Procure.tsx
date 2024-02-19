import { SearchProductArray } from "@/types";
import { useState } from "react";
import { useDebounce } from "use-debounce";

type ProcureProps = {
  productsSearch: SearchProductArray;
};

export default function Procure({ productsSearch }: ProcureProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);
  return (
    <div className="flex w-full ">
      <input
        className="h-[40px] border border-color-4 w-full px-4 rounded-l-md "
        placeholder="Pesquisar na loja toda..."
      ></input>
      <button className="w-[48px] h-[40px] bg-color-1 rounded-r-md"></button>
    </div>
  );
}
