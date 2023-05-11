import trim from "lodash.trim";
import { FC, useCallback, useEffect } from "react";
import { FAttr } from "../../../form/global";
import { EditorCode } from "../../editor-code";
import { evalPluginScript } from "../../plugin-script";
import { Dialog, EditorFormMetaProp } from "../types";
import { useGlobal, useLocal } from "web-utils";
import { EditorFormState } from "../form-state";
import { titleCase } from "../editor-field/field-single";
import { EditorDBQuery } from "../../db-query/editor";

const defaultLoad = {
  "Static JSON": "{}",
  "DB Query": "",
  "JS Script": "return {}",
} as any;

export const LoadFrom: FC<EditorFormMetaProp> = ({
  Field,
  update,
  value,
  comp,
  ed,
  page,
  config,
}) => {
  const { Btn, Coditor } = comp;

  const frmState = useGlobal(EditorFormState);

  const ext = value.loadExt ? value.loadExt[value.load] : undefined;
  const jsDialog = useCallback<Dialog>(
    ({ setOpen, onClose }) => {
      return (
        <EditorCode
          formID={"prasi-form-editor"}
          wrap={
            value.load === "JS Script"
              ? (code) => `init(async () => { ${trim(code.trim(), ";")} })`
              : (code) => code
          }
          value={ext?.js || defaultLoad[value.load]}
          onClose={onClose}
          type={value.load === "Static JSON" ? "json" : "js"}
          onChange={async (val) => {
            update({
              ...value,
              loadExt: {
                ...(value.loadExt || {}),
                [value.load]: val,
              },
            });
          }}
          Coditor={Coditor}
          setOpen={setOpen}
        />
      );
    },
    [ext, ext?.js, value.load]
  );

  const dbDialog = useCallback(({ open, setOpen, onClose }: any) => {
    const local = useLocal({
      parsed: "",
    });

    onClose(() => {
      update({
        ...value,
        loadExt: {
          ...(value.loadExt || {}),
          [value.load]: { js: local.parsed, jsBuilt: "" },
        },
      });
    });

    return (
      <div
        className={cx("fixed inset-0 flex items-center justify-center")}
        onClick={() => {
          setOpen(false);
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className={cx(
            "flex items-stretch justify-stretch bg-white",
            css`
              width: 80vw;
              height: 80vh;
            `
          )}
        >
          <EditorDBQuery
            apiURL={config.royal_url}
            value={ext?.js || ""}
            Btn={Btn}
            Coditor={Coditor}
            onChange={(val) => {
              local.parsed = val;
            }}
          />
        </div>
      </div>
    );
  }, []);

  return (
    <>
      <Field
        name="load"
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
            <div>Load From</div>
          </div>
        }
        value={value.load}
        onChange={(val) => {
          update({ ...value, load: val });
        }}
        items={["Static JSON", "DB Query", "JS Script"].filter((e) => e)}
      />
      {(value.load === "JS Script" || value.load === "Static JSON") && (
        <Btn
          dialogMode="modal"
          dialog={jsDialog}
          dialogOnChange={(open) => {
            frmState.activeDialog = open ? jsDialog : null;
            frmState.render();
          }}
          className={cx(
            "cursor-pointer bg-white border border-slate-400 text-xs select-none active:bg-blue-200 flex ml-1 min-w-[20px]",
            ext?.js && "has-code"
          )}
        >
          <>Edit</>
        </Btn>
      )}

      {value.load === "DB Query" && (
        <Btn
          dialogMode="modal"
          dialog={dbDialog}
          dialogOnChange={(open) => {
            frmState.activeDialog = open ? dbDialog : null;
            frmState.render();
          }}
          className={cx(
            "cursor-pointer bg-white border border-slate-400 text-xs select-none active:bg-blue-200 flex ml-1 min-w-[20px]",
            ext?.js && "has-code"
          )}
        >
          <>Edit</>
        </Btn>
      )}

      <Btn
        className={cx(
          "cursor-pointer bg-white border border-slate-400 text-xs select-none active:bg-blue-200 flex ml-1 min-w-[20px]"
        )}
        onClick={async () => {
          if (ext?.js && ed.active) {
            if (value.load === "Static JSON") {
              const fn = new Function(`return ${ext.js}`);
              const result = fn();
              const fields: Record<string, FAttr> = {};

              for (const [k, _] of Object.entries(result)) {
                fields[k] = {
                  type: "input",
                  label: titleCase(k),
                  name: k,
                };
              }
              update({
                ...value,
                fields,
              });
              return;
            } else if (value.load === "JS Script") {
              await evalPluginScript({
                page,
                script: ext,
                async eval(fn) {
                  const result: Record<string, any> = await fn();
                  const fields: Record<string, FAttr> = {};

                  for (const [k, _] of Object.entries(result)) {
                    fields[k] = {
                      type: "input",
                      label: titleCase(k),
                      name: k,
                    };
                  }

                  update({
                    ...value,
                    fields,
                  });
                },
                item: ed.active,
              });
            }
          }
        }}
      >
        <>Load Fields ➠</>
      </Btn>
    </>
  );
};
