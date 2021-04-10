import React from 'react';
import styled from '@emotion/styled';
import NextImage from 'next/image';

export interface ImageProps {
  className?: string;
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain';
}

export const Image = ({
  className,
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  ...props
}: ImageProps): React.ReactElement => {
  return (
    <ImageStyle
      className={className}
      src={src}
      alt={alt || 'image'}
      width={width}
      height={height}
      objectFit={objectFit}
      {...props}
    />
  );
};

const ImageStyle = styled(NextImage)``;
