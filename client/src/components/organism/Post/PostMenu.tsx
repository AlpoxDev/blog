import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Content } from 'components/atom';
import { Dropdown } from 'components/molecule';

// common
import { IPost } from 'common/models';

// hooks
import { useModal } from 'hooks';

export interface PostMenuProps {
  post: IPost;
  onDeletePost(): void;
}

export const ITEMS: string[] = ['카테고리 연결', '시리즈 연결', '수정', '삭제'];

export const PostMenu = observer(({ post, onDeletePost }: PostMenuProps): React.ReactElement | null => {
  const router = useRouter();
  const id = router.query?.id;

  const connectCategoryModal = useModal('connectCategory');
  const connectSeriesModal = useModal('connectSeries');

  const onSelectItem = useCallback(
    (item: string) => {
      switch (item) {
        case '카테고리 연결':
          connectCategoryModal.onCreateModal({ post });
          break;
        case '시리즈 연결':
          connectSeriesModal.onCreateModal({ postId: post.id, series: post?.series || null });
          break;
        case '수정':
          router.replace(`/blog/${id}/update`);
          break;
        case '삭제':
          onDeletePost();
          break;
      }
    },
    [router, post, connectCategoryModal, connectSeriesModal],
  );

  const { authStore } = useStore();
  const { me } = authStore;

  const isMenu = useMemo(() => {
    const userId = me.data?.id;
    const postUserId = post?.user?.id;

    return userId === postUserId;
  }, [me.data, post]);

  if (!me.isReady || !isMenu) return null;

  return (
    <PostMenuStyle>
      <PostMenuDropdown position="right" items={ITEMS} onSelectItem={onSelectItem}>
        <DotWrapper option="flex-row">
          <Dot />
          <Dot />
          <Dot />
        </DotWrapper>
      </PostMenuDropdown>
    </PostMenuStyle>
  );
});

const PostMenuStyle = styled(Content)`
  position: absolute;
  top: 0;
  right: 0;
`;

const PostMenuDropdown = styled(Dropdown)`
  .dropdown-wrapper {
    width: 9.5rem;
    p {
      width: 100%;
      font-size: 0.875rem;
    }
  }
`;

const DotWrapper = styled(Content)`
  width: 1.2rem;
  height: 1.2rem;
`;

const Dot = styled.div`
  width: 0.25rem;
  height: 0.25rem;
  margin-right: 0.125rem;
  border-radius: 100%;
  background-color: #252525;
  cursor: pointer;
`;
