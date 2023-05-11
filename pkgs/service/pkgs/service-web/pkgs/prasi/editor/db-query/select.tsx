import { FC, ReactNode, useCallback, useEffect } from "react";
import { g } from "web-init/src/types";
import { useLocal } from "web-utils";
import { ParsedQuery } from "../../../../../../../../app/srv/api/built-in/_parsejs";
import { FAttr } from "../../form/global";

export const SelectField: FC<{
  Field: FC<FAttr>;
  tables: string[];
  db: (typeof g)["db"];
  table?: string;
  rel?: string;
  depth?: number;
  update: (tableName: string, value: ParsedQuery["select"]) => void;
  select: ParsedQuery["select"];
  def?: Awaited<ReturnType<(typeof g)["db"]["_definition"]>>;
  del?: ReactNode;
}> = ({ Field, tables, table, update, rel, select, def, del, depth }) => {
  const local = useLocal(
    {
      def: def,
      defs: {} as Record<
        string,
        Awaited<ReturnType<(typeof g)["db"]["_definition"]>>
      >,
    },
    () => {
      loadDef();
    },
    [table]
  );

  const name = rel || table || "";
  const loadDef = useCallback(async () => {
    if (table) {
      local.def = await db._definition(table);
    }

    if (local.def && Object.keys(local.defs).length === 0) {
      const promises = [];

      for (const [k, r] of Object.entries(local.def.rels)) {
        promises.push(
          db._definition(r.modelClass).then((e) => {
            local.defs[r.modelClass] = e;
          })
        );
      }
      await Promise.all(promises);
    }
    local.render();
  }, [table]);

  const newcol: ParsedQuery["select"] = {};

  if (def) {
    local.def = def;
  }

  if (local.def) {
    for (const c of Object.values(local.def.columns)) {
      if (!select[c.name]) {
        newcol[c.name] = true;
      }
    }

    for (const [k, r] of Object.entries(local.def.rels)) {
      if (!select[r.modelClass]) {
        newcol[r.modelClass] = { select: {} };
      }
    }
  }

  return (
    <>
      <div
        className={cx(
          "flex space-x-1 justify-between border-b hover:bg-slate-100",
          !del && "p-1",
          del && "px-1 min-h-[22px]"
        )}
      >
        <div className="flex flex-1 items-center">
          <div
            className={cx(
              css`
                width: ${Math.max((depth || 0) - 1, 0) * 10}px;
              `
            )}
          ></div>
          {!depth && (
            <Field
              name="table"
              label={<></>}
              type="select"
              className="flex-1"
              value={table || ""}
              onChange={(val) => {
                update(val, select);
              }}
              items={tables}
            />
          )}
          {rel && <div className="">{rel}</div>}
        </div>
        <div className={cx("flex items-stretch")}>
          <div
            className={cx(
              "cursor-pointer bg-white hover:bg-blue-100 border-r-0 text-xs select-none active:bg-blue-200 flex place-items-center",
              !del && "border border-slate-400",
              del && "border-l",
              css`
                & > .field > .field-input {
                  padding: 0px;
                  border: 0px;
                  background: none;
                  input {
                    width: 0px !important;
                    opacity: 0 !important;
                  }
                  button {
                    background: none;
                    padding: 0px 5px;
                    margin: 0px;
                    position: relative;
                    height: 20px;
                    svg {
                      display: none;
                    }
                    &::before {
                      content: "+ Add";
                    }
                  }
                  .select-list {
                    position: fixed;
                    width: 150px;
                  }
                }
              `
            )}
          >
            <Field
              name="newcol"
              label={<></>}
              type="select"
              placeholder="Add Column"
              value={""}
              onChange={(value) => {
                update(name, { ...select, [value]: newcol[value] });
              }}
              items={Object.keys(newcol)}
            />
          </div>
          <div
            className={cx(
              "cursor-pointer bg-white hover:bg-blue-100 text-xs px-2 select-none active:bg-blue-200 flex place-items-center",
              !del && "border border-slate-400",
              del && "border-x "
            )}
            onClick={async () => {
              if (table) await loadDef();
              if (local.def) {
                const columns: ParsedQuery["select"] = {};
                for (const c of Object.values(local.def.columns)) {
                  if (!c.rel) {
                    columns[c.name] = true;
                  }
                }

                for (const [k, r] of Object.entries(local.def.rels)) {
                  columns[r.modelClass] = { select: {} };
                }

                update(name, columns);
              }
            }}
          >
            All
          </div>
          {del}
        </div>
      </div>

      {Object.entries(select)
        .sort((a, b) => {
          if (typeof a[1] === "object" && typeof b[1] !== "object") return 1;
          if (typeof a[1] !== "object" && typeof b[1] === "object") return -1;
          return 0;
        })
        .map(([key, value], idx) => {
          const relselect: ParsedQuery["select"] = {};

          if (local.defs[key]) {
            for (const c of Object.values(local.defs[key].columns)) {
              if (!c.rel && !c.pk) {
                relselect[c.name] = true;
              }
            }

            for (const [k, r] of Object.entries(local.defs[key].rels)) {
              relselect[r.modelClass] = {};
            }
          }

          const cdel = (
            <div
              className="text-red-600 cursor-pointer hover:bg-red-100  px-1 flex items-center"
              onClick={() => {
                const newsel = { ...select };
                delete newsel[key];
                update(name, newsel);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="none"
                viewBox="0 0 15 15"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          );

          return (
            <div
              key={key}
              className={cx("flex flex-col items-stretch select-none")}
            >
              {typeof value === "boolean" && (
                <>
                  <div className="flex items-stretch justify-between border-b h-[22px] px-1 hover:bg-slate-100">
                    <div className="flex items-center">
                      <div
                        className={cx(
                          css`
                            width: ${(depth || 0) * 10}px;
                          `
                        )}
                      ></div>
                      <div>{key}</div>
                    </div>

                    <div className="flex space-x-1">{cdel}</div>
                  </div>
                </>
              )}
              {typeof value === "object" && value.select && (
                <SelectField
                  rel={key}
                  Field={Field}
                  db={db}
                  select={value.select}
                  tables={tables}
                  def={local.defs[key]}
                  del={cdel}
                  depth={(depth || 0) + 1}
                  update={(tableName, v) => {
                    update(name, {
                      ...select,
                      [tableName]: { select: v },
                    });
                  }}
                />
              )}
            </div>
          );
        })}
    </>
  );
};
