import { Slug } from "sanity";

export type CategoryType = {
  _id: String;
  title: String;
  slug: Slug;
  categoryImage: {
    alt: string;
    image: string;
  };
};
