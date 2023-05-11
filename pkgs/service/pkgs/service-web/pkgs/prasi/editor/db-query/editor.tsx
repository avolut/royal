import { FC, Fragment, useEffect } from "react";
import { apiClient, dbClient } from "web-init";
import { g } from "web-init/src/types";
import { useLocal } from "web-utils";
import { ParsedQuery } from "../../../../../../../../app/srv/api/built-in/_parsejs";
import { Form } from "../../form/form";
import { FormCSS } from "../editor-css";
import { SelectField } from "./select";
import { WhereField } from "./where";
import { PrasiEditorArg } from "web-types/prasi";
import { queryToCode } from "./query-to-code";
import { List } from "../../list/list";
import produce from "immer";

const w = window as unknown as {
  dbTables: string[];
};

export const EditorDBQuery: FC<{
  apiURL?: string;
  Coditor: PrasiEditorArg["Coditor"];
  Btn: PrasiEditorArg["Btn"];
  value: string;
  onChange: (value: string, parsed: null | ParsedQuery) => void;
}> = ({ apiURL, value, onChange, Coditor, Btn }) => {
  const api: (typeof g)["api"] = !apiURL
    ? (window as any).api
    : apiClient((window as any).apiEntry, apiURL);

  const db: (typeof g)["db"] = !apiURL
    ? (window as any).db
    : dbClient("db", apiURL);

  const local = useLocal({
    ready: false,
    parsed: null as null | ParsedQuery,
    tables: [] as string[],
    select: true,
    where: true,
    code: false,
    loading: false,
    query: async () => {},
    count: 0,
  });

  const init = () => {
    db._tables().then((e) => {
      w.dbTables = e;
      local.tables = w.dbTables;
      local.render();
    });
    local.tables = w.dbTables || [];

    if (value) {
      api._parsejs(value).then((result) => {
        if (result && result.parsed && result.parsed.length > 0) {
          local.parsed = produce(result.parsed[0], () => {});
          local.render();
        }
      });
    } else {
      local.parsed = produce(
        {
          type: "query",
          table: local.tables[0],
          ctx: { start: 0, end: 0 },
          select: {},
          where: {},
        },
        () => {}
      );
    }

    local.ready = true;
  };
  useEffect(() => {
    onChange(local.parsed ? queryToCode(local.parsed) : "", local.parsed);
  }, [local.parsed]);

  if (!local.ready) {
    init();
  }

  if (!local.ready || !local.parsed || local.tables.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-stretch w-full h-full">
      <Form
        formID="editor-db-query"
        value={local.parsed}
        onChange={(value) => {
          local.parsed = produce(value, () => {});
          local.render();
        }}
        className={cx(
          FormCSS,
          css`
            .field {
              padding: 0px;
            }
            font-size: 13px;

            input {
              font-size: 12px;
            }
          `
        )}
      >
        {({ Field, value, update }) => {
          return (
            <div className="flex flex-1 flex-col">
              <div className="flex flex-row justify-between border-b p-1 ">
                <div></div>
                <div className="flex items-center space-x-1">
                  <div
                    className="btn cursor-pointer bg-blue-600 hover:bg-blue-500 border  border-blue-600 rounded-sm text-xs px-2 select-none active:bg-blue-700 flex items-center text-white"
                    onClick={async () => {
                      await local.query();
                    }}
                  >
                    Query ➠
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-1 items-stretch select-none ">
                <div className="flex flex-col items-end w-[25px] border-r py-1 space-y-1">
                  <div
                    className={cx(
                      "cursor-pointer hover:bg-blue-50 hover:border-500 border border-r-0 w-[20px] h-[70px] flex items-center justify-center",
                      local.select
                        ? "text-blue-800 border-l-2 border-l-blue-500"
                        : "text-slate-400"
                    )}
                    onClick={() => {
                      if (local.code) {
                        local.where = true;
                        local.select = true;
                      } else {
                        local.select = !local.select;
                      }
                      local.code = false;
                      local.render();
                    }}
                  >
                    <div className="-rotate-90">Select</div>
                  </div>
                  <div
                    className={cx(
                      "cursor-pointer hover:bg-blue-50 hover:border-500 border border-r-0 w-[20px] h-[70px] flex items-center justify-center",
                      local.where
                        ? "text-blue-800 border-l-2 border-l-blue-500"
                        : "text-slate-400"
                    )}
                    onClick={() => {
                      if (local.code) {
                        local.where = true;
                        local.select = true;
                      } else {
                        local.where = !local.where;
                      }
                      local.code = false;
                      local.render();
                    }}
                  >
                    <div className="-rotate-90">Where</div>
                  </div>
                  <div
                    className={cx(
                      "cursor-pointer hover:bg-blue-50 hover:border-500 border border-r-0 w-[20px] h-[70px] flex items-center justify-center",
                      local.code
                        ? "text-blue-800 border-l-2 border-l-blue-500"
                        : "text-slate-400"
                    )}
                    onClick={() => {
                      local.code = !local.code;

                      local.where = !local.code;
                      local.select = !local.code;

                      local.render();
                    }}
                  >
                    <div className="-rotate-90">Code</div>
                  </div>
                </div>
                {local.select && local.tables.length > 0 && (
                  <div className="flex flex-col relative overflow-auto border-r w-[250px]">
                    <div className="absolute inset-0 flex flex-col items-stretch">
                      <SelectField
                        Field={Field}
                        db={db}
                        tables={local.tables}
                        select={value.select}
                        table={value.table}
                        update={(tableName, v) => {
                          const newval = {
                            ...value,
                            table: tableName,
                            select: v,
                          };
                          update(newval);
                        }}
                      />
                    </div>
                  </div>
                )}
                {local.where && (
                  <div className="flex bg-slate-50 relative overflow-auto border-r w-[300px]">
                    <div className="absolute inset-0 flex flex-col items-stretch">
                      <WhereField
                        Field={Field}
                        db={db}
                        tables={local.tables}
                        where={value.where}
                        table={value.table}
                        Coditor={Coditor}
                        Btn={Btn}
                        update={(tableName, v) => {
                          const newval = {
                            ...value,
                            table: tableName,
                            where: v,
                          };

                          update(newval);
                        }}
                      />
                    </div>
                  </div>
                )}
                {local.code && local.parsed && (
                  <div className="border-r w-[550px] flex items-stretch">
                    <Coditor
                      lang="js"
                      value={queryToCode(local.parsed)}
                      onChange={(val) => {}}
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col items-stretch">
                  <div className="flex items-stretch border-b bg-gray-50 min-h-[20px]">
                    <div className="border-r px-3 py-1">
                      Count: {local.count}
                    </div>

                    {local.loading && (
                      <div className="border-r px-3 py-1">Loading...</div>
                    )}
                  </div>
                  <div className="flex flex-1">
                    {local.parsed && (
                      <List
                        load={{
                          from: "DB Query",
                          query: local.parsed,
                          bindQueryReload: (reload) => {
                            local.query = reload;
                          },
                        }}
                        mode="table"
                        onLoaded={(items) => {
                          local.count = items.length;
                          local.render();
                        }}
                        onLoading={(loading) => {
                          local.loading = loading;
                          local.render();
                        }}
                        listID="db-query-list"
                      >
                        {({ Row, Field, item }) => {
                          return (
                            <Row>
                              {Object.keys(item).map((e) => (
                                <Field key={e} name={e} />
                              ))}
                            </Row>
                          );
                        }}
                      </List>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Form>
    </div>
  );
};
