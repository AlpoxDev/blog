export namespace AuthServiceProps {
  export interface onMe {
    cookie: string;
  }

  export interface onRefresh {
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

  export interface onGithub {
    client_id: string;
    client_secret: string;
    code: string;
  }

  export interface onGithubAuth {
    githubId: string;
    nickname: string;
  }
}
