import React, { MutableRefObject } from 'react';
import styled from '@emotion/styled';

import { Location, LocationStyle } from '../../../common';

export interface ContentStyleProps {
  option?: 'flex' | 'flex-row' | 'flex-column';
  location?: Location;
}

export interface ContentProps extends ContentStyleProps {
  id?: string;
  ref?: MutableRefObject<HTMLDivElement>;
  className?: string;
  children?: React.ReactNode | React.ReactNodeArray;
  onClick?: () => void;
}

export const Content = ({
  id,
  ref,
  children,
  className,
  option,
  location,
  ...props
}: ContentProps): React.ReactElement => {
  return (
    <ContentStyle id={id} ref={ref} className={className} option={option} location={location} {...props}>
      {children}
    </ContentStyle>
  );
};

const ContentStyle = styled.div<ContentStyleProps>`
  ${(props) => {
    const { option } = props;
    switch (option) {
      case 'flex':
      case 'flex-row':
        return `
					display: flex;
					flex-wrap: wrap;
					flex-direction: row;
				`;
      case 'flex-column':
        return `
					display: flex;
					flex-wrap: wrap;
					flex-direction: column;
				`;
      default:
        return '';
    }
  }}
  ${(props) => props.location && LocationStyle(props.location)}
`;
