import { FC, ReactElement, ReactNode } from "react";
import { IItem } from "../../../../../../../app/web/src/compo/editor/panel/item/item";
import { ISection } from "../../../../../../../app/web/src/compo/editor/panel/item/section";
import { FieldInputArg } from "./field/input";
import { FieldSelectArg } from "./field/select";

export type FieldComponent = FC<{
  input: ReactElement;
  Label: FC<{ children?: ReactNode }>;
  ErrorMessage: FC;
  Wrapper: FC<{ className?: string; children: ReactNode }>;
}>;

export type FieldAttributes<T> = T & {
  name: string;
  label?: ReactNode;
  className?: string;
  component?: { jsBuilt: string } | FieldComponent;
  required?: boolean;
  _element?: IItem;
};

export type PluginData = {
  form?: {
    load: string;
    loadExt: undefined | Record<string, { js: string; jsBuilt: string }>;
    submit: string;
    submitExt: undefined | { js: string; jsBuilt: string };
    onChangeExt: undefined | { js: string; jsBuilt: string };
    tag: string;
    fields: Record<string, FAttr>;
  };
  list?: {
    load: "Static JSON" | "DB Query" | "JS Script";
    loadExt: undefined | Record<string, { js: string; jsBuilt: string }>;
    onChangeExt: undefined | { js: string; jsBuilt: string };
    fields: string[];
    mode: "edit" | "live" | "loading";
    lastLiveJS?: string;
  };
  field?: FAttr;
  row?: true;
  column?: { name: string };
  submit?: true;
};

export type FAttr = FieldAttributes<FieldSelectArg | FieldInputArg>;
export type FField = FC<FAttr>;

export type FormArg<T> = {
  theme?: "default" | "none";
  className?: string;
  children: (arg: {
    Field: FC<FAttr>;
    value: T;
    update: (value: Partial<T> | null) => void;
    form: FormState;
  }) => ReactNode;
  formID?: string;
  onChange?: (
    value: T,
    changedKey: string | undefined,
    update: (key: keyof T, value: T[keyof T]) => void,
    validate: () => void,
    errors: Map<string, string>
  ) => void;
  value?: T;
  _element?: ISection | IItem;
  tag?: string;
};

export const FormGlobal = {
  state: {} as Record<string, FormState>,
};

export type FormState = {
  id: string;
  prop: FormArg<any>;
  value: any;
  update: (value: any, changedKey?: string) => void;
  validate: () => void;
  errors: Map<string, string>;
  render: () => void;
};
