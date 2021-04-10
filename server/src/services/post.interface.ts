export namespace PostServiceProps {
  export interface onGetPosts {
    limit?: number;
    offset?: number;
  }

  export interface onGetPost {
    id: string;
  }
}
