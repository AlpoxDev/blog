import React, { useCallback, useEffect } from 'react';

// store
import { useStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { PostListContainer } from 'containers/post/list';

const Page = (): React.ReactElement => {
  const { postStore } = useStore();
  const { posts } = postStore;

  const onGetPosts = useCallback(() => {
    if (posts.isReady) return;

    postStore.onGetPosts({});
  }, [posts.isReady]);

  useEffect(() => {
    onGetPosts();
  }, [onGetPosts]);

  return (
    <>
      <Helmet helmet={helmet({ title: '블로그 - AlpoxDev' })} />
      <PostListContainer />
    </>
  );
};

export default Page;
