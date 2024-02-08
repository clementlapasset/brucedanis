import { getClient } from "../../sanity/lib/client";
import { token } from "../../sanity/lib/token";
import { ILLUSTRATIONS_QUERY, EVENTS_QUERY } from "../../sanity/lib/queries";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyle";
import dynamic from "next/dynamic";
import IllustrationModal from "@/components/IllustrationModal";
import IllustrationsGrid from "@/components/IllustrationsGrid";
import HomeFooter from "@/components/HomeFooter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const IllustrationsPreview = dynamic(() =>
  import("@/components/sanityPreview/IllustrationsPreview")
);

export default function Home({ illustrations, draftMode, events }) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [illustration, setIllustration] = useState();
  const [illustrationsByCategory, setIllustrationsByCategory] = useState([]);
  const [illustrationIndex, setIllustrationIndex] = useState();

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

  const router = useRouter();

  // useEffect(() => {
  //   const isIllustrationSlug = !!router.query.illustrationSlug;
  //   if (isIllustrationSlug) {
  //     const findIllustration = (illustration) =>
  //       illustration.slug.current === router.query.illustrationSlug;
  //     const illustration = illustrations.find(findIllustration);
  //     setIllustration(illustration);
  //     const illustrationsByCategory = illustrations.filter(
  //       (illustrations) =>
  //         illustrations.category._ref === illustration?.category._ref
  //     );
  //     setIllustrationsByCategory(illustrationsByCategory);
  //     setIllustrationIndex(illustrationsByCategory.findIndex(findIllustration));
  //     setIsModal(isIllustrationSlug);
  //   } else {
  //     setIsModal(false);
  //   }
  // }, [router]);

  return (
    <>
      {/* // <ThemeProvider theme={theme}> */}
      {/* <GlobalStyle /> */}
      {draftMode ? (
        <IllustrationsPreview illustrations={illustrations} />
      ) : (
        isPageLoaded && <IllustrationsGrid illustrations={illustrations} />
      )}
      <HomeFooter events={events} isPageLoaded={isPageLoaded} />
      {/* {isModal && (
        <IllustrationModal
          illustration={illustration}
          handlePrevNext={handlePrevNext}
        />
      )} */}
      {/* </ThemeProvider> */}
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
