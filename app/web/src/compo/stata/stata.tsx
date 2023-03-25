import produce from "immer";
import get from "lodash.get";
import { useRef } from "react";
import { useLocal } from "web-utils";
import { createAction, StataAction } from "./action/action";
import {
  BehaviorBind,
  createBehavior,
  extendBehavior
} from "./behavior/util/creator";
import { originalBehavior } from "./behavior/util/original";
import {
  StataBind, StataPartialBehavior,
  StataProps
} from "./common/common";
import { initDefData } from "./common/db-def";
import { renderMode, StataMode } from "./common/mode";
import { defaultState } from "./common/state";

export * from './local';

export const Stata = <T extends unknown>(prop: StataProps<T>) => {
  const raw = useRef({} as any);
  const urlParts = get(raw, "current.state.crud.urlParts");
  const deps = [...(prop.deps || [])];

  if (typeof prop.load === "object") {
    deps.push(prop.load);
  }

  const local = useLocal(
    {
      params: {} as any,
      className: {} as any,
      mode: { root: prop.mode || "" } as any,
      lastMode: { root: prop.mode || "" } as any,
      layout: {} as any,
      state: {} as any,
      renders: {} as Partial<Record<StataMode, () => void>>,
      init: {
        bind: false,
        ready: false,
      },
    },
    async ({ init }) => {
      raw.current.deps = deps;

      if (typeof prop.load === "object" && raw.current._internal) {
        raw.current._internal.load = prop.load;
      }

      if (init) {
        local.init.bind = true;
        const bind = generateBind(local, prop);

        bind.action = createAction({
          bind: bind,
        }) as StataAction<T> & StataAction<unknown>;

        const bhv = {
          config: null as any,
          configured: null as unknown as BehaviorBind<T>,
          final: null as unknown as StataPartialBehavior<T>,
        };

        if (typeof prop.behavior.configFn === "function") {
          bhv.config = prop.behavior.configFn(bind);
        } else if (typeof prop.behavior.configFn === "object") {
          bhv.config = prop.behavior.configFn;
        }

        const bhvinit = prop.behavior as Parameters<typeof createBehavior>[0];
        bhv.configured = bhvinit(bhv.config) as any;
        bhv.final = extendBehavior(
          originalBehavior(bind),
          bhv.configured(bind)
        );

        bind._internal.behavior = produce(bhv.final, (draft: any) => {
          if (prop.element) draft.element = prop.element as any;
        }) as any;

        initDefData(prop.load, bind).then(async () => {
          await bind._internal.behavior.onInit({ bind: bind });
          raw.current = bind;
          local.init.ready = true;
          local.render();
        });
      } else {
        await raw.current._internal.behavior.onInit({ bind: raw.current });
      }
    },
    [pathname, urlParts, ...deps]
  );
  local.renders["root"] = () => {
    local.render();
  };
  raw.current.loadingEl = prop.loadingEl || <>Loading</>;

  const init = local.init;

  return (
    <div className={prop.className || "stata flex flex-1"}>
      {init.ready ? (
        raw.current._internal.behavior.wrap({
          child: renderMode(
            raw.current,
            (behavior) => behavior.element,
            "root"
          ),
        })
      ) : (
        <div className="flex-1 flex items-center justify-center">
          {raw.current.loadingEl}
        </div>
      )}
    </div>
  );
};

export const generateBind = (bind: any, prop: StataProps<any>) => {
  const data = prop.state[0];
  return {
    mode: new Proxy(bind.mode, {
      get(target, p) {
        return target[p];
      },
      set(target, p, newValue) {
        bind.lastMode[p] = target[p];
        target[p] = newValue;
        return true;
      },
    }),
    data: data,
    deps: prop.deps || [],
    layout: new Proxy(bind.layout, {
      get(target, p) {
        if (!target[p]) {
          target[p] = {};
        }
        return target[p];
      },
      set(target, p, newValue) {
        target[p] = newValue;
        return true;
      },
    }),
    param: new Proxy(bind.params, {
      get(target, p) {
        if (!target[p]) {
          target[p] = {};
        }
        return target[p];
      },
      set(target, p, newValue) {
        target[p] = newValue;
        return true;
      },
    }),
    state: new Proxy(bind.state, {
      get(target, p) {
        if (!target[p]) {
          target[p] = (defaultState(bind) as any)[p] || {};
        }
        return target[p];
      },
      set(target, p, newValue) {
        target[p] = newValue;
        return true;
      },
    }),
    className: new Proxy(bind.className, {
      get(target, p) {
        if (p === "use") {
          return (arg: string, extend?: string) => {
            const res = !target[arg] ? `${extend}` : target[arg];
            return res || "flex";
          };
        }

        return target[p] || "flex";
      },
      set(target, p, newValue) {
        target[p] = newValue;
        return true;
      },
    }),
    action: null as any,
    render: (name) => {
      const render = bind.renders[name];

      if (render) {
        render();
      }
    },
    loadingEl: prop.loadingEl || <>Loading</>,
    _internal: {
      lastMode: bind.lastMode,
      dbdef: null as any,
      behavior: null as any,
      load: prop.load as any,
      setRender: (name, value) => {
        bind.renders[name] = value;
      },
    },
  } as StataBind<any>;
};
