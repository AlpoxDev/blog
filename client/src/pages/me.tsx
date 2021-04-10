import React from 'react';
import styled from '@emotion/styled';
import Div100vh from 'react-div-100vh';

import { Text, Image } from 'components/atom';
import { Profile as DefaultProfile } from 'components/molecule';

const Page = (): React.ReactElement => {
  return (
    <MeContent>
      <Profile width={120} height={120} />

      <TopSection>
        <Title fontWeight={700} fontFamily="primary">
          Hi, This is Alpox.
        </Title>
      </TopSection>

      <IntroduceSection>
        <MyThumbnail src="/images/profile.jpg" />

        <IntroduceItemSection>
          <Text.H4 point fontFamily="primary" fontWeight={600}>
            Contact
          </Text.H4>

          <Text.Normal margin={{ top: '10px' }}>✓ Email contact@alpox.dev</Text.Normal>
          <Text.Normal margin={{ top: '5px' }}>✓ Phone +82 10-5115-4314</Text.Normal>

          <Text.H4 point fontFamily="primary" fontWeight={600} margin={{ top: '20px' }}>
            Channel
          </Text.H4>

          <Text.Normal margin={{ top: '10px' }}>✓ Github github.com/AlpoxDev</Text.Normal>
          <Text.Normal margin={{ top: '5px' }}>✓ Blog alpox.dev/blog</Text.Normal>
        </IntroduceItemSection>
      </IntroduceSection>
    </MeContent>
  );
};

const MeContent = styled.div`
  width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 23px;
  padding-top: 150px;

  @media screen and (max-width: 650px) {
    width: 100%;
  }
`;

const Profile = styled(DefaultProfile)`
  margin-top: -60px;
  border: 1px solid #111;

  @media screen and (max-width: 1080px) {
    width: 100px;
    height: 100px;
    margin-top: -40px;

    img {
      width: 80px;
      height: 80px;
    }
  }
`;

const Section = styled.section`
  width: 100%;
`;

const TopSection = styled(Section)``;

const Title = styled(Text.H1)`
  margin-top: 50px;
`;

const IntroduceSection = styled(Section)`
  margin-top: 40px;

  display: flex;
  justify-content: space-between;
`;

const IntroduceItemSection = styled(Section)`
  width: 50%;
`;

const MyThumbnail = styled.img`
  width: 45%;
  object-fit: contain;
  border-radius: 8px;
`;

export default Page;
