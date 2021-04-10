import React from 'react';
import styled from '@emotion/styled';
import Div100vh from 'react-div-100vh';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

const LayoutWrapper = styled(Div100vh)``;
