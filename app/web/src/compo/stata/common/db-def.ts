import type { DbDefCols, DbDefRels } from "svc-db";
import { fetchSendDb } from "web-init/src/web/db";
import { StataBind } from "./common";

type DBDef = { db: { name: string }; rels: DbDefRels; columns: DbDefCols };
const w = window as unknown as {
  _stata: {
    models: Record<string, DBDef>;
  };
};

export const initDefData = async <T>(load: any, bind: StataBind<T>) => {
  if (typeof load === "string") {
    bind._internal.dbdef = await loadDefinitionFromServer(load);
    bind._internal.dbdef.pk = [];

    for (const v of Object.values(bind._internal.dbdef.columns)) {
      if (v.pk) bind._internal.dbdef.pk.push(v.name as keyof T);
    }
  }
};

const loadDefinitionFromServer = async (table: string) => {
  if (w._stata && w._stata.models[table]) {
    return w._stata.models[table];
  }
  const res = (await await fetchSendDb("db", {
    db: "db",
    action: "definition",
    table,
  })) as any;

  if (!w._stata) {
    w._stata = { models: {} };
  }
  return res;
};

export const suggestDefinition = <T>(row: T) => {
  const columns: DbDefCols = {};
  const rels = {};
  for (const [k, v] of Object.entries(row as any)) {
    columns[k] = {
      name: k,
      nullable: false,
      pk: false,
      type: typeof v,
    };
  }

  const res: DBDef & { pk: (keyof T)[] } = {
    pk: [],
    db: {
      name: "data",
    },
    columns,
    rels,
  };
  return res;
};
