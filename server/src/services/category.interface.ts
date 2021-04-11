import { User, MainCategory } from '../models';

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

  export interface onCreateAndUpdateCategorys {
    user: User;
    categorys: MainCategory[];
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

  export interface onUpdateCategory {
    user: User;
    type: 'main' | 'sub';
    id: string;
    name: string;
    mainCategoryId?: string;
  }
}
