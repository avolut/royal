import { useRef, useState } from "react";

import "../../web-init/src/types";

export const useLocal = <T extends object>(
  data: T,
  effect?: (arg: {
    init: boolean;
  }) => Promise<void | (() => void)> | void | (() => void),
  deps?: any[]
): T & { render: () => void } => {
  // if (typeof isSSR !== "undefined" && isSSR)
  //   return { ...data, render: () => {} } as any;

  const [, _render] = useState({});
  const _ = useRef({
    data: data as unknown as T & { render: () => void },
    deps: (deps || []) as any[],
    init: false,
  });
  const local = _.current;

  if (local.init === false) {
    local.data.render = () => {
      _render({});
      // kalau pakai stratTransition ada bug jumping cursor
      // startTransition(() => _render({}));
    };
    local.init = true;

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

  return local.data;
};
