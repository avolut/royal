import { FC } from "react";
import { EditField } from "./editor-form/edit-field";
import { LoadFrom } from "./editor-form/load-from";
import { OnChange } from "./editor-form/on-change";
import { OnSubmit } from "./editor-form/on-submit";
import { EditorFormMetaProp } from "./types";

export const EditorFormMeta: FC<EditorFormMetaProp> = (prop) => {
  const { Field, value, update } = prop;

  return (
    <div
      className={cx(
        "flex flex-col",
        css`
          .field-select {
            input {
              width: 100px;
            }
          }
        `
      )}
    >
      <div className={cx("flex border-b border-slate-300")}>
        <div className="border-r border-slate-300 p-2 flex items-stretch">
          <LoadFrom {...prop} />
        </div>
        <div className="border-r flex-1 justify-center border-slate-300 p-2 flex items-stretch">
          <OnChange {...prop} />
        </div>
        <div className=" border-slate-300 p-2 flex items-stretch justify-center">
          <OnSubmit {...prop} />
        </div>
      </div>
      <div className={cx("flex border-b border-slate-300")}>
        <div className="border-r border-slate-300 p-2 flex items-stretch">
          <Field
            className={cx(
              css`
                display: flex;
                .field-label {
                  width: 67px;
                }
              `
            )}
            name="tag"
            label="Tag"
            type="select"
            value={value.tag}
            onChange={async (val) => {
              update({ ...value, tag: val });
            }}
            items={["form", "div"]}
          />
        </div>

        <EditField {...prop} />
      </div>
    </div>
  );
};
