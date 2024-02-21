export default {
  name: "vacation",
  title: "Message de vacances",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Message",
      description:
        "Le message sera visible sous le bouton Commander tant qu'il sera publié. Bonnes vacances !",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
  ],
};
