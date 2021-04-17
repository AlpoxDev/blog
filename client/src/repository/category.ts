import { onRequest, RequestMethod, Response } from 'common/axios';
import { RepositoryProps } from './_repository';

export class CategoryRepository {
  static async onGetCategorys({ query }: RepositoryProps.GET): Promise<Response> {
    const url = '/categorys';
    return await onRequest({ method: RequestMethod.GET, url, query });
  }

  static async onGetCategory({ id, query }: RepositoryProps.GET): Promise<Response> {
    const url = `/categorys/${id}`;
    return await onRequest({ method: RequestMethod.GET, url, query });
  }
}
