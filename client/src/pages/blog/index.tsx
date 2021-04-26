import React from 'react';

// store
import { observer } from 'mobx-react-lite';
import { initializeStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { PostListContainer } from 'containers/post/list';

const Page = (): React.ReactElement => {
  return (
    <>
      <Helmet helmet={helmet({ title: '블로그 | AlpoxDev' })} />
      <PostListContainer />
    </>
  );
};

export default observer(Page);

Page.getInitialProps = async (ctx) => {
  const store = initializeStore(false);

  const { postStore } = store;
  await postStore.onGetPosts({});

  return { store };
};
