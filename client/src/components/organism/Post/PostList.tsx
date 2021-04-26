import React from 'react';
import styled from '@emotion/styled';

import { IPost } from 'common/models';

import { Content } from 'components/atom';
import { PostItem } from 'components/organism';

export interface PostListProps {
  posts: IPost[];
}

export const PostList = ({ posts }: PostListProps): React.ReactElement => {
  const postList = posts.map((post: IPost) => <PostItem key={post.id} post={post} />);

  return <PostListStyle option="flex-row">{postList}</PostListStyle>;
};

const PostListStyle = styled(Content)`
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 4rem;
  padding: 0 1.5rem;

  @media (max-width: 1024px) {
    padding: 0 2rem;
  }
`;
