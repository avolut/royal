import get from "lodash.get";
import { ReactElement } from "react";
import { StataBind } from "../../common/common";
import { StataMode } from "../../common/mode";

export type StataModeProps = Record<StataMode, ReactElement>;

export const baseBehavior = <T>(mode: StataMode, bind: StataBind<T>) => {
  return {
    // on init akan di jalankan di stata root
    onInit: ((arg) => {
      const found =
        mode === "root"
          ? bind._internal.behavior
          : (get(bind._internal.behavior, mode) as any);

      if (found) {
        triggerModeChanged(bind as any, found, mode);
      } else {
        console.warn(
          `Failed initializing behavior, cannot access ${mode} in`,
          bind._internal.behavior
        );
      }
    }) as StataBehaviorFunc<{}>,

    // ketika ada perubahan bind.mode.root maka ini akan di eksekusi
    onModeChanged: (() => {
      // jika return false, akan mencegah root re-render
      // lihat event stata root onInit
      return true;
    }) as StataBehaviorFunc<{}, boolean>,

    element: (() => ({} as any)) as StataBehaviorFunc<
      T,
      Partial<StataModeProps>
    >,
  };
};

export type StataBehaviorFunc<K, J = any> = (arg: K) => J | Promise<J>;

const triggerModeChanged = <T>(
  bind: StataBind<T>,
  root: { onModeChanged: StataBehaviorFunc<{}, boolean> },
  mode: StataMode
) => {
  const internal = bind._internal;

  if (
    bind.mode[mode] &&
    !shallowEqual(internal.lastMode[mode], bind.mode[mode])
  ) {
    const mc = root.onModeChanged;

    if (mc && mc({ bind }) !== false) {
      bind.render(mode);
    } else {
      console.warn("Warning onModeChange is not found on", root);
    }
  }
};

function shallowEqual(object1: any, object2: any) {
  const keys1 = Object.keys(object1 || {});
  const keys2 = Object.keys(object2 || {});
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }
  return true;
}

export const baseFunc = <K, J = any>(fn?: StataBehaviorFunc<K, J>) => {
  if (!fn) {
    return (async () => {}) as Exclude<typeof fn, undefined>;
  }
  return fn;
};
