import produce from "immer";
import { StataBind } from "../common/common";
import { suggestDefinition } from "../common/db-def";

export type StataAction<T extends unknown> = ReturnType<typeof createAction<T>>;

export const createAction = <T extends unknown>({
  bind,
}: {
  bind: StataBind<T>;
}) => {
  return {
    detail: {
      isReady: false,
      // ini di override di stata/detail/detail.tsx
      validate: async (value?: any): Promise<ActionResult> => {
        return { valid: true };
      },
      // ini di override di stata/detail/detail.tsx
      save: async (data?: Partial<T>): Promise<ActionResult> => {
        return { valid: true };
      },
    },
    list: {
      async sort(name: keyof T, dir?: "asc" | "desc" | "none") {
        const params = bind.state.list.db.params;

        const canSort = !!bind._internal.dbdef.columns[name as any];
        if (!canSort) {
          return;
        }
        if (params) {
          let curdir = "none";
          if (params.orderBy) {
            const key = Object.keys(params.orderBy)[0];
            if (key) curdir = (params.orderBy as any)[key];
          }

          if (!dir) {
            if (curdir === "none") dir = "asc";
            else if (curdir === "asc") dir = "desc";
            else dir = "none";
          }

          params.orderBy = { [name]: dir };
          if (dir === "none") {
            delete params.orderBy;
          }
        }
        await bind.action.list.query("reset");
        bind.render("list");
      },
      async simpleFilter() {
        if (bind.state.list.status === "loading") {
          bind.render("list");
          return;
        }
        const search = bind.state.list.filter.simple.search;
        const cols = Object.values(bind._internal.dbdef.columns).filter(
          (e) => e.type === "string" && !e.pk && !e.rel
        );

        bind.state.list.filter.field = {};
        for (const col of cols) {
          bind.state.list.filter.field[col.name] = search
            ? {
                contains: search,
                mode: "insensitive",
              }
            : null;
        }

        await bind.action.list.query("reset");
        bind.render("list");
      },
      async nextPage() {
        if (bind.state.list.paging.isEnded) return;

        const paging = bind.state.list.paging;
        const params = bind.state.list.db.params;
        if (params) {
          params.skip = (params.skip || 0) + paging.pageSize;
        }
        const res = await bind.action.list.query();

        if (res.length === 0) {
          paging.isEnded = true;
        }
        bind.render("list");
      },
      query: async (mode: "append" | "reset" = "append"): Promise<T[]> => {
        const load = bind._internal.load;

        prepWhere(bind);
        const params = bind.state.list.db.params;
        if (mode === "reset") {
          if (params) {
            params.skip = 0;
          }
        }

        bind.state.list.status = "loading";
        bind.render("list");

        let rows = [];
        if (typeof load === "string") {
          const table: any = db[load];
          rows = await table["findMany"](params);
        } else {
          rows = await (load as any)();
          bind._internal.dbdef = suggestDefinition(rows[0]) as any;
        }

        // kalau di reset, kosongkan list tapi setelah query
        // biar ga keliatan blank
        if (mode === "reset") {
          bind.data.list = [];
          bind.state.list.fieldMeta = new WeakMap();
          bind.state.list.paging.isEnded = false;
          setTimeout(() => {
            if (bind.state.list.virt) {
              bind.state.list.virt.scrollToIndex(0);
            }
          });
        }

        await bind.state.list.db.onLoad();

        if (rows.length < bind.state.list.paging.pageSize) {
          bind.state.list.paging.isEnded = true;
        }

        // bind.data.list array itu mutable, tapi dalem nya immutable
        for (const row of rows) {
          const item = produce(row, () => {});
          bind.state.list.fieldMeta.set(item, {} as any);
          bind.data.list.push(item as T);
        }

        bind.state.list.status = "ready";
        bind.state.list.db.loaded = true;
        return rows;
      },
    },
  };
};

const prepWhere = <T extends unknown>(bind: StataBind<T>) => {
  let params = bind.state.list.db.params;
  const filter = bind.state.list.filter.field;

  if (!params) {
    bind.state.list.db.params = {};
    params = bind.state.list.db.params;
  }
  if (!params.where) {
    params.where = {};
  }

  if (params && params.where) {
    if (!params.where.OR) params.where.OR = [];

    const fcols = Object.keys(filter);
    const OR = (params.where.OR as any)
      .map((e: Record<string, any>) => {
        const cols = Object.keys(e);

        for (const col of cols) {
          if (fcols.includes(col)) {
            delete e[col];
          }
        }
        if (Object.keys(e).length === 0) {
          return null;
        }
        return e;
      })
      .filter((e: any) => e);

    for (const col of fcols) {
      if (!!filter[col]) {
        OR.push({
          [col]: filter[col],
        });
      }
    }
    if (OR.length > 0) {
      params.where.OR = OR;
    } else {
      delete params.where.OR;
    }

    if (Object.keys(params.where).length === 0) {
      delete params.where;
    }
  }
};

export type ActionResult =
  | { valid: true }
  | { valid: false; reason?: Record<string, string> };
