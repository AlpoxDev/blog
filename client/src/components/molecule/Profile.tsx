import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';

export interface ProfileStyleProps {
  width?: number;
  height?: number;
}

export interface ProfileProps extends ProfileStyleProps {
  className?: string;
  src?: string;
}

export const Profile = ({ className, src, width = 35, height = 35, ...props }: ProfileProps): React.ReactElement => {
  return (
    <ProfileWrapper className={className} width={width} height={height}>
      <ProfileImage loading="eager" src={src || '/images/me-emoji.png'} width={width} height={height} {...props} />
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div<ProfileStyleProps>`
  width: ${(props) => props.width + 20}px;
  height: ${(props) => props.height + 20}px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 100%;
`;

const ProfileImage = styled(Image)`
  border-radius: 100%;
  object-fit: cover;
`;
