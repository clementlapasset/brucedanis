export default {
  name: "event",
  title: "Expositions",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Nom du lieu",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Lien associé",
      description: "Lien vers le site ou la localisation du lieu",
      name: "href",
      type: "url",
    },
  ],
};
