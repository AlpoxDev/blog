import React from 'react';
import styled from '@emotion/styled';

// components
import { Text, Button, Content } from 'components/atom';
import { spacing } from 'common';

export interface PostNewFooterProps {
  onCreate(): void;
  onCancel(): void;
}

export const PostNewFooter = ({ onCreate, onCancel }: PostNewFooterProps): React.ReactElement => {
  return (
    <PostNewFooterStyle option="flex-row">
      <Content option="flex-row">
        <Button option="flat" location={{ right: spacing(4) }} onClick={onCancel}>
          취소
        </Button>
        <Button option="primary" location={{ right: spacing(4) }} onClick={onCreate}>
          저장
        </Button>
      </Content>
    </PostNewFooterStyle>
  );
};

const PostNewFooterStyle = styled(Content)`
  width: 100%;
  height: 3.5rem;

  align-items: center;
  justify-content: flex-end;

  position: fixed;
  bottom: 0;
`;
