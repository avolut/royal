import { FC, useCallback } from "react";
import { Dialog, EditorFormMetaProp } from "../types";
import { EditorCode } from "../../editor-code";
import trim from "lodash.trim";
import { useGlobal } from "web-utils";
import { EditorFormState } from "../form-state";

export const OnSubmit: FC<EditorFormMetaProp> = ({
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
          wrap={(code) => `init(${trim(code.trim(), ";")})`}
          value={
            value.submitExt?.js ||
            `\
async (value) => {
  console.log("Submitting", value)
}`
          }
          onClose={onClose}
          onChange={async (val) => {
            update({ ...value, submitExt: val });
          }}
          Coditor={Coditor}
          setOpen={setOpen}
        />
      );
    },
    [value.submitExt?.js, value]
  );
  return (
    <>
      <Field
        name="submit"
        type="select"
        className={cx(
          css`
            display: flex;
            .field-label {
              display: flex;
              align-items: center;
              margin-right: 5px;
            }
          `
        )}
        label={
          <div className="flex justify-between items-center">
            <div>On Submit</div>
          </div>
        }
        value={value.submit}
        onChange={(val) => {
          update({ ...value, submit: val });
        }}
        items={["JS Script"].filter((e) => e)}
      />
      <Btn
        dialogMode="modal"
        dialog={dialog}
        dialogOnChange={(open) => {
          frmState.activeDialog = open ? dialog : null;
          frmState.render();
        }}
        className={cx(
          "cursor-pointer bg-white border border-slate-400 text-xs select-none active:bg-blue-200 flex ml-1 min-w-[20px]",
          value.submitExt?.js && "has-code"
        )}
      >
        <>Edit</>
      </Btn>
    </>
  );
};
