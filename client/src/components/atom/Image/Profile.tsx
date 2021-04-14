import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useMedia } from 'react-use';

import { Image } from './Image';
import { Location, LocationStyle } from '../../../common/atomic';

export interface ProfileStyleProps {
  width?: number;
  height?: number;
  location?: Location;
}

export interface ProfileProps extends ProfileStyleProps {
  src?: string;
}

export const Profile = ({ src, width = 40, height = 40, location }: ProfileProps): React.ReactElement => {
  const [imageSize, setImageSize] = useState<Omit<ProfileStyleProps, 'location'>>({ width, height });
  const isMobile = useMedia('(max-width: 768px)');

  useEffect(() => {
    setImageSize({
      width: isMobile ? width - 10 : width,
      height: isMobile ? height - 10 : height,
    });
  }, [isMobile]);

  return (
    <ProfileWrapper width={imageSize.width} height={imageSize.height} location={location}>
      <ProfileImage
        src={src || '/images/me-emoji.png'}
        objectFit="cover"
        width={imageSize.width}
        height={imageSize.height}
      />
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div<ProfileStyleProps>`
  width: ${(props) => props.width + 20}px;
  height: ${(props) => props.height + 20}px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid ${(props) => props.theme.color.text};
  border-radius: 100%;

  ${(props) => LocationStyle(props.location)};
`;

const ProfileImage = styled(Image)`
  border-radius: 100%;
  object-fit: cover;
`;
