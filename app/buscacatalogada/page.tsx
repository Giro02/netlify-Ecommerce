import BuscaCatalogada from "@/components/BuscaCatalogada";
import { getProductsForContext } from "@/sanity/sanity.query";
import { ProductPreviewArray } from "@/types";
import { Metadata } from "next";

type BuscaCatalogadaProps = {
  searchParams: {
    q: string;
    p: string;
    order: string;
  };
};

export async function generateMetadata({
  searchParams,
}: BuscaCatalogadaProps): Promise<Metadata> {
  return {
    title: `${searchParams.q} `,
    description: "Descricao da EssenciaQi",
    // openGraph: {
    //   description: `${category.ogdescription}`,
    //   images: category.categoryImage.image,
    //   title: `${category.title}`,
    // },
  };
}

export default async function BuscaCatalogadaLayout({
  searchParams,
}: BuscaCatalogadaProps) {
  const query = searchParams?.q?.slice(0, 128);
  const page = searchParams?.p?.replace("-", "") || "1";
  const order = (
    searchParams?.order?.replace("ç", "c").replace(" ", "-") || "relevance"
  ).toLowerCase();
  const allProductsPreview: ProductPreviewArray = await getProductsForContext();

  return (
    <main>
      <BuscaCatalogada
        order={order}
        query={query}
        page={page}
        allProducts={allProductsPreview}
      />
    </main>
  );
}
