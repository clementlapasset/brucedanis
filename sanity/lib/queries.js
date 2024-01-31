import { groq } from "next-sanity";

export const ILLUSTRATIONS_QUERY = groq`*[_type == "illustration" && defined(slug)] {
title,
slug,
position,
mainImage {
  asset->{
    ...,
    metadata
  }
}}`;

export const ILLUSTRATIONS_SLUG_QUERY = groq`*[_type == "illustration" && defined(slug.current)][]{
  "params": { "slug": slug.current }
}`;

export const ILLUSTRATION_QUERY = groq`*[_type == "illustration" && slug.current == $slug][0]`;
