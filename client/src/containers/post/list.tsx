import React, { useEffect, useCallback } from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Text, Content } from 'components/atom';
import { PostList, SkeletonPostList } from 'components/organism';
import { spacing } from 'common';

const Container = (): React.ReactElement => {
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
      <PostListTopWrapper option="flex">
        <Text.H1 fontFamily="inter" location={{ left: spacing(4), right: spacing(4) }}>
          Hi, This is Alpox.
        </Text.H1>
      </PostListTopWrapper>
      {posts.isReady && <PostList posts={[...posts.toJSON().data]} />}
      {!posts.isReady && <SkeletonPostList count={9} />}
    </>
  );
};

export const PostListContainer = observer(Container);

const PostListTopWrapper = styled(Content)`
  width: 1024px;
  margin: 0 auto;

  padding: 0 1.5rem;
  padding-top: 6rem;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0 2rem;
    padding-top: 4rem;
  }
`;
