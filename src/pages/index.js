import { getClient } from "../../sanity/lib/client";
import { token } from "../../sanity/lib/token";
import { ILLUSTRATIONS_QUERY } from "../../sanity/lib/queries";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyle";
import dynamic from "next/dynamic";
import IllustrationModal from "@/components/IllustrationModal";
import Modal from "react-modal";
import Illustrations from "@/components/Illustrations";
import HomeFooter from "@/components/HomeFooter";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const IllustrationsPreview = dynamic(() =>
  import("@/components/sanityPreview/IllustrationsPreview")
);

export default function Home({ illustrations, draftMode }) {
  const router = useRouter();
  const [illustration, setIllustration] = useState();
  const [illustrationIndex, setIllustrationIndex] = useState();

  useEffect(() => {
    const findIllustration = (illustration) =>
      illustration.slug.current === router.query.illustrationSlug;
    setIllustration(illustrations.find(findIllustration));
    setIllustrationIndex(illustrations.findIndex(findIllustration));
    console.log(illustrationIndex);
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {draftMode ? (
        <IllustrationsPreview illustrations={illustrations} />
      ) : (
        <Illustrations illustrations={illustrations} />
      )}
      <HomeFooter />
      <Modal
        isOpen={!!router.query.illustrationSlug}
        onRequestClose={() => router.push("/")}
        contentLabel="Post modal"
        ariaHideApp={false}
      >
        <IllustrationModal
          pathname={router.pathname}
          illustration={illustration}
          setIllustrationIndex={setIllustrationIndex}
        />
      </Modal>
    </ThemeProvider>
  );
}

export const getStaticProps = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined);
  const illustrations = await client.fetch(ILLUSTRATIONS_QUERY);

  return {
    props: {
      illustrations,
      draftMode,
      token: draftMode ? token : "",
    },
  };
};
