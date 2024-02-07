import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getCategories() {
  return client.fetch(
    groq`*[_type == "category"]{
        _id,
        title,
        slug,
        categoryImage {alt, "image": asset-> url}}`
  );
}

export async function getSingleCategory(slug: string) {
  return client.fetch(
    groq`*[_type == "category" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      categoryImage {alt, "image": asset-> url}
    }`,
    { slug }
  );
}
