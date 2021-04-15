import React from 'react';
import styled from '@emotion/styled';
import { Content } from 'components/atom';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps): React.ReactElement => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

const LayoutWrapper = styled(Content)``;
