import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Content, Text } from 'components/atom';
import { PostList, SkeletonPostList } from 'components/organism';

const Container = (): React.ReactElement => {
  const router = useRouter();
  const id = router.query?.id;

  const { categoryStore } = useStore();
  const { subCategory } = categoryStore;

  const onGetCategory = useCallback(() => {
    categoryStore.onGetCategory({ id });
  }, [id]);

  useEffect(() => {
    onGetCategory();
  }, [onGetCategory]);

  return (
    <>
      <CategoryDetailWrapper>
        <Text.H1>{subCategory.data?.name} 카테고리</Text.H1>
      </CategoryDetailWrapper>
      {subCategory.isReady && <PostList posts={[...subCategory.data?.posts]} />}
      {!subCategory.isReady && <SkeletonPostList count={9} />}
    </>
  );
};

export const CategoryDetailContainer = observer(Container);

const CategoryDetailWrapper = styled(Content)`
  max-width: 43.75rem;
  margin: 0 auto;
  padding: 3rem 1.25rem 0;

  @media (max-width: 43.75rem) {
    width: 100%;
    padding: 2rem 1rem 0;
  }
`;
