/* eslint-disable @typescript-eslint/no-namespace */

export namespace RepositoryProps {
  export interface GET {
    id?: string;
    query?: { [key: string]: string | null };
    headers?: any;
  }

  export interface POST extends GET {
    params?: any;
  }

  export type DELETE = POST;
  export type PUT = POST;
  export type PATCH = POST;
}
