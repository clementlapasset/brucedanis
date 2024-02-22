import { getClient } from "../../sanity/lib/client";
import { token } from "../../sanity/lib/token";
import { ILLUSTRATIONS_QUERY, EVENTS_QUERY } from "../../sanity/lib/queries";
import dynamic from "next/dynamic";
import IllustrationsGrid from "@/components/IllustrationsGrid";
import HomeFooter from "@/components/HomeFooter";
import { useEffect, useState } from "react";
import Head from "next/head";

const IllustrationsPreview = dynamic(() =>
  import("@/components/sanityPreview/IllustrationsPreview")
);

export default function Home({ illustrations, draftMode, events }) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const onPageLoad = () => {
      setIsPageLoaded(true);
    };
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <>
      {/* <Head>
        <meta property="og:title" content="Bruce d'Anis" key="title" />
        <meta name="og:description" content="Bruce d'Anis" />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="brucedanis.shop" />
        <meta property="og:image" content="brucedanis.shop/signature.jpeg" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
        <meta name="twitter:image" content="<generated>" />
        <meta name="twitter:image:type" content="<generated>" />
        <meta name="twitter:image:width" content="<generated>" />
        <meta name="twitter:image:height" content="<generated>" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bruce d'Anis" />
        <meta name="twitter:url" content="brucedanis.shop" />
        <meta name="twitter:description" content="Bruce d'Anis" />
        <meta property="og:image:alt" content="Bruce d'Anis" />
        <meta property="twitter:image:alt" content="Bruce d'Anis" />
      </Head> */}
      {draftMode ? (
        <IllustrationsPreview illustrations={illustrations} />
      ) : (
        isPageLoaded && <IllustrationsGrid illustrations={illustrations} />
      )}
      <HomeFooter events={events} isPageLoaded={isPageLoaded} />
    </>
  );
}

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined);
  const illustrations = await client.fetch(ILLUSTRATIONS_QUERY);
  const events = await client.fetch(EVENTS_QUERY);

  return {
    props: {
      illustrations,
      events,
      draftMode,
      token: draftMode ? token : "",
    },
  };
};
