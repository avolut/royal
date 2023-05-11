import { FC, ReactElement, ReactNode } from "react";
import { IItem } from "../../../../../../../app/web/src/compo/editor/panel/item/item";
import { ISection } from "../../../../../../../app/web/src/compo/editor/panel/item/section";
import { PluginData } from "../form/global";
import { ParsedQuery } from "../../../../../../../app/srv/api/built-in/_parsejs";

type PluginList = Exclude<PluginData["list"], undefined>;

export type ListArg<T> = {
  value?: T[];
  listID?: string;
  _element?: ISection | IItem;
  tag?: string;
  mode?: "table" | "simple";
  onChange?: (
    value: T[],
    update: (value: T[], changedIndex?: number[]) => void,
    changedIndex?: number[]
  ) => void;
  className?: string;
  load?: {
    from: PluginList["load"];
    json?: any;
    query?: ParsedQuery | string;
    bindQueryReload?: (reload: () => Promise<void>) => void;
    script?: { js: string; jsBuilt: string };
  };
  onLoaded?: (items: any[]) => void;
  onLoading?: (loading: boolean) => void;
  tableClassName?: Partial<{
    head: {
      container?: string;
      row?: string;
      column?: string;
    };
    body: {
      container?: string;
      row?: string;
      column?: string;
    };
  }>;
  children: (arg: {
    list: T[];
    item: T;
    idx: number;
    update: (value: T[], changedIndex?: number[]) => void;
    state: ListState;
    Field: LField;
    Row: FC<{ children: ReactNode }>;
  }) => ReactNode;
};

export type ListState = {
  id: string;
  prop: ListArg<any>;
  value: any[];
  update: (value: any, changedIndex?: number[]) => void;
  render: () => void;
};

export const ListGlobal = {
  state: {} as Record<string, ListState>,
};

export type LFieldProp = {
  name: string;
  title?: string;
  type?: "string";
  className?: string;
};
export type LField = FC<LFieldProp>;
