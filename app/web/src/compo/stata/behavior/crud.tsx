import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
} from "@fluentui/react-components";
import get from "lodash.get";
import { StataBind, StataData } from "../common/common";
import { suggestDefinition } from "../common/db-def";
import { suggestLayout } from "../common/layout";
import { StataAllMode } from "../common/mode";

import { FormSummary } from "../detail/form/status";
import { CloseIcon } from "../icons/close";
import { FormConfig, paramsHasPk, saveFn } from "./form";
import { ListConfig } from "./list";
import { BehaviorBind, createBehavior } from "./util/creator";
import { OriginalBehavior, originalBehavior } from "./util/original";

type CrudConfig<T> = {
  mode?: "full-page" | "side-list" | "popup";
  navigate?: boolean;
  list?: ListConfig<T>;
  form?: FormConfig<T>;
};

export const crud = createBehavior((config: CrudConfig<unknown>) => {
  return (bind: StataBind<unknown>) => {
    bind.state.behavior = "crud";
    const org = originalBehavior(bind);
    const mode = get(config, "mode", "full-page");
    const shouldNav = get(config, "navigate", true);
    bind.state.crud.shouldNav = shouldNav;

    return {
      async onInit(arg) {
        const url = __CURPAGE__.url as string;
        let urlParts = "";
        const base = getBaseUrl(url);
        if (shouldNav) {
          if (base) urlParts = pathname.substring(base.length);
        } else if (bind.state.crud.urlParts) {
          urlParts = bind.state.crud.urlParts;
        }

        if (urlParts) {
          // kita punya urlParts, berarti harus render detail
          bind.mode.root = "detail";

          if (mode === "popup") {
            bind.mode.root = [
              "list",
              (renderMode) => (
                <Dialog
                  open={true}
                  onOpenChange={(e, { open }) => {
                    if (!open && base) {
                      if (shouldNav) {
                        navigate(base);
                      } else {
                        bind.state.crud.urlParts = "";
                        bind.render("root");
                      }
                    }
                  }}
                >
                  <DialogSurface
                    className={cx(css`
                      padding: 0 !important;
                    `)}
                  >
                    <DialogBody
                      className={cx(css`
                        border-radius: 6px !important;
                        row-gap: 0 !important;
                        column-gap: 0 !important;
                      `)}
                    >
                      <DialogContent>
                        <Button
                          className="absolute top-0 right-0 translate-x-full -translate-y-full"
                          icon={<CloseIcon />}
                          appearance="transparent"
                          onClick={() => {
                            if (shouldNav) {
                              navigate(base);
                            } else {
                              bind.state.crud.urlParts = "";
                              bind.render("root");
                            }
                          }}
                        />
                        {renderMode("detail")}
                      </DialogContent>
                    </DialogBody>
                  </DialogSurface>
                </Dialog>
              ),
            ];
          }

          const load: any = bind._internal.load;
          if (typeof load === "function") {
            const res = await load(bind);
            bind._internal.dbdef = suggestDefinition(res[0]) as any;
          }

          if (bind._internal.dbdef.pk) {
            const pk = bind._internal.dbdef.pk;

            if (!bind.state.detail.db.params) {
              bind.state.detail.db.params = {
                where: {},
              };
            }
            const prms: any = bind.state.detail.db.params;
            if (config.form?.params) {
              for (const [k, v] of Object.entries(config.form?.params)) {
                prms[k] = v;
              }
            }

            if (urlParts === "_new") {
              bind.data.detail = {};
              bind.state.detail.status = "ready";

              prms.where = {};
            } else {
              bind.state.detail.status = "loading";

              if (!prms.where) {
                prms.where = {};
              }

              (prms.where as any)[pk[0]] = decodeURIComponent(urlParts);
            }

            bind.render("detail");
          }

          const onLoad = get(config, "onLoad");
          if (onLoad) {
            bind.state.detail.db.onLoad = onLoad;
          }
        } else {
          bind.mode.root = "list";
          const dbparams = get(config, "list.params");
          if (dbparams) {
            bind.state.list.db.params = dbparams;
          }

          const onLoad = get(config, "onLoad");
          if (onLoad) {
            bind.state.list.db.onLoad = onLoad;
          }
          bind.state.list.action = get(config, "list.action", []);
        }

        org.onInit(arg);
      },
      detail: {
        async onInit(arg) {
          bind.state.detail.status = "ready";

          if (!bind.mode.detail) {
            const mode = get(config, "form.mode", "form");
            bind.state.detail.mode = mode;

            if (mode === "form") {
              bind.mode.detail = [
                "detail.title",
                "detail.form.status",
                "detail.form",
              ];
            } else {
              bind.mode.detail = ["detail.title", "detail.form"];
            }

            const title = get(config, "form.title");
            if (title) {
              bind.state.detail.title = title;
            }
          }

          bind.className["detail.form"] = cx(
            "detail-form flex flex-1 flex-col"
          );

          if (paramsHasPk(bind)) {
            const table = (db as any)[bind._internal.load];

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

          const onLoad = get(config, "form.onLoad");
          if (onLoad) onLoad();

          bind.render("detail");
        },
        suggestLayout() {
          const mode = get(config, "form.mode", "form");
          return get(config, "form.layout", [
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
          const save = saveFn({
            bind,
            async afterSave() {
              bind.state.list.status = "loading";

              if (shouldNav) {
                const url = __CURPAGE__.url;
                const base = getBaseUrl(url);
                navigate(base);
              } else {
                bind.state.crud.urlParts = "";
                bind.render("root");
              }
            },
          });

          const onSave: any = get(config, "form.onSave");
          if (typeof onSave === "function") {
            await onSave(save);
            return { valid: true };
          }

          const res = await save();

          return res;
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
      list: {
        async onInit() {
          if (config.list?.className) {
            bind.state.list.className = config.list.className as any;
          }

          const onRowClick = get(config, "list.onRowClick");

          if (onRowClick === false) {
            bind.state.list.className.row = "unclickable";
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
          if (get(config, "list.mode") === "flat") {
            bind.mode.list = [header, "list.flat"];
          }
          bind.className["list"] = cx("list relative flex flex-1 flex-col");

          if (bind.state.list.status === "loading") {
            await bind.action.list.query("reset");
          }

          bind.render("list");
        },
        onRowClick(arg: { row: any; idx: number }) {
          const onRowClick = get(config, "list.onRowClick");

          if (onRowClick === undefined) {
            const url = __CURPAGE__.url;
            const pk = bind._internal.dbdef.pk[0];

            const base = getBaseUrl(url);
            if (base && arg.row[pk]) {
              if (shouldNav) {
                navigate(base + encodeURIComponent(arg.row[pk]));
              } else {
                bind.state.crud.urlParts = arg.row[pk];
                bind.render("root");
              }
            }
          } else {
            if (onRowClick !== false) onRowClick(arg);
          }
        },
        suggestLayout() {
          return get(config, "list.layout", [[...suggestLayout(bind)]]);
        },
      },
    };
  };
}) as BehaviorBind<unknown> & {
  use: <T>(
    model: StataData<T>,
    config: CrudConfig<T> | ((bind: StataBind<T>) => CrudConfig<T>)
  ) => BehaviorBind<T>;
  extend: <T>(original: ReturnType<typeof originalBehavior>) => BehaviorBind<T>;
};

const getBaseUrl = (url: string) => {
  if (url.endsWith("**")) {
    return url.substring(0, url.length - 2);
  }

  if (url.endsWith("*")) {
    return url.substring(0, url.length - 1);
  }
  return url;
};
