import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

// store
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';

// components
import { Text, Content } from 'components/atom';
import { spacing } from 'common';
import { PostContent } from 'components/organism';

const Container = (): React.ReactElement => {
  const router = useRouter();
  const { query } = router;
  const id = query?.id;

  const { postStore } = useStore();
  const { post } = postStore;

  useEffect(() => {
    if (id && !post.isReady) {
      postStore.onGetPost({ id });
    }

    return () => post.onDefault();
  }, [id]);

  return (
    <PostDetailWrapper>
      <Text.H1>{post.data?.title}</Text.H1>
      <Text.H3 location={{ top: spacing(8) }}>{post.data?.subtitle}</Text.H3>
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
