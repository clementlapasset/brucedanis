export default {
  name: 'product',
  title: 'Illustrations',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: "URL de la page de l'illustration",
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
      },
    },
    {
      name: 'mainImage',
      title: 'Illustration principale',
      description: "Image de l'illustration visible sur la page d'accueil",
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'position',
      title: 'Position',
      type: 'object',
      fields: [
        {
          name: 'columnStart',
          type: 'number',
          title: 'Commence à la colonne',
          options: {
            list: [1, 2, 3, 4, 5, 6],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'columnEnd',
          type: 'number',
          title: 'Termine à la colonne',
          options: {
            list: [2, 3, 4, 5, 6, 7],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'rowStart',
          type: 'number',
          title: 'Commence à la ligne',
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'rowEnd',
          type: 'number',
          title: 'Termine à la ligne',
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
  ],
}
