import { getClient } from "../../sanity/lib/client";
import { token } from "../../sanity/lib/token";
import { ILLUSTRATIONS_QUERY, EVENTS_QUERY } from "../../sanity/lib/queries";
import dynamic from "next/dynamic";
import IllustrationsGrid from "@/components/IllustrationsGrid";
import HomeFooter from "@/components/HomeFooter";
import { useEffect, useState } from "react";

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
