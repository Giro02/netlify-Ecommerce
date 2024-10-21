import { defineField } from "sanity";

const category = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleChinese",
      title: "Chinese Title",
      type: "string",
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
      type: "text",
    }),
    defineField({
      name: "ogdescription",
      title: "Open Graph Description",
      type: "string",
    }),
    defineField({
      name: "categoryImage",
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
      name: "highlightedProducts",
      title: "Highlighted Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "product",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().max(15).error("Maximum of 15 items"),
    }),
  ],
};

export default category;
