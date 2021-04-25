import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

// store
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';

// components
import { Text, Button, Content } from 'components/atom';
import { PostContent, PostMenu } from 'components/organism';

import { spacing } from 'common';

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
      <PostDetailHeader location={{ bottom: spacing(6) }}>
        <Content>
          <Text.H1>{post.data?.title}</Text.H1>
          <Text.H3 location={{ top: spacing(8) }}>{post.data?.subtitle}</Text.H3>
        </Content>

        <PostMenu post={post.data} onDeletePost={onDeletePost} />
      </PostDetailHeader>

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

const PostDetailHeader = styled(Content)`
  position: relative;
`;

const PostDetailHeaderSection = styled(Content)``;
