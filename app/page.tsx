import { getCategories } from "@/sanity/sanity.query";
import type { CategoryType } from "@/types";
import QiLgo from "../components/SVGs/qiLogo";

export default async function Home() {
  const categories: CategoryType[] = await getCategories();
  return (
    <main>
      <div className="w-[500px]">
        <QiLgo className="w-full h-auto " />
      </div>
      <div className="items-center justify-center flex">
        <div className="font-noto">減肥</div>
        <div className="font-montse"> &nbsp; / Emagrecimento</div>
      </div>
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
