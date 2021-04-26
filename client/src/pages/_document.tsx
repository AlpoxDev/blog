import Document, { Html, Head, Main, NextScript } from 'next/document';

const isPROD = process.env.NODE_ENV === 'production';
const TRACKING_ID = 'G-QSSPQND4ZB';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* init style */}
          <link rel="stylesheet prefetch" href="/reset.css" />
          <link rel="stylesheet prefetch" href="/index.css" />

          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css" rel="stylesheet" type="text/css" />

          {/* NAVER Webmaster tool */}
          {isPROD && <meta name="naver-site-verification" content="02629eb57d12b033663bc54feeac38f33247361b" />}

          {/* Google Analytics  */}
          {isPROD && <script async src={'https://www.googletagmanager.com/gtag/js?id=' + TRACKING_ID} />}
          {isPROD && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());
								gtag('config', '[Tracking ID]');
							`,
              }}
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />

          <div id="portal" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
