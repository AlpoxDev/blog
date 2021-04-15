import React, { useEffect } from 'react';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { PostList } from 'components/organism';

const Page = (): React.ReactElement => {
  const { postStore } = useStore();
  const { posts } = postStore;

  useEffect(() => {
    postStore.onGetPosts({});
  }, []);

  console.log(postStore.toJSON());

  return (
    <>
      <PostList posts={posts.data} />
    </>
  );
};

export default observer(Page);
