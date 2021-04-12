import { User, UserPermission } from '../models';

export namespace UserServiceProps {
  export interface onGetUsers {
    limit: number;
    offset: number;
  }

  export interface onGetUser {
    user: User;
    id: string;
  }

  export interface onDeleteUser {
    user: User;
    id: string;
  }

  export interface onUpdateUser {
    user: User;
    id: string;
  }

  export interface onGetUserRequests {
    limit: number;
    offset: number;
  }

  export interface onGetUserRequest {
    user: User;
    id: string;
  }

  export interface onCreateUserRequest {
    user: User;
    permission: UserPermission;
  }

  export interface onDeleteUserRequest {
    user: User;
    id: string;
  }

  export interface onUpdateUserRequest {
    user: User;
    id: string;
    permission: UserPermission;
  }
}
