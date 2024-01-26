import { getClient } from "../../sanity/lib/client";
import { token } from "../../sanity/lib/token";
import { ILLUSTRATIONS_QUERY } from "../../sanity/lib/queries";
import Illustrations from "@/components/Illustrations";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyle";
import dynamic from "next/dynamic";

const IllustrationsPreview = dynamic(() =>
  import("@/components/IllustrationsPreview")
);

export default function Home({ illustrations, draftMode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {draftMode ? (
        <IllustrationsPreview illustrations={illustrations} />
      ) : (
        <Illustrations illustrations={illustrations} />
      )}
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
