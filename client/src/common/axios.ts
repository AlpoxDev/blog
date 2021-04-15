import axios, { AxiosError } from 'axios';
import queryString from 'query-string';
import config from 'config';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  PUT = 'PUT',
}

export type RequestProps = {
  method?: RequestMethod;
  url: string;
  query?: { [key: string]: string | number };
  headers?: any;
  params?: any;
};

export type Response = {
  status: number;
  data: any;
};

export type Error = Response;

const instance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': config.BASE_URL,
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  console.log(config);
  return config;
});

const onParseQuery = (query?: any): string => {
  if (!query) return `?nickname=${config.nickname}`;
  query = { ...query, nickname: config.nickname };
  return '?' + queryString.stringify(query);
};

const onParseError = (error: AxiosError): Response => {
  if (error.response) {
    const { status, data } = error.response;
    console.log('onParseError', status, data);

    return { status, data };
  } else if (error.request) {
    console.log(error.request);

    return { status: 400, data: 'Client Error! Check Client Code' };
  } else {
    return { status: 500, data: error.message };
  }
};

export const onRequest = async (beforeProps: RequestProps): Promise<Response> => {
  const { method } = beforeProps;
  const props = { ...beforeProps, url: config.BASE_URL + beforeProps.url };

  let response: Response;

  try {
    switch (method) {
      case RequestMethod.GET:
      default:
        response = await onRequestGet(props);
        break;
      case RequestMethod.POST:
        response = await onRequestPost(props);
        break;
      case RequestMethod.DELETE:
        response = await onRequestDelete(props);
        break;
      case RequestMethod.PATCH:
        response = await onRequestPatch(props);
        break;
      case RequestMethod.PUT:
        response = await onRequestPut(props);
        break;
    }

    console.log(`onRequest Response ${props.url}`, response.data);
    return response;
  } catch (error) {
    console.log(`onRequest Error ${props.url}`, error);
    return onParseError(error);
  }
};

export const onRequestGet = async (props: RequestProps): Promise<Response> => {
  const { url, headers, query } = props;

  return await instance.get(url + onParseQuery(query), {
    headers,
  });
};

export const onRequestPost = async (props: RequestProps): Promise<Response> => {
  const { url, headers, query, params } = props;

  return await instance.post(url + onParseQuery(query), params, {
    headers,
  });
};

export const onRequestDelete = async (props: RequestProps): Promise<Response> => {
  const { url, headers, query, params } = props;

  return await instance.delete(url + onParseQuery(query), {
    headers,
    params,
  });
};

export const onRequestPatch = async (props: RequestProps): Promise<Response> => {
  const { url, headers, query, params } = props;

  return await instance.patch(url + onParseQuery(query), params, {
    headers,
    withCredentials: true,
  });
};

export const onRequestPut = async (props: RequestProps): Promise<Response> => {
  const { url, headers, query, params } = props;

  return await instance.put(url + onParseQuery(query), params, {
    headers,
  });
};
