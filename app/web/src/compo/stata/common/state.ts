import { ReactElement, ReactNode } from "react";
import { TableVirtuosoHandle, VirtuosoHandle } from "react-virtuoso";
import { FieldMeta, StataBind, StataLoadFunc } from "./common";

export type StataState = ReturnType<typeof defaultState>;

export const defaultState = <T extends object>(bind: StataBind<T>) => ({
  behavior: "" as "crud" | "list" | "form" | "",
  crud: { urlParts: "", shouldNav: true },
  detail: {
    mode: "form" as "form" | "view",
    title: "" as ReactNode | (() => ReactNode | Promise<ReactNode>),
    status: "loading" as
      | "ready"
      | "unsaved"
      | "saving"
      | "saved"
      | "load-error"
      | "save-error"
      | "loading",
    errors: {} as Record<string, string>,
    fieldMeta: {} as Record<string, FieldMeta>,
    db: {
      onLoad: async () => {},
      loaded: false,
      saved: false,
      params: null as unknown as Parameters<
        typeof db[Exclude<
          StataBind<T>["_internal"]["load"],
          undefined | StataLoadFunc<T>
        >]["findFirst"]
      >[0],
    },
  },

  list: {
    status: "loading" as "loading" | "ready",
    paging: {
      pageSize: 30,
      isEnded: false,
    },
    className: {
      row: "",
    },
    action: [] as ReactElement[],
    virt: null as unknown as VirtuosoHandle | TableVirtuosoHandle,
    filter: {
      type: "simple",
      simple: {
        search: "",
      },
      field: {} as Record<string, any>,
    },
    fieldMeta: new WeakMap() as WeakMap<any, FieldMeta>,
    db: {
      onLoad: async () => {},
      loaded: false,
      params: null as unknown as Parameters<
        typeof db[Exclude<
          StataBind<T>["_internal"]["load"],
          undefined | StataLoadFunc<T>
        >]["findMany"]
      >[0],
    },
  },
});
