import { User } from '../models';

export namespace PostServiceProps {
  export interface onGetPosts {
    user: User;
    limit: number;
    offset: number;
  }

  export interface onGetPost {
    user: User;
    id: string;
  }

  export interface onCreatePost {
    user: User;
    title: string;
    subtitle?: string;
    content: string;

    category: string; // SubCategory pk
    series: string; // Series pk or Series name
    tags: string[]; // Tag pk or Tag name
  }

  export interface onDeletePost {
    user: User;
    id: string;
  }

  export interface onUpdatePost extends onCreatePost {
    id: string;
  }
}
