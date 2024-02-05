import { groq } from "next-sanity";

export const ILLUSTRATIONS_QUERY = groq`*[_type == "illustration" && defined(slug)] {
title,
slug,
category,
position,
mainImage {
  asset->{
    ...,
    metadata
  }
},
gifImage {
  asset->{
    ...,
    metadata
  }
},
titleImage {
  asset->{
    ...,
    metadata
  }
},
technique,
dimensions,
price,
description,
"alternativeFormats": alternativeFormats[]{
    variantImage {
      asset->{
        ...,
    metadata
      }
    },
    dimensions,
    price
  }
}`;

export const ILLUSTRATIONS_SLUG_QUERY = groq`*[_type == "illustration" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`;

export const ILLUSTRATION_QUERY = groq`*[_type == "illustration" && slug.current == $slug][0]`;

export const EVENTS_QUERY = groq`*[_type == "event"]`;
