import React from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Text, Content } from 'components/atom';
import { PostList } from 'components/organism';

// common
import { spacing } from 'common/style';

const Container = (): React.ReactElement => {
  const { postStore } = useStore();
  const { posts } = postStore;

  return (
    <>
      <PostListTopWrapper option="flex">
        <Text.H1 fontFamily="inter">Hi, This is Alpox.</Text.H1>
      </PostListTopWrapper>

      <PostList posts={[...posts.toJSON().data]} />
    </>
  );
};

export const PostListContainer = observer(Container);

const PostListTopWrapper = styled(Content)`
  width: 1024px;
  margin: 0 auto;

  padding: 0 1.5rem;
  padding-top: 4rem;

  @media (max-width: 1024px) {
    padding: 0 2rem;
    padding-top: rem;
  }
`;
