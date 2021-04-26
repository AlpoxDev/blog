import Head from 'next/head';
import { ThemeProvider } from '@emotion/react';

import { initializeStore, useStore } from 'stores';

import { DefaultHelmet, Layout } from 'components/molecule';
import { theme } from 'common/theme';
import { getSnapshot } from 'mobx-state-tree';

export default function App({ Component, pageProps, initState }): React.ReactElement {
  useStore(initState);

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

App.getInitialProps = async (props) => {
  const { Component, ctx } = props;

  // 서버인가요?
  const isServer = typeof window === 'undefined';

  // store (첫 store), pageProps(페이지에 전달할 props)
  let store = initializeStore(isServer, null);
  let pageProps: any = {};

  // 서버사이드고 getInitialProps가 있을경우 context를 넘겨준다.
  if (Component.getInitialProps && isServer) {
    pageProps = await Component.getInitialProps(ctx);
    if (pageProps.store) store = pageProps.store;
  }

  // 서버일 경우 처음 데이터 -> category, tagStore를 가져온다
  if (isServer) {
    const { categoryStore, tagStore } = store;
    await Promise.all([categoryStore.onGetCategorys({}), tagStore.onGetTags({})]);
  }

  // snapShot과 pageProps를 전달한다
  return {
    initState: getSnapshot(store),
    pageProps,
  };
};
