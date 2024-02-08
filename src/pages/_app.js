import { lazy, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import GlobalStyle from "@/styles/globalStyle";

const PreviewProvider = lazy(() =>
  import("@/components/sanityPreview/PreviewProvider")
);
const VisualEditing = lazy(() =>
  import("@/components/sanityPreview/VisualEditing")
);

export default function App({ Component, pageProps }) {
  const { draftMode, token } = pageProps;

  return draftMode ? (
    <PreviewProvider token={token}>
      <Component {...pageProps} />
      <Suspense>
        <VisualEditing />
      </Suspense>
    </PreviewProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <Component {...pageProps} />
    </ThemeProvider>
  );
}
