import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import { IPost } from 'common/models';
import { spacing } from 'common';

import { Text, Image, Content } from 'components/atom';

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
      <PostImage src={post.thumbnail || '/images/me-emoji.png'} width={'100%'} height={'12.5rem'} objectFit="cover" />

      <Text.H1 fontSize={'1.25rem'} location={{ top: spacing(4) }}>
        {post.title}
      </Text.H1>
      <Text.Content fontSize={'1rem'} location={{ top: spacing(4) }}>
        {post.subtitle}
      </Text.Content>
    </PostItemStyle>
  );
};

const PostItemStyle = styled(Content)`
  width: 32%;
  min-height: 300px;
  padding: 1.25rem;

  cursor: pointer;

  @media (max-width: 1024px) {
    width: 48%;
  }

  @media (max-width: 645px) {
    width: 100%;
  }
`;

const PostImage = styled(Image)``;
