import Category from "@/components/Category";
import {
  getProductsByCategory,
  getSingleCategory,
} from "@/sanity/sanity.query";
import type { CategoryType, ProductPreviewArray } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: {
    category: string;
  };
  searchParams: {
    p: string;
    order: string;
  };
};

type CategoryQueryResponse = {
  productsArray: ProductPreviewArray;
  productCount: number;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.category;
  const category: CategoryType = await getSingleCategory(slug);
  if (!category) {
    notFound();
  } else {
    return {
      title: `${category.title}`,
      description: `${category.description}`,
      openGraph: {
        description: `${category.ogdescription}`,
        images: category.categoryImage.image,
        title: `${category.title}`,
      },
    };
  }
}

export default async function CategoryLayout({ params, searchParams }: Props) {
  const slug = params.category;
  const page = searchParams?.p?.replace("-", "") || "1";
  const itemsPerPage = 12;
  const order = (
    searchParams?.order?.replace("ç", "c").replace(" ", "-") || "relevance"
  ).toLowerCase();
  const category: CategoryType = await getSingleCategory(slug);
  const { productsArray, productCount }: CategoryQueryResponse =
    await getProductsByCategory(slug, order, page, itemsPerPage);
  if (!category) {
    notFound();
  } else {
    return (
      <main>
        <Category
          category={category}
          productsArray={productsArray}
          order={order}
          page={page}
          productCount={productCount}
          itemsPerPage={itemsPerPage}
        />
      </main>
    );
  }
}
