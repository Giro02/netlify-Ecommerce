import { defineField } from "sanity";

const banners = {
    name: "banners",
    title: "Banners",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
          }),

      defineField({
        name: "banners",
        title: "Banners",
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
    ]

};

export default banners;
