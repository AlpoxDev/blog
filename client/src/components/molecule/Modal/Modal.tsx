import React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled';

export interface ModalProps {
  children: React.ReactNode;
  view?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
  title?: string;
  info?: string;
}

export const Modal = ({ children, view, onConfirm, onCancel, title, info }: ModalProps): React.ReactElement | null => {
  if (!view) return null;
  return (
    <ReactModal isOpen={view} onRequestClose={onCancel}>
      {children}
    </ReactModal>
  );
};

const ModalWrapper = styled.div``;
