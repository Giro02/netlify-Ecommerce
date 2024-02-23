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
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "priceBundle",
      title: "Bundle Price",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "unitPrice", type: "number", title: "Price per Unit" },
            { name: "unitsNumber", type: "number", title: "Number of Units" },
          ],
        },
      ],
    }),
    defineField({
      name: "productImage",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: {
        accept: "image/png",
      },
      fields: [
        {
          name: "alt",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "similarProducts",
      title: "Similar Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      validation: (rule) => rule.max(5),
    }),
    defineField({
      name: "unitsSold",
      title: "Units Sold",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
};

export default product;
