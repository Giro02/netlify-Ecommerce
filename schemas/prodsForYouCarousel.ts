import { defineField } from "sanity";

const forYouCarousel = {
    name: "prodForYouCarousel",
    title: "prodForYouCarousel",
    type: "document",
    fields: [
      defineField({
        name: "products",
        title: "Products",
        type: "array",
        of: [{ type: "reference", to: [{ type: "product" }] }],
      }),
      
    ],
  };
  
  export default forYouCarousel;
  
 