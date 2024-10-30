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
      name: "priceBundle",
      title: "Bundle Price",
      type: "array",
      validation: (Rule) => Rule.required().min(1),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "unitPrice",
              type: "number",
              title: "Price per Unit",
              validation: (Rule) => Rule.positive(),
            },
            {
              name: "unitsNumber",
              type: "number",
              title: "Number of Units",
              validation: (Rule) => Rule.positive(),
            },
            {
              name: "bundleURL",
              type: "url",
              title: "Bundle URL",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "informations",
      title: "Informations",
      type: "object",
      fields: [
        {
          options: {
            list: ['break', 'readMore']
          },
          name: "explicacao",
          type: "text",
          title: "O que é e para que serve?",
        },
        { name: "beneficios", type: "text", title: "Benefícios" },
        { name: "composicao", type: "text", title: "Composição" },
        { name: "uso", type: "text", title: "Como Usar" },
        { name: "advertencias", type: "text", title: "Advertências" },
      ],
    }),
    defineField({
      name: "productImage",
      title: "Image",
      type: "image",
      validation: (Rule) => Rule.required(),
      options: {
        accept: "image/png, image/jpeg",
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
      name: "productImages",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            accept: "image/png, image/jpeg", 
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              validation: (Rule) =>
                Rule.required().warning("Alt text é recomendado para acessibilidade."),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).warning("Adicione pelo menos uma imagem."),
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
