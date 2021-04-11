import { User, Tag } from '../models';

export namespace TagServiceProps {
  export interface onGetTags {
    user: User;
    limit: number;
    offset: number;
  }

  export interface onGetTag {
    user: User;
    id: string;
    limit: number;
    offset: number;
  }

  export interface onCreateTag {
    user: User;
    name: string;
  }

  export interface onDeleteTag {
    user: User;
    id: string;
  }

  export interface onUpdateTag {
    user: User;
    id: string;
    name: string;
  }
}
