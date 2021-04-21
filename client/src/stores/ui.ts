import { types } from 'mobx-state-tree';
import { Modal, IModal } from 'common/models';

export const UIStore = types
  .model('UIStore', {
    modals: types.optional(types.array(Modal), []),
  })
  .actions((self) => ({
    onCreateModal: (props: IModal) => {
      self.modals.push(props);
    },
    onDeletModal: (key: string) => {
      const newModals = self.modals.toJSON().filter((modal: IModal) => modal.key !== key) as IModal[];
      self.modals = newModals as any;
    },
  }));
