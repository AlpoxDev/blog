import React, { useState, useCallback, useEffect, useMemo } from 'react';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// component
import { Modal, Input } from 'components/molecule';
import { spacing } from 'common';

// hooks
import { useModal } from 'hooks';

export interface RegisterModalProps {
  view: boolean;
  onClose: () => void;
}

const isValid = (email: string, password: string, nickname: string): boolean => {
  if (email.length === 0 || password.length === 0 || nickname.length === 0) return false;
  return true;
};

export const Register = observer(
  ({ view, onClose }: RegisterModalProps): React.ReactElement => {
    const alertModal = useModal('Dialog');

    const [input, setInput] = useState({
      email: '',
      password: '',
      nickname: '',
    });
    const isValidInput = useMemo(() => isValid(input.email, input.password, input.nickname), [input]);

    const [check, setCheck] = useState({
      email: null,
      nickname: null,
    });

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInput((state) => ({ ...state, [name]: value }));
    }, []);

    const { authStore } = useStore();
    const { register, me, emailDuplicate, nicknameDuplicate } = authStore;

    const onCheckDuplicate = useCallback(() => {
      if (!isValidInput) return;
      if (emailDuplicate.isPending || nicknameDuplicate.isPending) return;

      const emailQuery = { key: 'email', value: input.email };
      authStore.onCheckEmailDuplicate({ query: emailQuery });

      const nicknameQuery = { key: 'nickname', value: input.nickname };
      authStore.onCheckNicknameDuplicate({ query: nicknameQuery });
    }, [input, isValidInput, emailDuplicate.isPending, nicknameDuplicate.isPending]);

    const onRegister = useCallback(() => {
      if (!isValidInput) return;
      if (!check.email || !check.nickname) {
        onCheckDuplicate();
        return;
      }

      const params = { ...input };
      authStore.onRegister({ params });
    }, [authStore, input, isValidInput, onCheckDuplicate]);

    console.log('Check', check);

    useEffect(() => {
      if (!register.isReady) return;
      authStore.onMe();
    }, [register.isReady]);

    useEffect(() => {
      if (!me.isReady) return;
      alertModal.onCreateModal({ content: '회원가입 완료!', time: 4 });
      onClose();
    }, [me.isReady]);

    useEffect(() => {
      if (emailDuplicate.isReady) setCheck((state) => ({ ...state, email: true }));
      if (emailDuplicate.isError) setCheck((state) => ({ ...state, email: false }));
    }, [emailDuplicate.status]);

    useEffect(() => {
      if (nicknameDuplicate.isReady) setCheck((state) => ({ ...state, nickname: true }));
      if (nicknameDuplicate.isError) setCheck((state) => ({ ...state, nickname: false }));
    }, [nicknameDuplicate.status]);

    useEffect(() => {
      if (!check.email && typeof check.email === 'boolean')
        alertModal.onCreateModal({ content: '중복된 이메일입니다.' });
      if (!check.nickname && typeof check.nickname === 'boolean')
        alertModal.onCreateModal({ content: '중복된 닉네임입니다.' });
    }, [check]);

    useEffect(() => {
      if (emailDuplicate.isReady && nicknameDuplicate.isReady) onRegister();
    }, [emailDuplicate.isReady, nicknameDuplicate.isReady]);

    return (
      <Modal
        view={view}
        title="회원가입"
        buttonOptions={{
          pending: register.isPending || me.isPending,
          disabled: !isValidInput,
        }}
        onClose={onClose}
        onConfirm={onRegister}
      >
        <Input
          label="이메일"
          name="email"
          value={input.email}
          placeholder="이메일을 입력해주세요"
          onChange={onChange}
          location={{ bottom: spacing(3) }}
        />

        <Input
          label="패스워드"
          name="password"
          value={input.password}
          placeholder="패스워드를 입력해주세요"
          onChange={onChange}
          location={{ bottom: spacing(3) }}
        />

        <Input
          label="닉네임"
          name="nickname"
          value={input.nickname}
          placeholder="닉네임을 입력해주세요"
          onChange={onChange}
        />
      </Modal>
    );
  },
);
