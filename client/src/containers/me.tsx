import React from 'react';
import styled from '@emotion/styled';

import { Text, Profile } from 'components/atom';

const Container = (): React.ReactElement => {
  return (
    <MeContent>
      <Profile width={100} height={100} />
    </MeContent>
  );
};

export const MeContainer = Container;

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
