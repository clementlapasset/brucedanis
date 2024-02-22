import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="description" content="Bruce d'Anis" />
        <meta name="og:description" content="Bruce d'Anis" />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://brucedanis.shop" />
        <meta
          property="og:image"
          content="https://brucedanis.shop/signature.jpg"
        />
        <meta
          name="twitter:image"
          content="https://brucedanis.shop/signature.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bruce d'Anis" />
        <meta name="twitter:url" content="https://brucedanis.shop" />
        <meta name="twitter:description" content="Bruce d'Anis" />
        <meta property="og:image:alt" content="Bruce d'Anis" />
        <meta property="twitter:image:alt" content="Bruce d'Anis" />
        <link rel="shortcut icon" href="/favicon.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
