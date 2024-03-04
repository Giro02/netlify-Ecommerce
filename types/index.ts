import { SubresourceIntegrityAlgorithm } from "next/dist/build/webpack/plugins/subresource-integrity-plugin";
import { Slug } from "sanity";

export type CategoryType = {
  _id: string;
  title: string;
  titleChinese: string;
  slug: Slug;
  description: Text;
  ogdescription: string;
  categoryImage: {
    alt: string;
    image: string;
  };
  highlightedProducts: Array<ProductPreview>;
};

export type ProductInfoType = {
  explicacao: string;
  beneficios: string;
  composicao: string;
  uso: string;
  advertencias: string;
};

export type ProductType = {
  _id: String;
  title: string;
  slug: Slug;
  description: string;
  informations: ProductInfoType;
  productImage: {
    alt: string;
    image: string;
  };
  priceBundle: Array<{
    unitPrice: number;
    bundleURL: URL;
    unitsNumber: number;
  }>;
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
  priceBundle: Array<{
    unitPrice: number;
    bundleURL: URL;
    unitsNumber: number;
  }>;
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
  homeimages?: {
    alt: string;
    image: string;
  };
};

export type CarouselArray = Array<CarouselType>;
