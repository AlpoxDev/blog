import React from 'react';

// store
import { observer } from 'mobx-react-lite';
import { useStore, initializeStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { PostDetailContainer } from 'containers/post/detail';

const Page = (): React.ReactElement => {
  const { postStore } = useStore();
  const { post } = postStore;

  return (
    <>
      <Helmet helmet={helmet({ title: `${post.data?.title} | AlpoxDev`, image: post.thumbnail })} />
      <PostDetailContainer />
    </>
  );
};

export default observer(Page);

Page.getInitialProps = async ({ query }) => {
  const id = query.id;
  const store = initializeStore(true);

  const { postStore } = store;
  await postStore.onGetPost({ id });

  return { store };
};
