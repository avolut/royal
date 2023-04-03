import { useRef, useState } from "react";

import "../../web-init/src/types";

export const useLocal = <T extends object>(
  data: T,
  effect?: (arg: {
    init: boolean;
  }) => Promise<void | (() => void)> | void | (() => void),
  deps?: any[]
): {
  [K in keyof T]: T[K] extends Promise<any> ? "loading" | Awaited<T[K]> : T[K];
} & { render: () => void } => {
  const [, _render] = useState({});
  const _ = useRef({
    data: data as unknown as T & { render: () => void },
    deps: (deps || []) as any[],
    ready: false,
  });
  const local = _.current;

  if (local.ready === false) {
    for (const [k, v] of Object.entries(data)) {
      if (typeof v === "object" && v instanceof Promise) {
        (local.data as any)[k] = "loading";
        v.then((resolved) => {
          (local.data as any)[k] = resolved;
          local.data.render();
        });
      }
    }

    local.data.render = () => {
      _render({});
    };
    local.ready = true;

    if (effect) {
      setTimeout(() => {
        effect({ init: true });
      });
    }
  } else {
    if (local.deps.length > 0 && deps) {
      for (const [k, dep] of Object.entries(deps) as any) {
        if (local.deps[k] !== dep) {
          local.deps[k] = dep;

          // local.data = { ...data } as any;
          // local.data.render = () => _render({});
          if (effect) {
            setTimeout(() => {
              effect({ init: false });
            });
          }
          break;
        }
      }
    }
  }

  return local.data as any;
};
