import { types } from 'mobx-state-tree';

import { posts, post } from 'common/models';
import { PostRepository } from 'repository';

export const PostStore = types
  .model('PostStore', {
    posts,
    post,
  })
  .actions((self) => ({
    onGetPosts: (props) =>
      self.posts.onGetAll(() => PostRepository.onGetPosts(props), {
        dataKey: 'posts',
      }),
    onGetPost: (props) =>
      self.post.onGetOne(() => PostRepository.onGetPost(props), {
        dataKey: 'post',
      }),
  }));
