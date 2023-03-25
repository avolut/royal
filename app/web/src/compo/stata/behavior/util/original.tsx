import get from "lodash.get";
import { ReactElement } from "react";
import { ActionResult } from "../../action/action";
import { FieldMeta, StataBind, UpdateField } from "../../common/common";
import { StataMode } from "../../common/mode";

export type StataModeProps = Record<StataMode, ReactElement>;

export type StataBehaviorFunc<T, K, J = any> = (
  arg: { bind: StataBind<T> } & Omit<K, "bind">
) => J | Promise<J>;

export type StataBehaviorFuncNoAwait<T, K, J = any> = (
  arg: { bind: StataBind<T> } & Omit<K, "bind">
) => J;

export const originalBehavior = <T extends unknown>() => {
  return {
    ...baseBehavior("root"),
    wrap: baseFunc<T, { child: ReactElement }, ReactElement>((arg) => {
      return (
        <div
          className={cx(
            "stata-wrap flex flex-1 flex-col",
            css`
              .field {
                padding: 5px 10px;
              }
            `
          )}
        >
          {arg.child}
        </div>
      );
    }),
    detail: {
      ...baseBehavior("detail"),
      form: {
        ...baseBehavior("detail.form"),
      },
      field: {
        ...baseBehavior("detail.field"),
        // jika return false, akan mencegah default update
        onChange: baseFunc<
          T,
          {
            value: any;
            field: FieldMeta;
            update: UpdateField<T>;
          },
          boolean
        >(async ({ bind, field, value }) => {
          return true;
        }),
      },
      suggestLayout: baseFunc(),
      onSave: baseFunc<T, {}, ActionResult>(() => {
        return { valid: true };
      }),
      onBack: baseFunc(),
      onValidate: (async ({ bind, result }) => {
        if (result.valid) {
          if (bind.state.detail.status !== "saved") {
            bind.state.detail.status = "unsaved";
          }
        } else {
          bind.state.detail.status = "error";
        }
        bind.render("detail");
        return result;
      }) as StataBehaviorFunc<
        T,
        { data: T; result: ActionResult },
        ActionResult
      >,
      onLoaded: ((arg) => {}) as StataBehaviorFunc<T, {}>,
    },
    list: {
      ...baseBehavior("list"),
      suggestLayout: baseFunc(),
      column: {
        onClick: ((arg) => {}) as StataBehaviorFunc<
          T,
          {
            value: any;
            field: FieldMeta;
            update: UpdateField<T>;
          }
        >,
        onHeaderClick: ((arg) => {}) as StataBehaviorFunc<
          T,
          {
            value: any;
            field: FieldMeta;
            update: UpdateField<T>;
          }
        >,
        onChange: ((arg) => {}) as StataBehaviorFunc<
          T,
          {
            value: any;
            field: FieldMeta;
            update: UpdateField<T>;
          }
        >,
      },
      onLoaded: ((arg) => {}) as StataBehaviorFunc<T, {}>,
      onRowClick: ((arg) => {}) as StataBehaviorFunc<T, {}>,
    },
    tab: {
      ...baseBehavior("tab"),
      onTabClick: ((arg) => {}) as StataBehaviorFunc<T, {}>,
    },
  };
};

export const baseBehavior = <T extends unknown>(mode: StataMode) => {
  return {
    // on init akan di jalankan di stata root
    onInit: ((arg) => {
      const found =
        mode === "root"
          ? arg.bind._internal.behavior
          : (get(arg.bind._internal.behavior, mode) as any);

      if (found) {
        triggerModeChanged(arg.bind as any, found, mode);
      } else {
        console.warn(
          `Failed initializing behavior, cannot access ${mode} in`,
          arg.bind._internal.behavior
        );
      }
    }) as StataBehaviorFunc<T, {}>,

    // ketika ada perubahan bind.mode.root maka ini akan di eksekusi
    onModeChanged: ((arg) => {
      // jika return false, akan mencegah root re-render
      // lihat event stata root onInit
      return true;
    }) as StataBehaviorFunc<T, {}, boolean>,

    element: (() => ({} as any)) as StataBehaviorFunc<
      T,
      {},
      Partial<StataModeProps>
    >,
  };
};

export const baseFunc = <T extends unknown, K extends object, J = any>(
  fn?: StataBehaviorFunc<T, K, J>
) => {
  if (!fn) {
    return (async () => {}) as Exclude<typeof fn, undefined>;
  }
  return fn;
};

export const extendObject = (original: any, draft: any, extend: any) => {
  for (const [k, v] of Object.entries(original)) {
    if (!extend[k]) draft[k] = v;
    if (typeof extend[k] === "object") {
      extendObject(original[k], draft[k], extend[k]);
    }
  }
};

const triggerModeChanged = <T extends unknown>(
  bind: StataBind<T> & StataBind<unknown>,
  root: { onModeChanged: StataBehaviorFunc<T, {}, boolean> },
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
