import React from 'react';
import styled from '@emotion/styled';

export interface ContentStyleProps {
  option?: 'flex' | 'flex-row' | 'flex-column';
}

export interface ContentProps extends ContentStyleProps {
  className?: string;
  children: React.ReactNode;
}

export const Content = ({ children, className, option }: ContentProps): React.ReactElement => {
  return (
    <ContentStyle className={className} option={option}>
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
					flex-direction: row;
				`;
      case 'flex-column':
        return `
					display: flex;
					flex-direction: column;
				`;
      default:
        return '';
    }
  }}
`;
