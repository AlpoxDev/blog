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
  }

  export interface onDeletePost {
    user: User;
    id: string;
  }

  export interface onUpdatePost {
    user: User;
    id: string;
  }
}
