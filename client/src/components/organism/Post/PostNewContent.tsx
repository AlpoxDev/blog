import React from 'react';
import styled from '@emotion/styled';

import { Content } from 'components/atom';

export interface PostNewContentProps {
  children: React.ReactNode;
}

export const PostNewContent = ({ children }: PostNewContentProps): React.ReactElement => {
  return <PostNewContentStyle option="flex-row">{children}</PostNewContentStyle>;
};

const PostNewContentStyle = styled(Content)`
  padding-top: 2rem;

  #post-editor {
    flex: 1;
    overflow-x: hidden;
  }

  #post-preview {
    flex: 1;
    overflow-x: hidden;
  }

  @media screen and (max-width: 768px) {
    #post-preview {
      display: none;
    }
  }
`;
