import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { IPost } from 'common/models';
import { spacing } from 'common';

import { Text, Content } from 'components/atom';

export interface PostItemProps {
  post: IPost;
}

export const PostItem = ({ post }: PostItemProps): React.ReactElement => {
  const router = useRouter();

  const onClickItem = useCallback(() => {
    router.push(`/blog/${post.id}`);
  }, [router, post]);

  return (
    <PostItemStyle location={{ bottom: spacing(8) }} onClick={onClickItem}>
      <Text.H1 fontSize={'1.25rem'}>{post.title}</Text.H1>
      <Text.Content fontSize={'1rem'} location={{ top: spacing(2) }}>
        {post.subtitle}
      </Text.Content>
    </PostItemStyle>
  );
};

const PostItemStyle = styled(Content)`
  width: 32%;
  min-height: 300px;
  padding: 1.25rem;

  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 48%;
  }

  @media (max-width: 645px) {
    width: 100%;
  }
`;
