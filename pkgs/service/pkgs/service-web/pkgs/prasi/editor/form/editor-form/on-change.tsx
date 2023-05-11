import trim from "lodash.trim";
import { FC, useCallback } from "react";
import { EditorCode } from "../../editor-code";
import { Dialog, EditorFormMetaProp } from "../types";
import { useGlobal } from "web-utils";
import { EditorFormState } from "../form-state";

export const OnChange: FC<EditorFormMetaProp> = ({
  Field,
  update,
  value,
  comp,
}) => {
  const { Btn, Coditor } = comp;

  const frmState = useGlobal(EditorFormState);

  const dialog = useCallback<Dialog>(
    ({ setOpen, onClose }) => {
      return (
        <EditorCode
          formID={"prasi-form-editor"}
          value={
            value.onChangeExt?.js ||
            `\
async (
  value,
  changedKey: string,
  update: (key, value) => void,
  validate: () => void,
  errors: Map<string, string>
) => {
  validate();
};
          `
          }
          onClose={onClose}
          onChange={async (val) => {
            update({
              ...value,
              onChangeExt: val,
            });
          }}
          wrap={(code) => `init(${trim(code.trim(), ";")})`}
          Coditor={Coditor}
          setOpen={setOpen}
        />
      );
    },
    [value.onChangeExt?.js, value]
  );
  return (
    <>
      <Btn
        dialogMode="modal"
        dialog={dialog}
        dialogOnChange={(open) => {
          frmState.activeDialog = open ? dialog : null;
          frmState.render();
        }}
        className={cx(
          "cursor-pointer bg-white border border-slate-400 text-xs select-none active:bg-blue-200 flex ml-1 min-w-[20px]",
          value.onChangeExt?.js && "has-code"
        )}
      >
        <>On Change</>
      </Btn>
    </>
  );
};
