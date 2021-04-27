import { User } from '../models';

export namespace SeriesServiceProps {
  export interface onGetSeriesList {
    user: User;
    limit: number;
    offset: number;
  }

  export interface onGetSeries {
    user: User;
    id: string;
    limit: number;
    offset: number;
  }

  export interface onCreateSeries {
    user: User;
    title: string;
    content?: string;
    posts?: string[];
  }

  export interface onDeleteSeries {
    user: User;
    id: string;
  }

  export interface onUpdateSeries {
    user: User;
    id: string;
    title: string;
    content?: string;
    posts?: string[];
  }
}
