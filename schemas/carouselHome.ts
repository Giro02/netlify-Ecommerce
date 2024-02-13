import { defineField } from "sanity";

const carousel = {
    name: "carousel-home",
    title: "Carousel Home",
    type: "document",
    fields: [

      defineField({
        name: "homeimages",
        title: "Home Images",
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

export default carousel;
