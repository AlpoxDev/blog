import { types } from 'mobx-state-tree';

import { tags, tag } from 'common/models';
import { TagRepository } from 'repository';

export const TagStore = types
  .model('TagStore', {
    tags,
    tag,
  })
  .actions((self) => ({
    onGetTags: (props) =>
      self.tags.onGetAll(() => TagRepository.onGetTags(props), {
        dataKey: 'tags',
      }),
    onGetTag: (props) =>
      self.tags.onGetOne(() => TagRepository.onGetTag(props), {
        dataKey: 'tag',
      }),
  }));
