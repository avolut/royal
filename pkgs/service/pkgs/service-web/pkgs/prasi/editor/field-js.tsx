import { FC, ReactNode, useCallback } from "react";
import { PrasiEditorArg } from "web-types/prasi";
import { FAttr } from "../form/global";
import { EditorCode } from "./editor-code";
import trim from "lodash.trim";

export const FieldJS = <K extends keyof FAttr>({
  Btn,
  field,
  ed,
  name,
  Coditor,
  update,
  children,
  defaultValue,
  wrap,
  onClose: onEditorClose,
  onOpen: onEditorOpen,
}: {
  Btn: PrasiEditorArg["Btn"];
  field: any;
  name: string;
  ed: ReturnType<PrasiEditorArg["useEditor"]>;
  update: (field: FAttr[K] | null) => void;
  onClose?: () => void;
  onOpen?: () => void;
  Coditor: PrasiEditorArg["Coditor"];
  children?: ReactNode;
  defaultValue?: string;
  wrap?: (str: string) => string;
}) => {
  const value = (typeof field === "object"
    ? (field as any)[name]
    : undefined) as unknown as {
    js: string;
    jsBuilt: string;
  };

  const hasJS = typeof value === "object" && !!(value as any).js;

  const codeDialog = useCallback<
    Exclude<GetComponentProps<PrasiEditorArg["Btn"]>["dialog"], undefined>
  >(
    ({ setOpen, onClose }) => {
      return (
        <EditorCode
          formID={ed.active?.id || ""}
          wrap={wrap || ((code) => code)}
          value={
            (hasJS ? value.js : typeof value === "string" ? value : "") ||
            defaultValue ||
            ""
          }
          onClose={(fn) =>
            onClose(() => {
              if (onEditorClose) onEditorClose();
              fn();
            })
          }
          onChange={async (val) => {
            update(val as any);
          }}
          Coditor={Coditor}
          setOpen={(v) => {
            setOpen(v);

            if (v && onEditorOpen) {
              onEditorOpen();
            }
          }}
        />
      );
    },
    [field, value]
  );

  return (
    <Btn
      className={cx(
        "p-0 px-1 min-w-0",
        hasJS &&
          css`
            border-bottom: 2px solid green;
          `
      )}
      dialogMode="modal"
      dialog={codeDialog}
    >
      {<>{children}</> || <>JS</>}
    </Btn>
  );
};

type GetComponentProps<T> = T extends
  | React.ComponentType<infer P>
  | React.Component<infer P>
  ? P
  : never;
