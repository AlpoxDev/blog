import React, { useCallback, useEffect } from 'react';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

import { Text } from 'components/atom';
import { Modal } from 'components/molecule';

export interface LogoutModalProps {
  view: boolean;
  onClose: () => void;
}

export const Logout = observer(
  ({ view, onClose }: LogoutModalProps): React.ReactElement => {
    const { authStore } = useStore();
    const { logout } = authStore;

    const onLogout = useCallback(() => {
      authStore.onLogout();
    }, [authStore]);

    useEffect(() => {
      if (!logout.isReady) return;
      onClose();
    }, [logout.isReady]);

    return (
      <Modal view={view} title="로그아웃" onClose={onClose} onConfirm={onLogout}>
        <Text.Content>정말로 로그아웃 하시겠습니까?</Text.Content>
      </Modal>
    );
  },
);
