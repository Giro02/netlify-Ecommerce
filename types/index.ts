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
  highlightedProducts: Array<ProductPreview>;
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
  priceBundle: Array<{ unitPrice: number; unitsNumber: number }>;
  category: Array<CategoryType>;
  similarProducts: Array<ProductPreview>;
  unitsSold: number;
};

export type ProductArray = Array<ProductType>;

export type ProductPreview = {
  _id: String;
  title: String;
  slug: Slug;
  description: String;
  unitsSold: number;
  productImage: {
    alt: string;
    image: string;
  };
  price: number;
  category: Array<{ _id: string; title: string; slug: Slug }>;
};

export type ProductPreviewArray = Array<ProductPreview>;

export type FuseProductResult = {
  item: ProductPreview;
  refIndex: number;
};

export type FuseProductResultArray = Array<FuseProductResult>;

export type CarouselType = {
  _id: String;
  title: String;
  products: Array<ProductPreview>;
  type?: String;
};

export type CarouselArray = Array<CarouselType>;
