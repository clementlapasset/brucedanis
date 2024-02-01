export default {
  name: "category",
  title: "Catégories",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nom",
      description: "Nom de la catégorie",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
};
