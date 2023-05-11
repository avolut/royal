import { FC, useCallback } from "react";
import { g } from "web-init/src/types";
import { PrasiEditorArg } from "web-types/prasi";
import { useLocal } from "web-utils";
import { ParsedQuery } from "../../../../../../../../app/srv/api/built-in/_parsejs";
import { FAttr } from "../../form/global";
import { SingleWhere } from "./where-single";

export const WhereField: FC<{
  Field: FC<FAttr>;
  tables: string[];
  db: (typeof g)["db"];
  table?: string;
  rel?: string;
  Coditor: PrasiEditorArg["Coditor"];
  Btn: PrasiEditorArg["Btn"];
  depth?: number;
  update: (tableName: string, value: ParsedQuery["where"]) => void;
  where: ParsedQuery["where"];
  def?: Awaited<ReturnType<(typeof g)["db"]["_definition"]>>;
}> = ({ Field, table, update, rel, def, where, Coditor, Btn }) => {
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

  const columns: ParsedQuery["select"] = {};

  if (local.def) {
    for (const c of Object.values(local.def.columns)) {
      if (!where[c.name]) columns[c.name] = {};
    }
    for (const [k, r] of Object.entries(local.def.rels)) {
      if (!where[r.modelClass]) columns[r.modelClass] = {};
    }
  }

  return (
    <div className="flex flex-col">
      {Object.entries(where).map((v, idx) => {
        let def = local.def?.columns[v[0]];
        let type = def?.type || "";

        if (!def) {
          const rel = Object.values(local.def?.rels || []).find(
            (e) => e.modelClass === v[0]
          );
          if (rel) {
            type =
              rel.relation === "Model.BelongsToOneRelation"
                ? "belongs-to"
                : "has-many";
          }
        }

        return (
          <SingleWhere
            Field={Field}
            name={v[0]}
            key={idx}
            type={type}
            where={where}
            Coditor={Coditor}
            Btn={Btn}
            update={(value) => {
              if (table) update(table, value);
            }}
          />
        );
      })}
      <div
        className={cx(
          "cursor-pointer m-1 bg-white hover:bg-blue-100 border border-slate-400 text-xs select-none active:bg-blue-200 flex",
          css`
            width: 54px;
            & > .field {
              width: 100%;
            }
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
                  white-space: nowrap;
                  content: "+ Where";
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
          onChange={(val) => {
            const cur = local.def?.columns[val];

            if (cur) {
              if (cur.type === "string") {
                update(name, {
                  ...where,
                  [val]: {
                    equals: `""`,
                  },
                });
              } else {
                update(name, {
                  ...where,
                  [val]: {},
                });
              }
            }
          }}
          items={Object.keys(columns)}
        />
      </div>
    </div>
  );
};
