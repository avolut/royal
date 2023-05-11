import { FC } from "react";
import { FAttr, PluginData } from "../../form/global";
import { PrasiEditorArg } from "web-types/prasi";

export type Form = Exclude<PluginData["form"], undefined>;
export type Dialog = Exclude<
  GetComponentProps<PrasiEditorArg["Btn"]>["dialog"],
  undefined
>;
type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;

export type EditorFormMetaProp = {
  update: (form: Form | undefined) => void;
  value: Form;
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
