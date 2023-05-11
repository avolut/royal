import { FC } from "react";
import { EditorListMetaProp } from "./types";
import { LoadFrom } from "./editor-list/load-from";
import { generateList } from "./generate";

export const EditorListMeta: FC<EditorListMetaProp> = (prop) => {
  const { value, update, ed } = prop;

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

        {ed.active?.pluginData?.royal?.list && (
          <div className="flex items-center ml-3">
            <div
              className="btn cursor-pointer bg-blue-600 hover:bg-blue-500 border  border-blue-600 rounded-sm text-xs px-2 select-none active:bg-blue-700 flex items-center text-white"
              onClick={() => {
                generateList(ed);
              }}
            >
              Generate ➠
            </div>
          </div>
        )}

        <div className="flex-1 justify-end px-1 flex items-stretch">
          {ed.active?.pluginData?.royal?.list && (
            <div
              className="btn cursor-pointer hover:bg-red-100  border-red-600 text-red-600 border text-red rounded-sm text-xs px-2 select-none m-1 flex items-center self-center"
              onClick={() => {
                update(undefined);
              }}
            >
              Clear List
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
