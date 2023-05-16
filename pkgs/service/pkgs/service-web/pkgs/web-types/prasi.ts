import type {
  EditorGlobal,
  PrasiEditorPlugin,
} from "../../../../../../app/web/src/base/global/editor";
import type { PageGlobal } from "../../../../../../app/web/src/base/global/page";
import type {
  BtnBox,
  BtnExt,
} from "../../../../../../app/web/src/compo/editor/toolbar/btn-box";
import type Coditor from "../../../../../../app/web/src/compo/editor/inline/coditor/coditor";

export type PrasiEditor = PrasiEditorPlugin;
export type PrasiEditorArg = {
  useEditor: () => typeof EditorGlobal & { render: () => void };
  usePage: () => typeof PageGlobal & { render: () => void };
  config: any;
  BtnBox: typeof BtnBox;
  Btn: typeof BtnExt;
  Coditor: typeof Coditor;
};
export type InitPrasiArg = {
  id: string;
  inject: {};
  page?: (config: any) => Promise<void>;
  editor?: (arg: PrasiEditorArg) => Promise<PrasiEditorPlugin>;
};
