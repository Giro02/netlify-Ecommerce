import { groq } from "next-sanity";
import client from "./sanity.client";

export async function getCategories() {
  return client.fetch(
    groq`*[_type == "category"]{
        _id,
        title,
        slug,
        description,
        categoryImage {alt, "image": asset-> url}}`
  );
}

export async function getSingleCategory(slug: string) {
  return client.fetch(
    groq`*[_type == "category" && slug.current == $slug][0]{
     ...,
     description,
      categoryImage {alt, "image": asset-> url}
    }`,
    { slug }
  );
}

export async function getProducts() {
  return client.fetch(
    groq`*[_type == "product"]{
      ...,
      _id,
      slug,
      productImage {alt, "image": asset -> url},
        'categories': category[]-> {
        _id,
        title,
        slug
      },
    }`
  );
}

export async function getProductsByCategory(slug: string) {
  return client.fetch(
    groq`*[_type == "product" && $slug in category[]->slug.current]{
      ...,
      unitsSold,
      productImage {alt, "image": asset -> url},
        category[]-> {
        _id,
        title,
        slug
      }
    }`,
    { slug }
  );
}

export async function getSingleProduct(slug: string) {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      ...,
      _id,
      slug,
      productImage {alt, "image": asset -> url},
        category[]-> {
        _id,
        title,
        slug
      }
    }`,
    { slug }
  );
}

export async function getProdCarouselHome() {
  return client.fetch(
    groq`*[_type == "carousel" && type == "home"]{
      _id,
      title,
      products[]-> {
        _id,
        title,
        description,
        productImage {alt, "image": asset -> url},
        price,
        slug,
      }
    }`
  );
}
