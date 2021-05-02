import { onRequest, RequestMethod, Response } from 'common/axios';
import { RepositoryProps } from './_repository';

export class PostRepository {
  static async onGetPosts({ query }: RepositoryProps.GET): Promise<Response> {
    const url = '/posts';
    return await onRequest({ method: RequestMethod.GET, url, query });
  }

  static async onGetPost({ id, query }: RepositoryProps.GET): Promise<Response> {
    const url = `/posts/${id}`;
    return await onRequest({ method: RequestMethod.GET, url, query });
  }

  static async onCreatePost({ params }: RepositoryProps.POST): Promise<Response> {
    const url = '/posts';
    return await onRequest({ method: RequestMethod.POST, url, params });
  }

  static async onDeletePost({ id }: RepositoryProps.DELETE): Promise<Response> {
    const url = `/posts/${id}`;
    return await onRequest({ method: RequestMethod.DELETE, url });
  }

  static async onUpdatePost({ id, params }: RepositoryProps.PUT): Promise<Response> {
    const url = `/posts/${id}`;
    return await onRequest({ method: RequestMethod.PUT, url, params });
  }

  static async onConnectCategory({ id, params }: RepositoryProps.POST): Promise<Response> {
    const url = `/posts/${id}/category`;
    return await onRequest({ method: RequestMethod.POST, url, params });
  }

  static async onConnectSeries({ id, params }: RepositoryProps.POST): Promise<Response> {
    const url = `/posts/${id}/series`;
    return await onRequest({ method: RequestMethod.POST, url, params });
  }
}
