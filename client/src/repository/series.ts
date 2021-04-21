import { onRequest, RequestMethod, Response } from 'common/axios';
import { RepositoryProps } from './_repository';

export class SeriesRepository {
  static async onGetSeriesList({ query }: RepositoryProps.GET): Promise<Response> {
    const url = '/series';
    return await onRequest({ method: RequestMethod.GET, url, query });
  }

  static async onGetSeries({ id, query }: RepositoryProps.GET): Promise<Response> {
    const url = `/series/${id}`;
    return await onRequest({ method: RequestMethod.GET, url, query });
  }

  static async onCreateSeries({ params, query }: RepositoryProps.POST): Promise<Response> {
    const url = '/series';
    return await onRequest({ method: RequestMethod.GET, url, query, params });
  }

  static async onDeleteSeries({ id, params, query }: RepositoryProps.DELETE): Promise<Response> {
    const url = `/series/${id}`;
    return await onRequest({ method: RequestMethod.DELETE, url, query, params });
  }

  static async onUpdateSeries({ id, params, query }: RepositoryProps.PUT): Promise<Response> {
    const url = `/series/${id}`;
    return await onRequest({ method: RequestMethod.PUT, url, query, params });
  }
}
