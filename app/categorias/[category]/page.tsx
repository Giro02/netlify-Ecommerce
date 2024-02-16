import Category from "@/components/Category";
import {
  getProductsByCategory,
  getSingleCategory,
} from "@/sanity/sanity.query";
import type { CategoryType, ProductArray } from "@/types";
import { Metadata } from "next";

type Props = {
  params: {
    category: string;
  };
  searchParams: {
    page: string;
    order: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.category;
  const category: CategoryType = await getSingleCategory(slug);
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

export default async function CategoryLayout({ params, searchParams }: Props) {
  const slug = params.category;

  const page = searchParams?.page || "";
  const order = (searchParams?.order || "relevance").toLowerCase();
  const category: CategoryType = await getSingleCategory(slug);
  const productsArray: ProductArray = await getProductsByCategory(
    slug,
    order,
    page
  );
  return (
    <main>
      <Category
        category={category}
        productsArray={productsArray}
        order={order}
        page={page}
      />
    </main>
  );
}
