import produce from "immer";
import {
  StataBehavior,
  StataBind,
  StataData,
  StataPartialBehavior,
} from "../../common/common";
import { originalBehavior } from "./original";

export type BehaviorBind<T> = (bind: StataBind<T>) => StataPartialBehavior<T>;

export const createBehavior = <T, K>(
  current: (config: K) => BehaviorBind<T>
) => {
  const res = current as unknown as BehaviorBind<T> & {
    use: BehaviorUse<T, K>;
    configFn?: (bind: StataBind<T>) => K;
  };
  res.use = (model, configFn) => {
    res.configFn = configFn;
    return res;
  };

  return res;
};

export type BehaviorUse<T, K> = (
  model: StataData<T>,
  config: (bind: StataBind<T>) => K
) => BehaviorBind<T>;

export const extendBehavior = <T>(
  original: StataPartialBehavior<T>,
  newbhv: StataPartialBehavior<T>
) => {
  const imorig = produce(original, () => {}) as any;

  const recurse = (target: any, original: any, draft: any, parent?: string) => {
    for (const k of Object.keys(original)) {
      if (typeof target[k] === "object") {
        draft[k] = {};
        recurse(
          target[k],
          original[k],
          draft[k],
          `${parent ? `${parent}.` : ""}${k}`
        );
      } else if (!!target[k]) {
        draft[k] = target[k];
      } else {
        draft[k] = original[k];
      }
    }
  };

  const res = produce(newbhv, (draft) => {
    recurse(newbhv, imorig, draft);
  });

  return res;
};
