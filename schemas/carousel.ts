import { defineField } from "sanity";

const carousel = {
  name: "carousel",
  title: "Carousel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "type",
      title: "Carousel Type",
      type: "string",
      options: {
        list: [{ title: "Home", value: "home" }],
      },
    }),
  ],
};

export default carousel;
