import { onRequest, RequestMethod, Response } from 'common/axios';
import { RepositoryProps } from './_repository';

export class TagRepository {
  static async onGetTags({ query }: RepositoryProps.GET): Promise<Response> {
    const url = '/tags';
    return await onRequest({ method: RequestMethod.GET, url, query });
  }

  static async onGetTag({ id, query }: RepositoryProps.GET): Promise<Response> {
    const url = `/tags/${id}`;
    return await onRequest({ method: RequestMethod.GET, url, query });
  }
}
