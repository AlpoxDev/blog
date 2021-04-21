import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';

// components
import { Modal } from 'components/molecule/Modal';

// hooks
import { useTimer } from 'hooks';

export interface DialogModalProps {
  view: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  time?: number;
}

export const Dialog = ({ view, onClose, title, content, time = 3 }: DialogModalProps): React.ReactElement => {
  const isView = useTimer(time);

  useEffect(() => {
    if (isView) onClose();
  }, [isView]);

  return (
    <DialogStyle view={view} title={title} onClose={onClose} onConfirm={onClose}>
      {content}
    </DialogStyle>
  );
};

const DialogStyle = styled(Modal)`
  width: 40%;
`;
