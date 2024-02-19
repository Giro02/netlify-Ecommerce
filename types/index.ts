import { Slug } from "sanity";

export type CategoryType = {
  _id: String;
  title: String;
  titleChinese: String;
  slug: Slug;
  description: Text;
  ogdescription: String;
  categoryImage: {
    alt: string;
    image: string;
  };
  highlightedProducts: Array<ProductType>;
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
  price: number;
  category: Array<CategoryType>;
  unitsSold: number;
};

export type SearchProduct = {
  _id: String;
  title: String;
  slug: Slug;
  description: String;
  productImage: {
    alt: string;
    image: string;
  };
  category: Array<{ _id: string; title: string }>;
};

export type SearchProductArray = Array<SearchProduct>;

export type ProductArray = Array<ProductType>;

export type CarouselType = {
  _id: String;
  title: String;
  products: Array<ProductType>;
  type?: String;
};

export type CarouselArray = Array<CarouselType>;
