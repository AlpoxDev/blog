export namespace AuthServiceProps {
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
}
