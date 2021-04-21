import React, { useEffect } from 'react';

// hooks
import { useModal } from 'hooks';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';
import { IModal } from 'common/models';

export const Modals = observer(
  (): React.ReactElement => {
    const { uiStore } = useStore();
    const { modals } = uiStore;

    const registerModal = useModal('Login');
    useEffect(() => {
      registerModal.onCreateModal();
    }, []);

    const modalList = modals.map((modal: IModal) => {
      const Component = modal.component;
      return <Component key={modal.key} {...modal.props} />;
    });

    return <>{modalList}</>;
  },
);
