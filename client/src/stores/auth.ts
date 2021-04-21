import { types } from 'mobx-state-tree';

import { empty, me, message } from 'common/models';
import { AuthRepository } from 'repository';

export const AuthStore = types
  .model('AuthStore', {
    me,
    login: empty,
    register: empty,
    logout: empty,
    emailDuplicate: message,
    nicknameDuplicate: message,
  })
  .actions((self) => ({
    onMe: () => self.me.onCreate(AuthRepository.onMe, { dataKey: 'user' }),
    onLogin: (props) => self.login.onCreate(() => AuthRepository.onLogin(props)),
    onRegister: (props) => self.register.onCreate(() => AuthRepository.onRegister(props)),
    onLogout: () => self.logout.onCreate(AuthRepository.onLogout),
    onCheckEmailDuplicate: (props) =>
      self.emailDuplicate.onGetOne(() => AuthRepository.onCheckDuplicate(props), { message }),
    onCheckNicknameDuplicate: (props) =>
      self.nicknameDuplicate.onGetOne(() => AuthRepository.onCheckDuplicate(props), { message }),
  }));
