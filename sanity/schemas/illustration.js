export default {
  name: "illustration",
  title: "Illustrations",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL de la page de l'illustration",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
      },
    },
    {
      name: "category",
      title: "Catégorie",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Illustration principale",
      description: "Image de l'illustration visible sur la page d'accueil",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "gifImage",
      title: "GIF de l'illustration",
      type: "image",
    },
    {
      name: "position",
      title: "Position",
      type: "object",
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "columnStart",
          type: "number",
          title: "Commence à la colonne",
          options: {
            list: [1, 2, 3, 4, 5, 6, 7],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "columnEnd",
          type: "number",
          title: "Termine à la colonne",
          options: {
            list: [1, 2, 3, 4, 5, 6, 7],
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "rowStart",
          type: "number",
          title: "Commence à la ligne",
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: "rowEnd",
          type: "number",
          title: "Termine à la ligne",
          validation: (Rule) => Rule.required().min(1),
        },
      ],
    },
    {
      name: "titleImage",
      title: "Titre illustré",
      description: "Image du titre en calligraphie",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "technique",
      title: "Technique",
      description: "Technique utilisée qui apparaitra sous le titre",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "dimensions",
      title: "Dimensions",
      description: "Dimensions du format principal (ex : 10 x 20 cm)",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      type: "number",
      title: "Prix",
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "alternativeFormats",
      title: "Autres formats / couleurs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "variantImage",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "dimensions",
              title: "Dimensions",
              type: "string",
              description:
                'Dimensions associées à cette couleur (ex : "10 x 20 cm")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: "price",
              type: "number",
              title: "Prix",
              validation: (Rule) => Rule.required().min(1),
            },
          ],
        },
      ],
    },
  ],
};
