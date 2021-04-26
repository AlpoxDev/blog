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

  const { tagStore } = useStore();
  const { tag } = tagStore;

  const onGetTag = useCallback(() => {
    tagStore.onGetTag({ id });
  }, [id]);

  useEffect(() => {
    onGetTag();
  }, [onGetTag]);

  console.log(tag.toJSON());

  return (
    <>
      <TagDetailWrapper>
        <Text.H1>{tag.data?.name} 태그</Text.H1>
      </TagDetailWrapper>

      {tag.isReady && <PostList posts={[...tag.data?.posts]} />}
      {!tag.isReady && <SkeletonPostList count={9} />}
    </>
  );
};

export const TagDetailContainer = observer(Container);

const TagDetailWrapper = styled(Content)`
  max-width: 43.75rem;
  margin: 0 auto;
  padding: 3rem 1.25rem 0;

  @media (max-width: 43.75rem) {
    width: 100%;
    padding: 2rem 1rem 0;
  }
`;
