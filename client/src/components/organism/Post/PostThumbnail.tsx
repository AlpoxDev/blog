import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';

import { Text, Profile, Content, Portal } from 'components/atom';
import { IPost } from 'common/models';
import { spacing } from 'common';
import { parseDate, parseHtmlToBlob } from 'utils';

export interface PostThumbnailProps {
  post: IPost;
  onGetImage?: (blob: Blob) => void;
}

export const PostThumbnail = ({ post, onGetImage }: PostThumbnailProps): React.ReactElement => {
  const [image, setImage] = useState<Blob | null>(null);

  const onLoad = useCallback(async () => {
    const response = await parseHtmlToBlob('post-thumbnail');
    setImage(response);
  }, [post]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    onLoad();
  }, [typeof window]);

  useEffect(() => {
    if (image) onGetImage(image);
  }, [image]);

  return (
    <ThumbnailPortal>
      <PostThumbnailStyle option="flex-column" id="post-thumbnail">
        <PostContentWrapper option="flex-column">
          <TitleWrapper>
            <Text.H1 fontSize="4.2rem" fontFamily="inter">
              {post.title}
            </Text.H1>
          </TitleWrapper>

          <BottomWrapper option="flex-row">
            <Profile width={30} height={30} />
            <UserWrapper location={{ left: spacing(2) }}>
              <Text.Content fontSize={'1.35rem'}>{post.user?.nickname}</Text.Content>
              <Text.Label location={{ top: spacing(1) }}>
                {parseDate(post.createdAt)}
                {' 작성'}
              </Text.Label>
            </UserWrapper>
          </BottomWrapper>
        </PostContentWrapper>
      </PostThumbnailStyle>
    </ThumbnailPortal>
  );
};

const ThumbnailPortal = styled(Portal)`
  opacity: 0;
`;

const PostThumbnailStyle = styled(Content)`
  width: 1200px;
  height: 627px;
  background-color: #f5f6f7;

  align-items: center;
  justify-content: center;
`;

const PostContentWrapper = styled(Content)`
  width: 1080px;
  height: 540px;
  padding: 3.25rem 4rem;

  justify-content: space-between;

  background-color: #fff;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
`;

const TitleWrapper = styled(Content)``;

const BottomWrapper = styled(Content)`
  align-items: center;
`;

const UserWrapper = styled(Content)`
  flex: 1;
`;
