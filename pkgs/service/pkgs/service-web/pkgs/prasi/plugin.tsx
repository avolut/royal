import { lazy } from "react";
import { Form } from "./form/form";
import type { List } from "./list/list";
import { PluginID } from "./prasi";

const w = window as unknown as {
  royalPlugin?: {
    list?: typeof List;
    form?: typeof Form;
  };
};

initPrasiPlugin({
  id: PluginID,
  inject: {
    RoyalForm: lazy(() => {
      return new Promise<{
        default: React.ComponentType<any>;
      }>(async (resolve) => {
        if (!w.royalPlugin) {
          w.royalPlugin = {};
        }

        if (!w.royalPlugin.form) {
          w.royalPlugin.form = (await import("./form/form")).Form;
        }

        return resolve({ default: w.royalPlugin?.form });
      });
    }),
    RoyalList: lazy(() => {
      return new Promise<{
        default: React.ComponentType<any>;
      }>(async (resolve) => {
        if (!w.royalPlugin) {
          w.royalPlugin = {};
        }

        if (!w.royalPlugin.list) {
          w.royalPlugin.list = (await import("./list/list")).List;
        }

        return resolve({ default: w.royalPlugin.list });
      });
    }),
  },
  page: async () => {
    if (!w.royalPlugin) {
      w.royalPlugin = {
        form: (await import("./form/form")).Form,
        list: (await import("./list/list")).List,
      };
    }
  },
  editor: async (arg) => {
    const { editor } = await import("./editor/editor");
    return editor(arg);
  },
});
