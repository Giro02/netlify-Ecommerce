import { getCategories } from "@/sanity/sanity.query";
import type { CategoryType } from "@/types";
import { QiLogo, QiLogoName } from "@/components/Svgs";

export default async function Home() {
  const categories: CategoryType[] = await getCategories();
  return (
    <main>
      <div className="w-[500px]">
        <QiLogo className="text-9xl" colors={["#DFBC64", "#BC64DF"]} />
        <QiLogoName
          className="text-9xl"
          colors={["#BC64DF", "#DFBC64", "#DF7F64"]}
        />
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
