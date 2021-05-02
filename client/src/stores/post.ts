import { types } from 'mobx-state-tree';

import { empty, posts, post, createPost } from 'common/models';
import { PostRepository } from 'repository';

export const PostStore = types
  .model('PostStore', {
    posts,
    post,
    createPost,
    deletePost: empty,
    updatePost: empty,
    connectCategory: empty,
    connectSeries: empty,
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
    onCreatePost: (props) =>
      self.createPost.onCreate(() => PostRepository.onCreatePost(props), {
        dataKey: 'post',
      }),
    onDeletePost: (props) => self.deletePost.onDelete(() => PostRepository.onDeletePost(props)),
    onUpdatePost: (props) => self.updatePost.onUpdate(() => PostRepository.onUpdatePost(props)),
    onConnectCategory: (props) => self.connectCategory.onUpdate(() => PostRepository.onConnectCategory(props)),
    onConnectSeries: (props) => self.connectSeries.onUpdate(() => PostRepository.onConnectSeries(props)),
  }));
