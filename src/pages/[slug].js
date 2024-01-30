// import dynamic from "next/dynamic";

import { getClient } from "../../sanity/lib/client";
import { token } from "../../sanity/lib/token";
import {
  ILLUSTRATIONS_SLUG_QUERY,
  ILLUSTRATION_QUERY,
} from "../../sanity/lib/queries";

// const PostPreview = dynamic(() => import("@/components/PostPreview"));

export default function SinglePost({ illustration }) {
  // return props.draftMode ? (
  //   <PostPreview post={props.post} params={props.params} />
  // ) : (
  return <h1>{illustration.title}</h1>;
  // );
}

export const getStaticProps = async ({ params = {}, draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined);
  const illustration = await client.fetch(ILLUSTRATION_QUERY, params);

  return {
    props: {
      illustration,
      params,
      draftMode,
      token: draftMode ? token : "",
    },
  };
};

// Prepare Next.js to know which routes already exist
export const getStaticPaths = async () => {
  const paths = await getClient().fetch(ILLUSTRATIONS_SLUG_QUERY);

  return { paths, fallback: true };
};
