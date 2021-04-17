import React, { useEffect } from 'react';

// store
import { useStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { PostListContainer } from 'containers/post/list';

const Page = (): React.ReactElement => {
  const { postStore } = useStore();

  useEffect(() => {
    postStore.onGetPosts({});
  }, []);

  return (
    <>
      <Helmet helmet={helmet({ title: '블로그 - AlpoxDev' })} />
      <PostListContainer />
    </>
  );
};

export default Page;
