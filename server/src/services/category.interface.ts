import { User } from '../models';
export namespace CategoryServiceProps {
  export interface onGetCategories {
    user: User;
    limit: number;
    offset: number;
  }

  export interface onGetCategory {
    user: User;
    id: string;
    limit: number;
    offset: number;
  }

  export interface onCreateCategory {
    user: User;
    type: 'main' | 'sub';
    name: string;
    mainCategoryId?: string;
    sequence: number;
  }

  export interface onDeleteCategory {
    user: User;
    type: 'main' | 'sub';
    id: string;
  }
}
