import { FC, ReactElement, ReactNode } from "react";
import type { DbDefCols, DbDefRels, DBName, DBTables } from "svc-db";
import { StataAction } from "../action/action";
import { StataBehaviorFunc, StataModeProps } from "../behavior/util/base";
import { BehaviorBind } from "../behavior/util/creator";
import { originalBehavior } from "../behavior/util/original";
import { FieldKeyType } from "./field-map";
import {
  StataAllMode,
  StataBasicMode,
  StataExtraMode,
  StataMode,
} from "./mode";

import { StataState } from "./state";

/* ———————————————————— TYPES  —————————————————————— */

export type FieldMeta<T = {}, A = {}> = {
  idx: number;
  name: keyof T;
  required: boolean;
  label?: string;
  type: FieldKeyType;
  sibCount: number;
  children?: ReactElement;
  items?: any[];
  itemLabel?: (item: any) => string;
  onChange?: (arg: {
    value: any;
    field: FieldMeta<T, A>;
    update: UpdateField<T>;
  }) => void | Promise<void>;
} & A;

export type StataBaseProps<T> = {
  bind: StataBind<T>;
  className?: string;
  css?: any;
  mode?: StataAllMode | StataAllMode[];
  element?: (arg: { bind: StataBind<T> }) => Partial<StataModeProps>;
};

export type StataData<T> = {
  list: T[];
  detail: T;
};

export type StataDBDef = {
  db: { name: string };
  rels: DbDefRels;
  columns: DbDefCols;
};

export type StataBind<T> = {
  // data dan mode di set oleh stata root dan behavior
  // action tidak boleh lgsg merubah data dan mode
  mode: Record<StataMode | "root", StataAllMode | StataAllMode[]>;
  data: StataData<T>;

  deps: any[];

  // action di set oleh component children
  action: StataAction<T>;

  // render di set oleh component children
  render: (mode: StataMode | "root") => void;

  // params ini menyimpan parameter url yg sudah di parsing
  //
  // param tidak boleh di parsing oleh action, karena action itu tidak
  // bisa auto terpanggil, harus di eksekusi oleh user.
  //
  // sedangkan params harus tersedia sebelum action dipanggil, sehingga
  // paling cocok ketika dipanggil dari behavior
  param: Record<StataMode, Record<string, any>>;

  // state menyimpan seluruh state untuk children stata,
  // jadi kalau butuh state yg di share, taro disini.
  // Jangan di taro di lokal, jgn di global juga.
  state: StataState;

  // set className harusnya dari behavior
  className: Record<StataMode, string> & {
    use: (
      mode: StataMode | "field" | "field-row" | "field-col",
      extend?: string
    ) => string;
  };

  // layout untuk masing2 item di detail dan list. ini bentuk nya mirip mode
  // ["kolom_x", ["kolom_a", "kolom_b"]]
  layout: Record<StataMode, StataLayout<T, any>>;

  loadingEl: ReactElement;

  _internal: {
    // ketika ada perubahan di bind.mode, mode sebelumnya akan di catat disini.
    // digunakan untuk memeriksa apakah ada perubahan mode
    // jika ada maka eksekusi behavior.onModeChanged
    lastMode: StataBind<T>["mode"];

    // load ini menentukan data apa yg akan di load di init.
    // masing2 "list" dan "detail" akan ngeload lalu di simpan di bind.data
    load: Exclude<DBTables<DBName>, undefined | StataLoadFunc<T>>;

    // behavior menentukan perilaku stata,
    // disini akan merubah mode dan data sesuai dengan logic masing2.
    behavior: any;

    // database definition
    dbdef: StataDBDef & { pk: (keyof T)[] };

    // ngeset render masing2 stata children
    // supaya bisa dipanggil dari manapun.
    setRender: (
      name: StataBasicMode | StataExtraMode | "root",
      value: () => void
    ) => void;
  };
};

export type StataLayout<T, K extends object, A = {}> =
  | keyof T
  | ({
      name: keyof T;
      children?: (
        arg: {
          idx: number;
          row: T;
          field: FieldMeta<T>;
          Field: (
            arg: Partial<LayoutFieldProps<T>> & {
              children?: ReactElement;
            }
          ) => ReactElement;
          layout: (layout: StataLayout<T, K, A>[]) => ReactElement;
          update: UpdateField<T>;
          Submit: FC;
          viewDetail: () => void;
        } & A
      ) => ReactElement;
    } & K)
  | ((
      arg: {
        idx: number;
        row: T;
        layout: (layout: StataLayout<T, K, A>[]) => ReactElement;
        update: UpdateField<T>;
        Submit: FC<{ children?: ReactNode; className?: string }>;
        viewDetail: () => void;
      } & A
    ) => ReactElement)
  | StataLayout<T, K, A>[];

export type ListAction = {};
export type ListItem = { title?: string; width?: number; type?: FieldKeyType };
export type LayoutFieldProps<T, A = {}> = {
  bind: StataBind<T>;
  name: keyof T;
  data: T;
  idx: number;
  render: () => void;
  update: UpdateField<T>;
  children?: ReactElement;
  owner: StataMode;
  key: any;
  dir: "col" | "row";
  field: FieldMeta<T, A>;
};
export type UpdateField<T> = (fn: Partial<T>) => void;
export type LayoutWrap<T> = {
  outer?: (
    arg: Omit<LayoutFieldProps<T>, "name" | "field"> & {
      child: ReactElement[];
      dir: "row" | "col";
    }
  ) => ReactElement;
  content?: (child: ReactElement, key: number) => ReactElement;
};

export interface StataListProps<T> extends StataBaseProps<T> {
  bind: StataBind<T>;
  onLoad?: (bind: StataBind<T>) => void | Promise<void>;
  layout?: StataLayout<T, ListItem, ListAction>[];
  wrap?: LayoutWrap<T>;
  params?: Parameters<
    (typeof db)[Exclude<
      StataBind<T>["_internal"]["load"],
      undefined | StataLoadFunc<T>
    >]["findMany"]
  >[0];
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends StataBehaviorFunc<T, any>
    ? T[P]
    : DeepPartial<T[P]>;
};

export type StataBehavior<T> = ReturnType<typeof originalBehavior<T>>;
export type StataPartialBehavior<T> = DeepPartial<StataBehavior<T>>;

export type StataLoadFunc<T> = (bind: StataBind<T>) => Promise<T[]> | T[];
export interface StataProps<T> extends Optional<StataBaseProps<T>, "bind"> {
  state: [StataData<T>, () => void];
  behavior: BehaviorBind<T> & { configFn?: <K>(bind: StataBind<T>) => K };
  load?: DBTables<DBName> | StataLoadFunc<T> | object;
  loadingEl?: ReactElement;
  className?: string;
  deps?: any[];
}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

/* ———————————————————— IMPLEMENTATION —————————————————————— */

export const initList = (arg: { layout: any }) => ({
  status: "init" as "init" | "querying" | "loaded",
  layout: arg.layout,
});
