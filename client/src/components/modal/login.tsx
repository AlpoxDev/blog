import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Button } from 'components/atom';
import { Modal, Input } from 'components/molecule';

// common
import { spacing, isEmail, isPassword, isNickname } from 'common';

// hooks
import { useModal } from 'hooks';

export interface LoginModalProps {
  view: boolean;
  onClose: () => void;
}

type ValidMessage = {
  id?: string;
  password?: string;
};

const isValidMessage = (id: string, password: string): ValidMessage => {
  const message: ValidMessage = { id: undefined, password: undefined };

  if (id.length > 0 && !isEmail(id) && !isNickname(id)) message.id = '* 아이디 형식이 올바르지 않습니다.';
  if (password.length > 0 && !isPassword(password)) message.password = '* 비밀번호 형식이 올바르지 않습니다.';

  return message;
};

const isValid = (errorMessage: ValidMessage, id: string, password: string) => {
  if (id.length === 0 || password.length === 0) return false;
  if (errorMessage.id || errorMessage.password) return false;
  return true;
};

export const Login = observer(({ view, onClose }: LoginModalProps): React.ReactElement | null => {
  const router = useRouter();

  const alertModal = useModal('Dialog');

  const [input, setInput] = useState({
    id: '',
    password: '',
  });
  const errorMessage = useMemo(() => isValidMessage(input.id, input.password), [input]);
  const valid = useMemo(() => isValid(errorMessage, input.id, input.password), [errorMessage, input]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((state) => ({ ...state, [name]: value }));
  }, []);

  const { authStore } = useStore();
  const { login, me } = authStore;

  const onLogin = useCallback(() => {
    if (!valid) return;

    const params = { ...input };
    authStore.onLogin({ params });
  }, [input, valid]);

  const onGithub = useCallback(() => {
    if (typeof window === 'undefined') return;

    router.replace('/github');
    onClose();
  }, [router]);

  // login 성공
  useEffect(() => {
    if (!login.isReady) return;
    authStore.onMe();
    login.onDefault();
    alertModal.onCreateModal({ title: '알림', content: '로그인 성공!', time: 1.5 });
    onClose();
  }, [login.isReady]);

  // 로그인 되어있으면 캔슬
  useEffect(() => {
    if (me.isReady) onClose();
  }, [me.isReady]);

  if (!view) return null;

  return (
    <Modal
      view={view}
      title="로그인"
      buttonOptions={{
        pending: login.isPending || me.isPending,
        disabled: !valid,
      }}
      onConfirm={onLogin}
      onClose={onClose}
    >
      <Input
        isFocused
        label="아이디"
        name="id"
        placeholder="닉네임 또는 이메일을 입력해주세요"
        error={errorMessage.id}
        value={input.id}
        onChange={onChange}
        location={{ bottom: spacing(6) }}
      />
      <Input
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        error={errorMessage.password}
        value={input.password}
        onChange={onChange}
      />

      <GithubButton onClick={onGithub}>Github Login</GithubButton>
    </Modal>
  );
});

const GithubButton = styled(Button)`
  width: 100%;
  margin-top: 2rem;
`;
