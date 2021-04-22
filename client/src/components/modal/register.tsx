import React, { useState, useCallback, useEffect, useMemo } from 'react';
import validator from 'validator';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// component
import { Modal, Input } from 'components/molecule';
import { spacing, isEmail, isPassword, isNickname } from 'common';

// hooks
import { useModal } from 'hooks';

export interface RegisterModalProps {
  view: boolean;
  onClose: () => void;
}

type ValidMessage = {
  email?: string;
  password?: string;
  nickname?: string;
};

const isValidMessage = (email: string, password: string, nickname: string): ValidMessage => {
  const message: ValidMessage = { email: undefined, password: undefined, nickname: undefined };

  if (email.length > 0 && !isEmail(email)) message.email = '* 이메일 형식이 올바르지 않습니다.';
  if (password.length > 0 && !isPassword(password)) message.password = '* 비밀번호 형식이 올바르지 않습니다.';
  if (nickname.length > 0 && !isNickname(nickname)) message.nickname = '* 닉네임 형식이 올바르지 않습니다.';

  return message;
};

const isValid = (errorMessage: ValidMessage, email: string, password: string, nickname: string): boolean => {
  if (email.length === 0 || password.length === 0 || nickname.length === 0) return false;
  if (errorMessage.email || errorMessage.password || errorMessage.nickname) return false;
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

    const errorMessage = useMemo(() => isValidMessage(input.email, input.password, input.nickname), [input]);
    const valid = useMemo(() => isValid(errorMessage, input.email, input.password, input.nickname), [
      errorMessage,
      input,
    ]);

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
      if (!valid) return;
      if (emailDuplicate.isPending || nicknameDuplicate.isPending) return;

      const emailQuery = { key: 'email', value: input.email };
      authStore.onCheckEmailDuplicate({ query: emailQuery });

      const nicknameQuery = { key: 'nickname', value: input.nickname };
      authStore.onCheckNicknameDuplicate({ query: nicknameQuery });
    }, [input, valid, emailDuplicate.isPending, nicknameDuplicate.isPending]);

    const onRegister = useCallback(() => {
      if (!check.email || !check.nickname) {
        onCheckDuplicate();
        return;
      }
      if (!valid) return;

      const params = { ...input };
      authStore.onRegister({ params });
    }, [authStore, input, valid, onCheckDuplicate]);

    useEffect(() => {
      if (!register.isReady) return;
      authStore.onMe();
      register.onDefault();
      alertModal.onCreateModal({ title: '알림', content: '회원가입 완료!', time: 1.5 });
      onClose();
    }, [register.isReady]);

    useEffect(() => {
      if (emailDuplicate.isReady) setCheck((state) => ({ ...state, email: true }));
      if (emailDuplicate.isError) setCheck((state) => ({ ...state, email: false }));
    }, [emailDuplicate.status]);

    useEffect(() => {
      if (nicknameDuplicate.isReady) setCheck((state) => ({ ...state, nickname: true }));
      if (nicknameDuplicate.isError) setCheck((state) => ({ ...state, nickname: false }));
    }, [nicknameDuplicate.status]);

    useEffect(() => {
      if (!check.email && typeof check.email === 'boolean') {
        alertModal.onCreateModal({ content: '중복된 이메일입니다.' });
        emailDuplicate.onDefault();
      }
      if (!check.nickname && typeof check.nickname === 'boolean') {
        alertModal.onCreateModal({ content: '중복된 닉네임입니다.' });
        nicknameDuplicate.onDefault();
      }
    }, [check]);

    useEffect(() => {
      if (emailDuplicate.isReady && nicknameDuplicate.isReady) onRegister();
    }, [emailDuplicate.isReady, nicknameDuplicate.isReady]);

    // 로그인 되어있으면 캔슬
    useEffect(() => {
      if (me.isReady) onClose();
    }, [me.isReady]);

    return (
      <Modal
        view={view}
        title="회원가입"
        buttonOptions={{
          pending: register.isPending || me.isPending,
          disabled: !valid,
        }}
        onClose={onClose}
        onConfirm={onRegister}
      >
        <Input
          label="이메일"
          name="email"
          error={errorMessage.email}
          value={input.email}
          placeholder="이메일을 입력해주세요"
          onChange={onChange}
          location={{ bottom: spacing(3) }}
        />

        <Input
          label="패스워드"
          type="password"
          name="password"
          error={errorMessage.password}
          value={input.password}
          placeholder="패스워드를 입력해주세요 (소문자 숫자 필수, 8~20자리)"
          onChange={onChange}
          location={{ bottom: spacing(3) }}
        />

        <Input
          label="닉네임"
          name="nickname"
          error={errorMessage.nickname}
          value={input.nickname}
          placeholder="닉네임을 입력해주세요"
          onChange={onChange}
        />
      </Modal>
    );
  },
);
