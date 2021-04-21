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

  static async onCreateCategory({ params, query }: RepositoryProps.POST): Promise<Response> {
    const url = '/categorys';
    return await onRequest({ method: RequestMethod.POST, url, query, params });
  }

  static async onDeleteCategory({ id, params, query }: RepositoryProps.DELETE): Promise<Response> {
    const url = `/categorys/${id}`;
    return await onRequest({ method: RequestMethod.DELETE, url, query, params });
  }

  static async onUpdateCategory({ id, params, query }: RepositoryProps.PUT): Promise<Response> {
    const url = `/categorys/${id}`;
    return await onRequest({ method: RequestMethod.PUT, url, query, params });
  }
}
