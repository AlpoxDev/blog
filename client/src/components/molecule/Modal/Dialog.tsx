import React from 'react';
import { Modal } from './Modal';

export interface DialogProps {
  view?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
}

export const Dialog = ({ view, onConfirm, onCancel }: DialogProps): React.ReactElement | null => {
  if (!view) return null;

  return (
    <Modal view={view} onConfirm={onConfirm} onCancel={onCancel}>
      다이얼로그~~~
    </Modal>
  );
};
