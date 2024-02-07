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
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "categoryImage",
      title: "Image",
      type: "image",
      fields: [
        {
          name: "alt",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
  ],
};

export default category;
