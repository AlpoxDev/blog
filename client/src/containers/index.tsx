import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Div100vh from 'react-div-100vh';

import { Text, Profile, RightArrowIcon } from 'components/atom';

export const LandingContainer = (): React.ReactElement => {
  const [count, setCount] = useState<number>(5);
  const router = useRouter();

  const onClickBlog = useCallback(() => {
    router.push('/blog');
  }, [router]);

  const onClickProfile = useCallback(() => {
    router.push('/me');
  }, [router]);

  useEffect(() => {
    setInterval(() => setCount((count: number) => count - 1), 1000);
  }, []);

  useEffect(() => {
    if (count > 0) return;

    // onClickBlog();
  }, [count]);

  return (
    <LandingLayout>
      <Cover>
        <CoverTitleWrapper>
          <Text.H1 fontFamily="inter">Hi, This is Alpox.</Text.H1>

          <CoverContentWrapper onClick={onClickBlog}>
            <RightArrow />
            <Text.H2 location={{ left: '4px' }} fontFamily="inter">
              {count}
            </Text.H2>
          </CoverContentWrapper>
        </CoverTitleWrapper>

        <Text.Content fontFamily="inter" lineHeight={'1.8rem'} location={{ top: '4rem' }} fontWeight={300}>
          <Text.Accent underline pointer fontWeight={500} onClick={onClickBlog}>
            {' '}
            A Blog
          </Text.Accent>{' '}
          {'probably.\nI will share about tech, thinking, self-development related to my interest.'}
        </Text.Content>
      </Cover>

      <Portfolio onClick={onClickProfile}>
        <Profile width={155} height={155} />

        <Text.Content underline fontWeight={600} fontFamily="inter" location={{ top: '1.6rem' }}>
          Click!
        </Text.Content>
      </Portfolio>
    </LandingLayout>
  );
};

const LandingLayout = styled(Div100vh)`
  width: 100%;
  padding: 0 23px;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
`;

const Cover = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CoverTitleWrapper = styled.div``;

const CoverContentWrapper = styled.div`
  margin-top: 0.875rem;
  margin-right: 0.35rem;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;

const RightArrow = styled(RightArrowIcon)`
  display: block;
  margin-bottom: 6px;

  width: 35px;
  height: 23.7px;
  cursor: pointer;

  @media screen and (max-width: 1080px) {
    width: 30px;
    height: 20.3px;
    margin-bottom: 1px;
  }
`;

const Portfolio = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;
