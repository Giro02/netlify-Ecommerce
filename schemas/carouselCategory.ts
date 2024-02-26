import { defineField } from "sanity";

const carouselCategory = {
    name: "carouselCategory",
    title: "Carousel Category",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
          }),

      defineField({
        name: "image",
        title: "Imagem",
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
        name: "categ",
        title: "categ",
        type: "reference",
        to: [{ type: "category" }],
        validation: (Rule) => Rule.required(),
      }),
    ]

};

export default carouselCategory;
