import React from 'react';
import ReactModal, { Styles } from 'react-modal';
import styled from '@emotion/styled';

import { Text, Button, Content } from '../../atom';
import { spacing } from '../../../common';

export interface ModalProps {
  children: React.ReactNode;
  view?: boolean;
  onConfirm?: () => void;
  onClose: () => void;
  title?: string;
  info?: string;
}

const modalStyle: Styles = {
  overlay: {
    width: '100%',
    height: '100vh',
    top: 0,
    left: 0,
    position: 'fixed',
    backgroundColor: 'rgba(0,0,0,0.3)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export const Modal = ({ children, view, onConfirm, onClose, title, info }: ModalProps): React.ReactElement | null => {
  if (!view) return null;
  return (
    <ModalWrapper style={modalStyle} isOpen={view} onRequestClose={onClose}>
      {title && (
        <ModalTopWrapper>
          <Text.H4>{title}</Text.H4>
          <Text.Label location={{ top: spacing(2) }}>{info}</Text.Label>
        </ModalTopWrapper>
      )}
      <ModalContentWrapper>{children}</ModalContentWrapper>

      <ModalBottomWrapper option="flex">
        <Button option="flat" location={{ right: spacing(2) }} onClick={onClose}>
          취소
        </Button>
        <Button onClick={onConfirm}>확인</Button>
      </ModalBottomWrapper>
    </ModalWrapper>
  );
};

const ModalWrapper = styled(ReactModal)`
  width: 50%;
  height: auto;
  background-color: white;

  padding: 1.5rem 2rem;
  border-radius: 4px;
  outline: none;
`;

const ModalTopWrapper = styled(Content)`
  padding-top: 0.5rem;
`;

const ModalContentWrapper = styled(Content)`
  padding: 1.5rem 0;
`;

const ModalBottomWrapper = styled(Content)`
  justify-content: flex-end;
`;
