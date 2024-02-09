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
