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
    openGraph: {
      images: category.categoryImage.image,
      title: `${category.title}`,
    },
  };
}

export default async function Category({ params }: Props) {
  const slug = params.category;
  const category: CategoryType = await getSingleCategory(slug);
  return (
    <main>
      <div>
        <div>{category._id}</div>
        <div>{category.title}</div>
        <div>{category.slug.current}</div>
        <img
          src={category.categoryImage.image}
          alt={category.categoryImage.alt}
        />
      </div>
    </main>
  );
}
