import { getClient } from "../../sanity/lib/client";
import { token } from "../../sanity/lib/token";
import { ILLUSTRATIONS_QUERY, EVENTS_QUERY } from "../../sanity/lib/queries";
import { ThemeProvider, styled } from "styled-components";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyle";
import dynamic from "next/dynamic";
import IllustrationModal from "@/components/IllustrationModal";
import Illustrations from "@/components/Illustrations";
import HomeFooter from "@/components/HomeFooter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100vw",
    height: "100vh",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
  },
};

const IllustrationsPreview = dynamic(() =>
  import("@/components/sanityPreview/IllustrationsPreview")
);

export default function Home({ illustrations, draftMode, events }) {
  const router = useRouter();
  const [illustration, setIllustration] = useState();
  const [illustrationsByCategory, setIllustrationsByCategory] = useState([]);
  const [illustrationIndex, setIllustrationIndex] = useState();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    const onPageLoad = () => {
      console.log("page loaded");
      setIsPageLoaded(true);
    };
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  useEffect(() => {
    const findIllustration = (illustration) =>
      illustration.slug.current === router.query.illustrationSlug;
    const illustration = illustrations.find(findIllustration);
    setIllustration(illustration);
    const illustrationsByCategory = illustrations.filter(
      (illustrations) =>
        illustrations.category._ref === illustration?.category._ref
    );
    setIllustrationsByCategory(illustrationsByCategory);
    setIllustrationIndex(illustrationsByCategory.findIndex(findIllustration));
  }, [router]);

  function handleIllustrationsNav(way) {
    // This is the way
    let slug = 0;
    if (way === "next") {
      const nextIndex =
        illustrationIndex + 1 < illustrationsByCategory.length
          ? illustrationIndex + 1
          : 0;
      slug = illustrationsByCategory[nextIndex].slug.current;
    }
    if (way === "prev") {
      const prevIndex =
        illustrationIndex - 1 >= 0
          ? illustrationIndex - 1
          : illustrationsByCategory.length - 1;
      slug = illustrationsByCategory[prevIndex].slug.current;
    }
    router.push(`/?illustrationSlug=${slug}`);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {draftMode ? (
        <IllustrationsPreview illustrations={illustrations} />
      ) : (
        isPageLoaded && <Illustrations illustrations={illustrations} />
      )}
      <HomeFooter events={events} isPageLoaded={isPageLoaded} />
      <IllustrationModal
        pathname={router.pathname}
        illustration={illustration}
        handlePrevNext={handleIllustrationsNav}
      />
    </ThemeProvider>
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
