import { Instance, types } from 'mobx-state-tree';
import { AnyModel } from 'common/models';

export const Modal = types.model({
  key: types.string,
  component: types.late(() => AnyModel),
  props: types.late(() => AnyModel),
});

export type IModal = Instance<typeof Modal>;
