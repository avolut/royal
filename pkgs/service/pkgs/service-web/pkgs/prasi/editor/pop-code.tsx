import { FC, ReactNode } from "react";
import { PrasiEditorArg } from "web-types/prasi";
import { useLocal } from "web-utils";

export const PopCode: FC<{
  Coditor: PrasiEditorArg["Coditor"];
  Btn: PrasiEditorArg["Btn"];
  children: ReactNode;
  value: string;
  onChange: (val: string) => void;
}> = ({ children, Btn, Coditor, onChange, value }) => {
  const local = useLocal(
    {
      value,
      dialog: null as any,
    },
    () => {
      local.value = value;
      local.render();
    },
    [value]
  );

  const setDialog = () => {
    local.dialog = () => {
      return (
        <div
          className={cx(
            "text-xs w-[300px] h-[60px] flex items-stretch",
            css`
              .coditor-cm {
                font-size: 13px;
              }
            `
          )}
        >
          <Coditor
            value={local.value}
            lang="js"
            onChange={(val) => {
              local.value = val;
              local.render();
            }}
            onInit={({ view, codemirror }) => {
              const { EditorSelection } = codemirror;
              const text = view.state.doc.toString();

              if (text.startsWith('"') && text.endsWith('"')) {
                view.dispatch({
                  selection: EditorSelection.create(
                    [
                      EditorSelection.range(1, text.length - 1),
                      EditorSelection.cursor(1),
                    ],
                    0
                  ),
                });
              }
            }}
            fontSize="12px"
          />
        </div>
      );
    };
  };

  if (!local.dialog) {
    setDialog();
  }

  return (
    <Btn
      dialogMode="popover"
      dialogPopoverPos={"after"}
      dialog={local.dialog}
      dialogOnChange={(open) => {
        setDialog();
        local.render();

        if (!open) {
          onChange(local.value);
        }
      }}
      className={cx("p-0 m-0 min-w-0 flex-1")}
    >
      <>{children}</>
    </Btn>
  );
};
