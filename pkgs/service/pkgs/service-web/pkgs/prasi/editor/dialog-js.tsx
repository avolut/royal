import { ReactNode } from "react";
import { PrasiEditorArg } from "web-types/prasi";
import { FAttr } from "../form/global";

export const DialogBtn = <K extends keyof FAttr>({
  Btn,
  update,
  children,
  value,
}: {
  Btn: PrasiEditorArg["Btn"];
  update: (field: FAttr[K] | null) => void;
  children?: ReactNode;
  value?: string;
}) => {
  return (
    <Btn className={cx("p-0 px-1 min-w-0")}>{<>{children}</> || <>JS</>}</Btn>
  );
};
