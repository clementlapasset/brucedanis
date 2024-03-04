import { Html, Head, Main, NextScript } from "next/document";
import Document from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html lang="fr">
        <Head>
          <meta
            name="description"
            content="Illustrateur drolatique basé à Marseille"
          />
          <meta
            name="og:description"
            content="Illustrateur drolatique basé à Marseille"
          />
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
          <meta
            name="twitter:description"
            content="Illustrateur drolatique basé à Marseille"
          />
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
}
