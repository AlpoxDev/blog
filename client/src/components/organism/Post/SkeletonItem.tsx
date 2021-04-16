import React from 'react';
import _ from 'lodash';

import ContentLoader from 'react-content-loader';
import styled from '@emotion/styled';

import { Content } from 'components/atom';
import { spacing } from 'common';

import { getRandomArbitrary, getRandomInt } from 'utils';

export const SkeletonPostItem = (): React.ReactElement => {
  const getTitleWidth = getRandomInt(40, 70);

  return (
    <SkeletonPostItemStyle location={{ bottom: spacing(8) }}>
      <SkeletonLoader>
        <Thumbnail />
        <Title x="1rem" y="13.5rem" rx="4" ry="4" width={`${getTitleWidth}%`} />
      </SkeletonLoader>

      <SubtitleWrapper option="flex" location={{ padding: { left: spacing(4), right: spacing(4) } }}>
        <Subtitle width={getRandomArbitrary(2, 4)} />
        <Subtitle width={getRandomArbitrary(2, 4)} />
        <Subtitle width={getRandomArbitrary(2, 4)} />
        <Subtitle width={getRandomArbitrary(2, 4)} />
        <Subtitle width={getRandomArbitrary(2, 4)} />
        <Subtitle width={getRandomArbitrary(2, 4)} />
        <Subtitle width={getRandomArbitrary(2, 4)} />
      </SubtitleWrapper>
    </SkeletonPostItemStyle>
  );
};

const SkeletonPostItemStyle = styled(Content)`
  width: 32%;
  height: 18.75rem;
  /* padding: 1.25rem; */

  /* box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.15); */
  cursor: pointer;

  @media (max-width: 1024px) {
    width: 48%;
  }

  @media (max-width: 645px) {
    width: 100%;
  }
`;

const SkeletonLoader = styled(ContentLoader)`
  width: 100%;
  height: 80%;
`;

const Thumbnail = styled.rect`
  width: 100%;
  height: 12.5rem;
`;

const Title = styled.rect`
  /* width: 70%; */
  height: 1.2rem;
`;

const SubtitleWrapper = styled(Content)``;

const Subtitle = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}rem`};
  height: 0.9rem;
  margin-right: 0.2rem;
  margin-bottom: 0.4rem;

  background-color: #f5f6f7;
  border-radius: 4px;
`;
