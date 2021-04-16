import React from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';

// hooks
import { useFetch } from 'hooks';

// components
import { Content } from 'components/atom';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = observer(
  ({ children }: LayoutProps): React.ReactElement => {
    useFetch();

    return <LayoutWrapper>{children}</LayoutWrapper>;
  },
);

const LayoutWrapper = styled(Content)``;
