import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import { Content } from '../Content';

export interface PortalProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Portal = ({ id = 'portal', className, children }: PortalProps): React.ReactElement | null => {
  if (!id || typeof window === 'undefined') return null;

  const el = document.getElementById(id);
  return ReactDOM.createPortal(<PortalStyle className={className}>{children}</PortalStyle>, el);
};

const PortalStyle = styled(Content)``;
