import React, { useCallback } from 'react';

import { useStore } from 'stores';
import * as modals from 'components/modal/_modal';

export type UseModal = {
  onCreateModal: (params?: any) => void;
  onDeleteModal: () => void;
};

export const useModal = (name: string, props?: any): UseModal => {
  const { uiStore } = useStore();

  let component = null;
  Object.entries(modals).forEach(([key, value]: [string, React.ReactNode]) => {
    if (key === name) component = value;
  });

  const onDeleteModal = useCallback(() => {
    if (!name) return;
    uiStore.onDeletModal(name);
  }, [uiStore, name]);

  const onCreateModal = useCallback(
    (params?: any) => {
      if (!component) return;
      uiStore.onCreateModal({
        key: name,
        component,
        props: { view: true, onClose: onDeleteModal, ...props, ...params },
      });
    },
    [uiStore, name, props, component, onDeleteModal],
  );

  return {
    onCreateModal,
    onDeleteModal,
  };
};
