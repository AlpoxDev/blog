import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

// store
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';

// components
import { Content } from 'components/atom';
import { PostContent, PostHeader } from 'components/organism';

const Container = (): React.ReactElement => {
  const router = useRouter();
  const { query } = router;
  const id = query?.id;

  const { postStore } = useStore();
  const { post, deletePost } = postStore;

  const onDeletePost = useCallback(() => {
    if (id && post.isReady) {
      postStore.onDeletePost({ id });
    }
  }, [id, postStore, post.isReady]);

  useEffect(() => {
    if (id && !post.isReady) {
      postStore.onGetPost({ id });
    }

    return () => post.onDefault();
  }, [id]);

  useEffect(() => {
    if (!deletePost.isReady) return;

    router.replace('/blog');
    return () => {
      deletePost.onDefault();
      postStore.onGetPosts({});
    };
  }, [deletePost.isReady]);

  return (
    <PostDetailWrapper>
      <PostHeader post={post.data || null} onDeletePost={onDeletePost} />
      <PostContent content={post.data?.content} />
    </PostDetailWrapper>
  );
};

export const PostDetailContainer = observer(Container);

const PostDetailWrapper = styled(Content)`
  max-width: 43.75rem;
  margin: 0 auto;
  padding: 3rem 1.25rem 0;

  @media (max-width: 43.75rem) {
    width: 100%;
    padding: 2rem 1rem 0;
  }
`;
