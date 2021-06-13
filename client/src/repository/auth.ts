import { onRequest, RequestMethod, Response } from 'common/axios';
import { RepositoryProps } from './_repository';

export class AuthRepository {
  static async onMe(): Promise<Response> {
    const url = '/auth/me';
    return await onRequest({ method: RequestMethod.POST, url });
  }

  static async onLogin({ params }: RepositoryProps.POST): Promise<Response> {
    const url = '/auth/login';
    return await onRequest({ method: RequestMethod.POST, url, params });
  }

  static async onRegister({ params }: RepositoryProps.POST): Promise<Response> {
    const url = '/auth/register';
    return await onRequest({ method: RequestMethod.POST, url, params });
  }

  static async onGithub({ params }: RepositoryProps.POST): Promise<Response> {
    const url = '/auth/github';
    return await onRequest({ method: RequestMethod.POST, url, params });
  }

  static async onLogout(): Promise<Response> {
    const url = '/auth/logout';
    return await onRequest({ method: RequestMethod.POST, url });
  }

  static async onCheckDuplicate({ query }: RepositoryProps.GET): Promise<Response> {
    const url = '/auth/duplicate';
    return await onRequest({ method: RequestMethod.GET, url, query });
  }
}
