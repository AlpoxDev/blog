import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Modal, Input } from 'components/molecule';

// common
import { spacing } from 'common/style';
import { useModal } from 'hooks';

export interface LoginModalProps {
  view: boolean;
  onClose: () => void;
}

const isValid = (id: string, password: string) => {
  if (id.length === 0 || password.length === 0) return false;
  return true;
};

export const Login = observer(({ view, onClose }: LoginModalProps): React.ReactElement | null => {
  const alertModal = useModal('Dialog');

  const [input, setInput] = useState({
    id: '',
    password: '',
  });
  const isValidInput = useMemo(() => isValid(input.id, input.password), [input]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((state) => ({ ...state, [name]: value }));
  }, []);

  const { authStore } = useStore();
  const { login, me } = authStore;

  const onLogin = useCallback(() => {
    if (!isValidInput) return;

    const params = { ...input };
    authStore.onLogin({ params });
  }, [input, isValidInput]);

  // login 성공
  useEffect(() => {
    if (!login.isReady) return;
    authStore.onMe();
  }, [login.isReady]);

  // 정보 불러오기 성공
  useEffect(() => {
    if (!me.isReady) return;

    login.onDefault();
    alertModal.onCreateModal({ content: '로그인 성공!', time: 3 });
    onClose();
  }, [me.isReady]);

  if (!view) return null;

  return (
    <Modal
      view={view}
      title="로그인"
      buttonOptions={{
        pending: login.isPending || me.isPending,
        disabled: !isValidInput,
      }}
      onConfirm={onLogin}
      onClose={onClose}
    >
      <Input
        isFocused
        label="아이디"
        name="id"
        value={input.id}
        onChange={onChange}
        location={{ bottom: spacing(6) }}
      />
      <Input label="비밀번호" type="password" name="password" value={input.password} onChange={onChange} />
    </Modal>
  );
});
