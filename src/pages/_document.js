import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta name="description" content="Bruce d'Anis" />
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
