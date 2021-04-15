import React from 'react';
import styled from '@emotion/styled';
import { Location, LocationStyle } from '../../../common';
export interface ImageStyleProps {
  objectFit?: 'cover' | 'contain';
  width?: number;
  height?: number;
  location?: Location;
}
export interface ImageProps extends ImageStyleProps {
  className?: string;
  src: string;
  alt?: string;
}

export const Image = ({
  className,
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  location,
  ...props
}: ImageProps): React.ReactElement => {
  return (
    <ImageStyle
      className={className}
      location={location}
      src={src}
      alt={alt || 'image'}
      width={width}
      height={height}
      objectFit={objectFit}
      {...props}
    />
  );
};

const ImageStyle = styled.img<ImageStyleProps>`
  ${(props) => props.width && `width: ${props.width}px;`}
  ${(props) => props.height && `height: ${props.height}px;`}
  ${(props) => props.objectFit && `object-fit: ${props.objectFit};`}
  ${(props) => props.location && LocationStyle(props.location)}
`;
