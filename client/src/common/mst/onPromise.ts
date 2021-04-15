import { Instance, IAnyModelType } from 'mobx-state-tree';
import { Response } from 'common/axios';

type ActionType = 'pending' | 'ready' | 'error';

type FunctionAction = (props) => void;

export type PromiseOptions = {
  dataKey?: string[] | string;
  actions?: any;
};

const onAction = async (action: FunctionAction | FunctionAction[], props: any) => {
  if (!action) return;

  if (Array.isArray(action)) {
    await Promise.all(
      action.map((actionItem: FunctionAction) => {
        if (typeof action === 'function') return actionItem(props);
        return;
      }),
    );
  } else if (typeof action === 'function') {
    await action(props);
  }
};

const onActions = (actionType: ActionType) => async (actions: any, props?: any) => {
  for (const [key, value] of Object.entries(actions)) {
    if (key === actionType) await onAction(value as any, props);
  }
};

export function onPromise<T extends IAnyModelType>(self: Instance<T>) {
  return function* generator(promise: (props?: any) => Promise<Response>, options?: PromiseOptions): any {
    const dataKey = options?.dataKey;
    const actions = options?.actions || {};

    self.onPending();
    yield onActions('pending')(actions);

    const { status, data }: Response = yield promise();
    if (status >= 200 && status < 300) {
      const doneObject: any = {};

      if (data.count) doneObject.count = data.count;

      if (Array.isArray(dataKey)) {
        // key string[]
        dataKey.forEach((key: string) => (doneObject[key] = data[key]));
      } else if (dataKey && data[dataKey]) {
        // key string
        self.onReady(data[dataKey]);
      } else {
        self.onReady(data);
      }

      yield onActions('ready')(actions, data);
    } else {
      self.onError({ status, data });

      yield onActions('error')(actions, { status, data });
    }
  };
}
