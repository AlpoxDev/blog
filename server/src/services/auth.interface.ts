export namespace AuthServiceProps {
  export interface onMe {
    cookie: string;
  }
  export interface onLogin {
    id: string;
    password: string;
  }

  export interface onRegister {
    email: string;
    password: string;
    nickname: string;
    isMarketing: boolean;
  }

  export interface onCheckDuplicate {
    key: 'email' | 'nickname';
    value: string;
  }
}
