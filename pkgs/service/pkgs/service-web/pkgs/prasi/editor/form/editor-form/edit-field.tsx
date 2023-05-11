import { FC } from "react";
import { generateForm } from "../generate";
import { EditorFormMetaProp } from "../types";
import { titleCase } from "../editor-field/field-single";

export const EditField: FC<EditorFormMetaProp> = ({ value, update, ed }) => {
  const fields = value.fields ? Object.values(value.fields || {}) : [];

  return (
    <>
      <div className="space-x-2 px-2 flex items-center">
        <span className="uppercase text-[11px]">
          {fields.length} Field{fields.length > 1 ? "s" : ""}
        </span>
        <div
          className="btn cursor-pointer bg-white hover:bg-slate-200 border  border-slate-400 rounded-sm text-xs px-2 select-none active:bg-blue-200 flex items-center"
          onClick={() => {
            let counter = 1;

            while (value.fields[`field_${counter}`]) {
              counter++;
            }

            update({
              ...value,
              fields: {
                ...value.fields,
                [`field_${counter}`]: {
                  name: `field_${counter}`,
                  label: titleCase(`field_${counter}`),
                  type: "input",
                },
              },
            });
          }}
        >
          + Add Field
        </div>
        <div
          className="btn cursor-pointer bg-blue-600 hover:bg-blue-500 border  border-blue-600 rounded-sm text-xs px-2 select-none active:bg-blue-700 flex items-center text-white"
          onClick={() => {
            generateForm(ed);
          }}
        >
          Generate ➠
        </div>
      </div>
      <div className="flex-1 justify-end px-1 flex items-stretch">
        {ed.active?.pluginData?.royal?.form && (
          <div
            className="btn cursor-pointer hover:bg-red-100  border-red-600 text-red-600 border text-red rounded-sm text-xs px-2 select-none m-1 flex items-center self-center"
            onClick={() => {
              update(undefined);
            }}
          >
            Clear Form
          </div>
        )}
      </div>
    </>
  );
};
