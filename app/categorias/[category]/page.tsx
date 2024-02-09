import Category from "@/components/Category";
import { getSingleCategory } from "@/sanity/sanity.query";
import type { CategoryType } from "@/types";
import { Metadata } from "next";

type Props = {
  params: {
    category: string;
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

export default async function CategoryLayout({ params }: Props) {
  const slug = params.category;
  const category: CategoryType = await getSingleCategory(slug);
  return (
    <main>
      <Category category={category} />
    </main>
  );
}
