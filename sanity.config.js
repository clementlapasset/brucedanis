/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.jsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title("Contenu du site")
          .items([
            orderableDocumentListDeskItem({
              type: "illustration",
              title: "Illustrations",
              S,
              context,
            }),
            S.listItem().title("Évenements").child(S.documentTypeList("event")),
            S.listItem()
              .title("Catégories")
              .child(S.documentTypeList("category")),
          ]);
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft",
          disable: "/api/disable-draft",
        },
      },
    }),
  ],
});
