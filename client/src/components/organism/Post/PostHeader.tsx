import React from 'react';
import styled from '@emotion/styled';

import type { IPost } from 'common/models';

// components
import { Content, Text } from 'components/atom';
import { PostMenu } from 'components/organism';

// common
import { spacing } from 'common';

export interface PostHeaderProps {
  post?: IPost;
  onDeletePost(): void;
}

export const PostHeader = ({ post, onDeletePost }: PostHeaderProps): React.ReactElement | null => {
  if (!post) return null;

  console.log('Post', post);

  return (
    <PostDetailWrapper location={{ bottom: spacing(6) }}>
      <Content>
        <Text.H1>{post?.title}</Text.H1>
        <Text.H3 location={{ top: spacing(8) }}>{post?.subtitle}</Text.H3>

        {post?.series && <Text.Content location={{ top: spacing(6) }}>시리즈 - {post.series?.title}</Text.Content>}
      </Content>

      <PostMenu post={post} onDeletePost={onDeletePost} />
    </PostDetailWrapper>
  );
};

const PostDetailWrapper = styled(Content)`
  position: relative;
`;
