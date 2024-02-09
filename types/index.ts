import { Slug } from "sanity";

export type CategoryType = {
  _id: String;
  title: String;
  slug: Slug;
  description: Text;
  ogdescription: String;
  categoryImage: {
    alt: string;
    image: string;
  };
};

export type ProductType = {
  _id: String;
  title: String;
  slug: Slug;
  description: String;
  productImage: {
    alt: string;
    image: string;
  };
  price: string;
  categories: Array<CategoryType>;
};
