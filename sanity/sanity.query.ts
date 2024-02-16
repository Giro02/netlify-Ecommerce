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
      categoryImage {alt, "image": asset-> url},
      highlightedProducts[]->{
        ...,
        productImage {alt, "image": asset -> url},
       }
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

export async function getProductsByCategory(
  slug: string,
  order: string,
  page: string
) {
  let queryOrder = "";
  if (order === "name") {
    queryOrder = "lower(name) desc";
  } else if (order === "price") {
    queryOrder = "price asc";
  } else {
    queryOrder = "unitsSold desc";
  }
  return client.fetch(
    groq`*[_type == "product" && $slug in category[]->slug.current] | order(${queryOrder}) {
      ...,
      unitsSold,
      productImage {alt, "image": asset -> url},
        category[]-> {
        _id,
        title,
        slug
      }
    }`,
    { slug, queryOrder }
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
export async function getCarouselMain() {
  return client.fetch(
    groq`*[_type == "carousel-main"]{
      _id,
      homeimages {alt, "image": asset-> url}
  }`
  );
}
export async function getBanners(bannerName: string) {
  try {
    const data = await client.fetch(
      groq`*[_type == "banners" && title == "${bannerName}"]{
        _id,
        banners {alt, "image": asset-> url}
      }`
    );
    return data;
  } catch (error) {
      console.error("Deu merda", error);
    throw error; 
  }
}
