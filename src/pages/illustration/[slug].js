import { getClient } from "../../../sanity/lib/client";
import IllustrationsGrid from "@/components/IllustrationsGrid";

import { useEffect } from "react";
import { useRouter } from "next/router";
// import Article from '../../components/Article';
// import Grid, { data } from '../../components/Grid';
import IllustrationModal from "../../components/IllustrationModal";
import {
  ILLUSTRATION_QUERY,
  ILLUSTRATIONS_SLUG_QUERY,
  ILLUSTRATIONS_QUERY,
} from "../../../sanity/lib/queries";

export default function IllustrationPage({ illustration, illustrations }) {
  console.log(illustration.prev);

  // const router = useRouter();

  // useEffect(() => {
  //   router.prefetch("/");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      {/* <Modal
        isOpen={true} // The modal should always be shown on page load, it is the 'page'
        onRequestClose={() => router.push('/', undefined, { scroll: false })}
        contentLabel="Post modal"
      >
        <Article id={articleId} pathname={router.pathname} />
      </Modal> */}

      <IllustrationModal
        illustration={illustration}
        illustrations={illustrations}
      />
      <IllustrationsGrid illustrations={illustrations} />
    </>
  );
}

export const getStaticProps = async ({ params = {} }) => {
  const illustration = await getClient().fetch(ILLUSTRATION_QUERY, params);
  const illustrations = await getClient().fetch(ILLUSTRATIONS_QUERY);
  return {
    props: {
      illustration,
      illustrations,
    },
  };
};

// Prepare Next.js to know which routes already exist
export const getStaticPaths = async () => {
  const paths = await getClient().fetch(ILLUSTRATIONS_SLUG_QUERY);

  return { paths, fallback: true };
};
