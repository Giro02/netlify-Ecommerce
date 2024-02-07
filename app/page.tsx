import { getCategories } from "@/sanity/sanity.query";
import type { CategoryType } from "@/types";

export default async function Home() {
  const categories: CategoryType[] = await getCategories();
  return (
    <main>
      <div className="items-center justify-center flex">BEM VINDO A HOME!</div>
      {categories &&
        categories.map((category) => (
          <div>
            <div>{category._id}</div>
            <div>{category.title}</div>
            <img
              src={category.categoryImage.image}
              alt={category.categoryImage.alt}
            />
          </div>
        ))}
    </main>
  );
}
