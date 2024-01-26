import { lazy, Suspense } from "react";

const PreviewProvider = lazy(() => import("@/components/PreviewProvider"));
const VisualEditing = lazy(() => import("@/components/VisualEditing"));

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
    <Component {...pageProps} />
  );
}
