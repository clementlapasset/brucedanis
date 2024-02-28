export default {
  name: "illustrationsBlock",
  title: "Bloc d'illustrations",
  type: "document",
  fields: [
    {
      name: "number",
      title: "Numéro du bloc",
      type: "number",
      validation: (Rule) => Rule.required(),
    },
  ],
};
