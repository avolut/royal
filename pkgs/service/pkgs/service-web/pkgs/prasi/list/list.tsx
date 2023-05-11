import {
  FC,
  Fragment,
  ReactElement,
  ReactNode,
  isValidElement,
  useCallback,
  useEffect,
} from "react";
import { ListArg, ListGlobal, ListState } from "./global";
import { useGlobal, useLocal } from "web-utils";
import { createId } from "@paralleldrive/cuid2";
import produce from "immer";
import { PluginData } from "../form/global";
import { evalPluginScript } from "../editor/plugin-script";
import { PageGlobal } from "../../../../../../../app/web/src/base/global/page";
import { IWrap, createField } from "./field";
import { useList } from "./use-list";
import get from "lodash.get";
import { titleCase } from "../editor/form/editor-field/field-single";
import { queryToCode } from "../editor/db-query/query-to-code";

export const w = window as unknown as {
  isEditor: boolean;
  royalListLoad: Record<string, any[]>;
};

export const List: FC<ListArg<any>> = (arg) => {
  const { value, _element, listID } = arg;
  const local = useLocal({
    id: _element?.id || listID || createId(),
    inited: false,
    loading: false,
    initing: null as null | Promise<void>,
    lastLiveValue: null as any,
    forceReload: false,
    children: arg.children,
  });
  const page = useGlobal(PageGlobal);
  const listState = useGlobal(ListGlobal);
  const royal = arg._element?.pluginData?.royal as PluginData | undefined;

  useEffect(() => {
    if (local.inited) {
      listState.state[local.id].value = value || [];
      local.render();
    }
  }, [value]);

  const initList = useCallback(
    async (rendering?: true, forceReload?: boolean) => {
      const createListState = () => {
        return {
          id: local.id,
          prop: { ...arg },
          value: produce(arg.value, () => {}),
          update(list: any[], changedIndex?: number[]) {},
          render: local.render,
        } as ListState;
      };

      if (!listState.state[local.id]) {
        listState.state[local.id] = createListState();
      }

      let load = arg.load;

      if (royal && royal.list) {
        if (royal.list.onChangeExt) {
          await evalPluginScript({
            page,
            script: royal.list.onChangeExt,
            eval(fn: ListArg<any>["onChange"]) {
              listState.state[local.id].prop.onChange = fn;
            },
            item: arg._element,
          });
        }

        if (royal.list.mode === "edit") return;

        if (!load) {
          if (royal.list.load) {
            load = { from: royal.list.load };
            if (royal.list.load === "JS Script") {
              load.script = (royal.list.loadExt as any)[royal.list.load as any];
            } else if (royal.list.load === "DB Query") {
              const q = (royal.list.loadExt as any)[royal.list.load as any];
              if (q && q.js) {
                load.query = q.js;
              }
            }
          }
        }
      }

      if (load) {
        if (load.from === "DB Query" && load.query) {
          const reload = async () => {
            const shouldRunEvent = !rendering || local.inited;
            if (shouldRunEvent && arg.onLoading) {
              arg.onLoading(true);
            }
            local.loading = true;
            local.render();

            if (load?.query) {
              const script =
                typeof load.query === "string"
                  ? load.query
                  : queryToCode(load.query);

              const fn = new Function("db", "params", `return ${script}`);
              listState.state[local.id].value = produce(
                (await fn(db, page.params)) as any[],
                () => {}
              );

              if (shouldRunEvent && arg.onLoading) {
                arg.onLoading(false);
              }

              if (shouldRunEvent && arg.onLoaded) {
                arg.onLoaded(listState.state[local.id].value);
              }

              local.loading = false;
              local.render();
            }
          };

          if (load.bindQueryReload) {
            load.bindQueryReload(reload);
          }

          if (!local.inited || forceReload) {
            local.initing = reload();
            await local.initing;
            local.initing = null;
          }
        }

        if (load.from === "JS Script" && load.script?.jsBuilt) {
          if (!w.royalListLoad) w.royalListLoad = {};
          if (w.isEditor && w.royalListLoad[local.id]) {
            listState.state[local.id].value = produce(
              w.royalListLoad[local.id],
              () => {}
            );
            return;
          }

          evalPluginScript({
            page,
            script: load.script,
            async eval(fn) {
              w.royalListLoad[local.id] = await fn();
              if (!listState.state[local.id]) {
                listState.state[local.id] = createListState();
              }
              listState.state[local.id].value = produce(
                w.royalListLoad[local.id],
                () => {}
              );
              local.render();
            },
            item: arg._element,
          });
        }
      }
    },
    [
      arg.load?.from,
      arg.load?.query,
      arg.load?.script,
      arg.load?.json,
      royal?.list?.mode,
    ]
  );

  const isEdit = royal?.list?.mode === "edit" && w.isEditor;

  if (isEdit) {
    if (!local.lastLiveValue) {
      if (listState.state[local.id]) {
        local.lastLiveValue = listState.state[local.id].value;

        if (royal.list) {
          const val: any = {};
          for (const c of royal.list.fields) {
            val[c] = `[${c}]`;
          }
          listState.state[local.id].value = [val];
        }
      } else {
        local.forceReload = true;
      }
    }
  } else {
    if (local.lastLiveValue) {
      listState.state[local.id].value = local.lastLiveValue;
      local.lastLiveValue = null;
      local.forceReload = true;
    }
  }

  useEffect(() => {
    if (!local.inited) {
      local.inited = true;
      local.render();

      if (local.initing !== null) {
        local.initing.then(() => {
          if (arg.onLoaded) arg.onLoaded(listState.state[local.id].value);
        });
      }
    } else {
      if (!isEdit) {
        initList(undefined, local.forceReload);
        if (local.forceReload) {
          local.forceReload = false;
          if (local.initing) {
            local.initing.then(() => {
              if (arg.onLoaded) arg.onLoaded(listState.state[local.id].value);
              page.render();
            });
          }
        }
      }
    }
  }, [initList, isEdit, local.forceReload]);

  if (!local.inited) {
    initList(true);
  }

  const listvalue = listState.state[local.id].value || [];

  if (arg.mode === "table") {
    const tableClass = arg.tableClassName || {};

    return (
      <div className={cx(arg.className, "flex flex-1 relative overflow-auto")}>
        <table className={cx("absolute divide-y divide-gray-300")}>
          <thead
            className={cx(
              "table-thead",
              get(tableClass, "head.container", "bg-gray-50")
            )}
          >
            <tr className={cx("table-thead-tr", get(tableClass, "head.row"))}>
              <Children
                {...arg}
                idx={0}
                listID={local.id}
                wrap={({ prop }) => {
                  return (
                    <th
                      className={cx(
                        get(
                          tableClass,
                          "head.column",
                          "table-th sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter whitespace-nowrap"
                        ),
                        prop.className
                      )}
                    >
                      {prop.title || titleCase(prop.name)}
                    </th>
                  );
                }}
              />
            </tr>
          </thead>
          <tbody
            className={get(
              tableClass,
              "body.container",
              "divide-y divide-gray-200 bg-white"
            )}
          >
            {listvalue.map((_, idx) => {
              return (
                <Children
                  key={idx}
                  {...arg}
                  idx={idx}
                  listID={local.id}
                  wrapRow={({ children }) => {
                    return (
                      <tr className={get(tableClass, "body.row")}>
                        {children}
                      </tr>
                    );
                  }}
                  wrap={({ children, prop }) => {
                    return (
                      <td
                        className={cx(
                          get(
                            tableClass,
                            "body.column",
                            "whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                          ),
                          prop.className
                        )}
                      >
                        {children}
                      </td>
                    );
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  const active = document.activeElement as HTMLDivElement;
  if (!active?.isContentEditable) {
    local.children = arg.children;
  }

  return (
    <div className={arg.className}>
      {listvalue.map((_, idx) => {
        return (
          <Children
            key={idx}
            {...arg}
            children={local.children}
            idx={idx}
            listID={local.id}
          />
        );
      })}
    </div>
  );
};

const Children = ({
  children,
  idx,
  listID,
  wrap,
  wrapRow,
}: ListArg<any> & {
  idx: number;
  listID: string;
  wrap?: IWrap;
  wrapRow?: (arg: { children: any }) => ReactNode;
}) => {
  const local = useLocal({
    field: createField(listID, idx, wrap),
    row: (arg?: { children: any }) => {
      if (wrapRow) {
        return (
          <Fragment key={idx}>{wrapRow({ children: arg?.children })}</Fragment>
        );
      }
      if (arg && arg.children) {
        return arg.children;
      }
      return null;
    },
  });

  const list = useList(listID);
  if (!list || (list && !list.value)) return null;
  const item = list.value[idx] || {};

  const el = children({
    list: list.value,
    idx,
    item,
    state: list,
    Field: local.field,
    Row: local.row,
    update(value) {
      list.value = value;
      list.render();
    },
  });

  return isValidElement(el) ? el : <Fragment key={idx} />;
};
