import get from "lodash.get";
import { StataBind, StataData, StataLayout } from "../common/common";
import { suggestLayout } from "../common/layout";
import { StataAllMode } from "../common/mode";

import { BehaviorBind, createBehavior } from "./util/creator";
import { OriginalBehavior, originalBehavior } from "./util/original";

export type ListConfig<T extends unknown> = {
  layout?: StataLayout<T, object & { title?: string; width?: number }>[];
  mode?: "table" | "flat";
  className?: { row?: string };
  params?: StataBind<T>["state"]["list"]["db"]["params"];
  action?: StataBind<T>["state"]["list"]["action"];
  onRowClick?: false | OriginalBehavior<T>["list"]["onRowClick"];
  onLoad?: () => Promise<void>;
};

export const list = createBehavior((config: ListConfig<unknown>) => {
  return (bind: StataBind<unknown>) => {
    const org = originalBehavior(bind);
    return {
      onInit(arg) {
        bind.mode.root = "list";
        const dbparams = get(config, "params");
        if (dbparams) {
          bind.state.list.db.params = dbparams;
        }

        const onLoad = get(config, "onLoad");
        if (onLoad) {
          bind.state.list.db.onLoad = onLoad;
        }

        bind.state.list.action = get(config, "action", []);

        org.onInit(arg);
      },
      list: {
        async onInit() {
          if (config.className) {
            bind.state.list.className = config.className as any;
          }

          const header: StataAllMode = (renderMode) => {
            return (
              <div className="list-header flex items-stretch">
                {renderMode("list.filter")}
                {renderMode("list.action")}
              </div>
            );
          };
          if (!bind.mode.list) bind.mode.list = [header, "list.table"];
          if (get(config, "mode") === "flat") {
            bind.mode.list = [header, "list.flat"];
          }
          bind.className["list"] = cx("list relative flex flex-1 flex-col");
          await bind.action.list.query("reset");
          bind.render("list");
        },
        suggestLayout() {
          const suggestedLayout = suggestLayout(bind);
          return get(config, "layout", [[...suggestedLayout]]);
        },
      },
    };
  };
}) as BehaviorBind<unknown> & {
  use: <T>(
    model: StataData<T>,
    config: ListConfig<T> | ((bind: StataBind<T>) => ListConfig<T>)
  ) => BehaviorBind<T>;
  extend: <T>(original: ReturnType<typeof originalBehavior>) => BehaviorBind<T>;
};
