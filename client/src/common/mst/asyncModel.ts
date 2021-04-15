import {
  types,
  flow,
  IAnyModelType,
  IMaybeNull,
  ISimpleType,
  IOptionalIType,
  UnionStringArray,
  ValidOptionalValues,
  IModelType,
  IArrayType,
  Instance,
} from 'mobx-state-tree';
import { Error } from 'common/axios';
import { onPromise } from 'common/mst';
import { AnyModel, IAnyModel } from 'common/models';

export enum AsyncStatus {
  default = 'default',
  pending = 'pending',
  ready = 'ready',
  error = 'error',
}

export type AsyncModelType<T extends IAnyModelType> = {
  status: IOptionalIType<ISimpleType<UnionStringArray<AsyncStatus[]>>, ValidOptionalValues>;
  data: IMaybeNull<T>;
  error: IMaybeNull<IAnyModel>;
};

export type AsyncModelTypes<T extends IAnyModelType> = {
  status: IOptionalIType<ISimpleType<UnionStringArray<AsyncStatus[]>>, ValidOptionalValues>;
  data: IArrayType<T>;
  error: IMaybeNull<IAnyModel>;
};

export function AsyncModel<T extends IAnyModelType>(name: string, model: T): IModelType<AsyncModelType<T>, any> {
  return types
    .model(name, {
      status: types.optional(types.enumeration('status', [...Object.values(AsyncStatus)]), AsyncStatus.default),
      data: types.maybeNull(model),
      error: types.maybeNull(AnyModel),
    } as AsyncModelType<T>)
    .views((self: Instance<T>) => ({
      get isPending() {
        return self.status === AsyncStatus.pending;
      },
      get isReady() {
        return self.status === AsyncStatus.ready;
      },
      get isError() {
        return self.status === AsyncStatus.error;
      },
    }))
    .actions((self: Instance<T>) => ({
      onDefault() {
        self.status = AsyncStatus.default;
        self.error = null;
        self.data = null;
      },
      onPending() {
        self.status = AsyncStatus.pending;
        self.error = null;
      },
      onReady(data) {
        self.status = AsyncStatus.ready;
        self.error = null;
        self.data = data;
      },
      onError(error: Error) {
        self.status = AsyncStatus.error;
        self.error = error;
      },
      onGetOne: flow(onPromise(self)),
      onCreate: flow(onPromise(self)),
      onDelete: flow(onPromise(self)),
      onUpdate: flow(onPromise(self)),
    }));
}

export function AsyncModels<T extends IAnyModelType>(name: string, model: T): IModelType<AsyncModelTypes<T>, any> {
  return types
    .model(name, {
      status: types.optional(types.enumeration('status', [...Object.values(AsyncStatus)]), AsyncStatus.default),
      data: types.array(model),
      error: types.maybeNull(AnyModel),
      count: types.optional(types.number, 0),
    } as AsyncModelTypes<T>)
    .views((self: Instance<T>) => ({
      get isPending() {
        return self.status === AsyncStatus.pending;
      },
      get isReady() {
        return self.status === AsyncStatus.ready;
      },
      get isError() {
        return self.status === AsyncStatus.error;
      },
    }))
    .actions((self: Instance<T>) => ({
      onDefault() {
        self.status = AsyncStatus.default;
        self.error = null;
        self.data = [];
      },
      onPending() {
        self.status = AsyncStatus.pending;
        self.error = null;
      },
      onReady(data, count) {
        self.status = AsyncStatus.ready;
        self.error = null;
        self.data = data;
        self.count = data?.count || 0;
      },
      onError(error: Error) {
        self.status = AsyncStatus.error;
        self.error = error;
      },
      onGetAll: flow(onPromise(self)),
    }));
}
