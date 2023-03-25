import { Button } from "@fluentui/react-components";
import produce from "immer";
import get from "lodash.get";
import { ReactNode } from "react";
import { ActionResult } from "../action/action";
import { FieldMeta, StataBind, StataData, StataLayout } from "../common/common";
import { suggestDefinition } from "../common/db-def";
import { suggestLayout } from "../common/layout";

import { FormSummary } from "../detail/form/status";
import { BehaviorBind, createBehavior } from "./util/creator";
import { OriginalBehavior, originalBehavior } from "./util/original";
import { getPrefix, parseUrl } from "./util/parse-url";
import { prepareData } from "./util/prep-data";

export type FormConfig<T> = {
  layout?: StataLayout<
    T,
    Partial<Omit<FieldMeta<T>, "children" | "sibCount" | "idx">>
  >[];
  title?: ReactNode | (() => ReactNode | Promise<ReactNode>);
  mode?: "form" | "view";
  params?: StataBind<T>["state"]["list"]["db"]["params"];
  action?: StataBind<T>["state"]["list"]["action"];
  onLoad?: () => Promise<void>;
  onSave?: (
    save: (data?: Partial<T>) => Promise<ActionResult>
  ) => Promise<void>;
};

export const form = createBehavior((config: FormConfig<unknown>) => {
  return (bind: StataBind<unknown>) => {
    const org = originalBehavior(bind);

    return {
      async onInit(arg) {
        bind.mode.root = "detail";

        const load: any = bind._internal.load;
        if (typeof load === "function") {
          const res = await load(bind);
          bind.data.detail = res[0];
          bind._internal.dbdef = suggestDefinition(res[0]) as any;
        } else if (typeof load === "string") {
          fillParamsFromURL(bind);
        } else if (typeof load === "object") {
          bind.data.detail = load;
          bind._internal.dbdef = suggestDefinition(load) as any;
        }

        if (bind._internal.dbdef.pk) {
          if (!bind.state.detail.db.params) {
            bind.state.detail.db.params = {};
          }

          if (config.params) {
            for (const [k, v] of Object.entries(config.params)) {
              (bind.state.detail.db.params as any)[k] = v;
            }
          }
        }

        const onLoad = get(config, "onLoad");
        if (onLoad) {
          bind.state.detail.db.onLoad = onLoad;
        }

        org.onInit(arg);
      },
      detail: {
        async onInit(arg) {
          // console.log("detail", bind.state.detail);
          bind.state.detail.status = "ready";

          if (!bind.mode.detail) {
            const mode = get(config, "mode", "form");
            bind.state.detail.mode = mode;

            const title = get(config, "title");
            if (title) {
              bind.state.detail.title = title;
            }

            if (mode === "form") {
              bind.mode.detail = ["detail.form.status", "detail.form"];
            } else {
              bind.mode.detail = ["detail.form"];
            }
          }

          bind.className["detail.form"] = cx(
            "detail-form flex flex-1 flex-col"
          );

          const load: any = bind._internal.load;
          if (typeof load === "function" || typeof load === "object") {
            setTimeout(() => bind.render("root"));
            return;
          }
          bind.data.detail = {};

          if (paramsHasPk(bind)) {
            const table = db[bind._internal.load] as any;

            if (table) {
              bind.state.detail.status = "loading";
              bind.render("detail");

              try {
                const res = await table["findFirst"](
                  bind.state.detail.db.params
                );

                bind.data.detail = res;
                bind.state.detail.db.loaded = true;

                bind.state.detail.status = "ready";
              } catch (e) {
                bind.state.detail.status = "load-error";
                bind.state.detail.errors = {
                  stata:
                    "Data gagal dimuat. Mohon periksa kembali URL yang Anda tuju.",
                };
                console.warn(e);
              }
            }
          }
          bind.render("detail");
        },
        suggestLayout() {
          const mode = get(config, "mode", "form");
          return get(config, "layout", [
            ...suggestLayout(bind),
            mode === "form" && (
              <>
                <div className="flex-1 flex flex-col items-stretch">
                  <Button
                    type="submit"
                    disabled={bind.state.detail.status === "saving"}
                    appearance="primary"
                  >
                    Save
                  </Button>
                </div>
              </>
            ),
          ]);
        },

        element() {
          return {
            "detail.form.status": (
              <FormSummary bind={bind} excludeFieldError={true} />
            ),
          };
        },

        async onSave() {
          const save = saveFn({ bind });

          if (config.onSave) {
            await config.onSave(save);
            return { valid: true };
          }

          return await save();
        },

        field: {
          async onChange({
            field,
            value,
          }: Parameters<
            OriginalBehavior<unknown>["detail"]["field"]["onChange"]
          >[0]) {
            await bind.action.detail.validate({ [field.name]: value });
            return true;
          },
        },
      },
    };
  };
}) as BehaviorBind<unknown> & {
  use: <T>(
    model: StataData<T>,
    config: (bind: StataBind<T>) => FormConfig<T>
  ) => BehaviorBind<T>;
  extend: <T>(original: ReturnType<typeof originalBehavior>) => BehaviorBind<T>;
};

export const paramsHasPk = (bind: any) => {
  const pk = bind._internal.dbdef.pk;
  const params = bind.state.detail.db.params as any;
  if (!params) return false;

  for (const e of pk) {
    if (!params.where[e]) return false;
  }
  return true;
};

const fillParamsFromURL = <T extends unknown>(bind: StataBind<T>) => {
  if (bind._internal.dbdef) {
    const pk = bind._internal.dbdef.pk;
    const { params } = parseUrl(pk.map((e: any) => `:${e}`).join("/") + "/*");
    const where: any = {};
    for (const e of pk) {
      where[e] = (params as any)[e];
    }
    bind.state.detail.db.params = { where };
  }
};

const genUrlFromData = (bind: any, data: any) => {
  const pk = bind._internal.dbdef.pk;
  return `${getPrefix()}${pk.map((e: string) => data[e] + "").join("/")}`;
};

export const saveFn = <T extends unknown>({
  bind,
  afterSave,
}: {
  bind: StataBind<T>;
  afterSave?: () => void | Promise<void>;
}) => {
  return async (data?: Partial<T>) => {
    const load = bind._internal.load;
    if (typeof load === "string") {
      const table: any = db[load];

      const preparedData = data ? data : prepareData(bind);

      if (table && table.create) {
        bind.state.detail.status = "saving";
        bind.render("detail");
        try {
          let res: any;
          const params: any = bind.state.detail.db.params;

          if (!bind.state.detail.db.loaded) {
            res = await table.create({ data: preparedData });
            const url = genUrlFromData(bind, res);

            navigate(url);
          } else {
            res = await table.update({ ...params, data: preparedData });

            bind.data.detail = produce(res, () => {}) as T;
            bind.state.detail.db.saved = true;

            bind.state.detail.status = "saved";
            bind.render("detail");
          }
        } catch (e) {
          bind.state.detail.status = "save-error";

          bind.state.detail.errors = {
            stata:
              "Sistem sedang mengalami gangguan. Mohon ulangi beberapa saat lagi.",
          };
          bind.render("detail");
          console.error(e);
        }
      }

      if (afterSave) {
        await afterSave();
      }

      return { valid: true };
    }

    return {
      valid: false,
      reason: {
        stata:
          "Mohon ubah (extend) behavior detail.onSave, karena nama tabel tidak ditemukan.",
      },
    };
  };
};
