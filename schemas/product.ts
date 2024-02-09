import { defineField } from "sanity";

const product = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productImage",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
  ],
};

export default product;
