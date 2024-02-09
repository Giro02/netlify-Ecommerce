"use client";
import type { CategoryType } from "@/types";
import QiButton from "./QiButton";

interface CategoryProps {
  category: CategoryType;
}

export default async function Category({ category }: CategoryProps) {
  return (
    <div>
      <div>{category._id}</div>
      <div>{category.title}</div>
      <div>{category.slug.current}</div>
      <img
        src={category.categoryImage.image}
        alt={category.categoryImage.alt}
      />
    </div>
  );
}
