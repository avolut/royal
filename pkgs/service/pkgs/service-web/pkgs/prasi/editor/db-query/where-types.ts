import { FC } from "react";
import { PrasiEditorArg } from "web-types/prasi";
import { ParsedQuery } from "../../../../../../../../app/srv/api/built-in/_parsejs";
import { FAttr } from "../../form/global";

export type WhereArg = {
  name: string;
  type: string;
  Field: FC<FAttr>;
  where: ParsedQuery["where"];
  update: (value: ParsedQuery["where"]) => void;
  Coditor: PrasiEditorArg["Coditor"];
  Btn: PrasiEditorArg["Btn"];
};
