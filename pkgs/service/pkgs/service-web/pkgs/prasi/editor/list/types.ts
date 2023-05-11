import { PrasiEditorArg } from "web-types/prasi";
import { FAttr, PluginData } from "../../form/global";
import { FC } from "react";

export type List = Exclude<PluginData["list"], undefined>;

export type Dialog = Exclude<
  GetComponentProps<PrasiEditorArg["Btn"]>["dialog"],
  undefined
>;

type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;

export type EditorListMetaProp = {
  update: (list: List | undefined) => void;
  value: List;
  comp: {
    Btn: PrasiEditorArg["Btn"];
    BtnBox: PrasiEditorArg["BtnBox"];
    Coditor: PrasiEditorArg["Coditor"];
  };
  ed: ReturnType<PrasiEditorArg["useEditor"]>;
  page: ReturnType<PrasiEditorArg["usePage"]>;
  config: { royal_url: string };
  Field: FC<FAttr>;
};
