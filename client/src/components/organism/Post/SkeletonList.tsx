import React from 'react';
import _ from 'lodash';
import styled from '@emotion/styled';

import { Content } from '../../atom';
import { SkeletonPostItem } from './SkeletonItem';

export interface SkeletonPostListProps {
  count?: number;
}

export const SkeletonPostList = ({ count = 6 }: SkeletonPostListProps): React.ReactElement => {
  const skeletonList = _.range(count).map((value: number, index: number) => (
    <SkeletonPostItem key={`skeleton-key-${index}`} />
  ));

  return <SkeletonPostListStyle option="flex">{skeletonList}</SkeletonPostListStyle>;
};

const SkeletonPostListStyle = styled(Content)`
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 4rem;
  padding: 0 1.5rem;

  justify-content: space-between;

  @media (max-width: 1024px) {
    padding: 0 2rem;
  }
`;
