import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';

import { initializeStore, useStore } from 'stores';

import { DefaultHelmet, Layout } from 'components/molecule';
import { theme } from 'common/theme';
import { getSnapshot } from 'mobx-state-tree';

export default function App({ Component, initState }): React.ReactElement {
  useStore(initState);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
      </Head>

      <DefaultHelmet />

      <ThemeProvider theme={theme}>
        <Layout>
          <Component />
        </Layout>
      </ThemeProvider>
    </>
  );
}

App.getInitialProps = async (props) => {
  const { Component, ctx } = props;

  const isServer = typeof window === 'undefined';
  let store = initializeStore(isServer, null);

  let pageProps: any = {};

  if (Component.getInitialProps && isServer) {
    pageProps = await Component.getInitialProps(ctx);
    if (pageProps.store) store = pageProps.store;
  }

  if (isServer) {
    const { categoryStore, tagStore } = store;
    await Promise.all([categoryStore.onGetCategorys({}), tagStore.onGetTags({})]);
  }

  return {
    initState: getSnapshot(store),
    pageProps,
  };
};
