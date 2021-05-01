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
    <PostNewFooterStyle>
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
  height: 3.75rem;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 9;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  /* box-shadow: 12px 12px 2px 1px rgba(0, 0, 0, 0.2); */
  /* box-shadow: 0 4px -6px 0 rgba(0, 0, 0, 0.15); */
  box-shadow: 0px 1.5px 4px rgba(0, 0, 0, 0.15), 0px -1.5px 4px rgba(0, 0, 0, 0.15);
`;
