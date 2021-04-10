import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import Div100vh from 'react-div-100vh';

import { Text, RightArrowIcon } from 'components/atom';
import { Profile } from 'components/molecule';

const Page = (): React.ReactElement => {
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
          <CoverTitle black fontSize={4} fontWeight={600} fontFamily="primary">
            Hi, This is Alpox.
          </CoverTitle>

          <CoverContentWrapper onClick={onClickBlog}>
            <RightArrow />
            <CountText fontSize={2} fontFamily="primary">
              {count}
            </CountText>
          </CoverContentWrapper>
        </CoverTitleWrapper>

        <CoverInfo secondary fontSize={1.2} fontWeight={300} fontFamily="primary" lineHeight={27}>
          <CoverInfoAccent fontWeight={600} onClick={onClickBlog}>
            A Blog
          </CoverInfoAccent>{' '}
          {'probably.\nI will share about tech, thinking, self-development related to my interest.'}
        </CoverInfo>
      </Cover>

      <Portfolio onClick={onClickProfile}>
        <PortfolioProfile width={155} height={155} />
        <PortfolioText fontSize={1} fontWeight={600} fontFamily="primary">
          Click!
        </PortfolioText>
      </Portfolio>
    </LandingLayout>
  );
};

export default Page;

const LandingLayout = styled(Div100vh)`
  width: 100%;
  padding: 0 23px;
`;

const Cover = styled.div`
  width: 100%;
  height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 494px) {
    height: 400px;
  }
`;

const CoverTitle = styled(Text.H1)``;

const CoverTitleWrapper = styled.span`
  position: relative;
`;

const CoverContentWrapper = styled.div`
  position: absolute;
  margin-top: 10px;
  right: 10px;

  display: flex;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 494px) {
    margin-top: 25px;
    left: 0px;
    right: auto;
  }
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

const CountText = styled(Text.Normal)`
  margin-left: 8px;

  @media screen and (max-width: 1080px) {
    margin-left: 5px;
  }
`;

const CoverInfo = styled(Text.Normal)`
  margin-top: 100px;

  @media screen and (max-width: 494px) {
    margin-top: 75px;
  }
`;

const CoverInfoAccent = styled(Text.Span)`
  text-decoration: underline;
  cursor: pointer;
`;

const Portfolio = styled.div`
  width: 100%;
  height: 50vh;

  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;

const PortfolioProfile = styled(Profile)`
  margin: 0 auto;
  border: 1px solid #111;
  width: 200px;
  height: 200px;

  overflow: hidden;
  cursor: pointer;
`;

const PortfolioText = styled(Text.Normal)`
  margin-top: 20px;
  text-decoration: underline;
`;
