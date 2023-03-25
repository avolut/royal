import produce from "immer";
import { StataBind } from "../../common/common";

export const prepareData = <T extends unknown>(_bind: any) => {
  const bind = _bind as StataBind<T>;
  const data = bind.data.detail as any;
  return produce(bind.data.detail, (draft: any) => {
    const pks = Object.values(bind._internal.dbdef.columns).filter((e) => e.pk);

    const tableName = bind._internal.dbdef.db.name;
    for (const rel of Object.values(bind._internal.dbdef.rels)) {
      if (
        rel.relation === "Model.BelongsToOneRelation" &&
        rel.join.from.startsWith(`${tableName}.`)
      ) {
        const to = rel.join.to.split(".");
        const from = rel.join.from.split(".");

        if (data[from[1]]) {
          delete draft[from[1]];
          if (pks[0].name !== from[1])
            draft[to[0]] = { connect: { [to[1]]: data[from[1]] } };
        }
      }
    }

    // for (const pk of pks) {
    //   (draft as any)[pk.name] = undefined;
    // }
  });
};
