import React from 'react';
import styled from '@emotion/styled';

import { Location, LocationStyle } from '../../../common';

export interface ContentStyleProps {
  option?: 'flex' | 'flex-row' | 'flex-column';
  location?: Location;
}

export interface ContentProps extends ContentStyleProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Content = ({ id, children, className, option, location, ...props }: ContentProps): React.ReactElement => {
  return (
    <ContentStyle id={id} className={className} option={option} location={location} {...props}>
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
