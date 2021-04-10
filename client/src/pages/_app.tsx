import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';

import { DefaultHelmet, Layout } from 'components/molecule';
import { theme } from 'common/theme';

export default function App({ Component, pageProps }): React.ReactElement {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
      </Head>

      <DefaultHelmet />

      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
