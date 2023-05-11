import trim from "lodash.trim";
import { FC, useCallback } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EditorDBQuery } from "../../db-query/editor";
import { EditorCode } from "../../editor-code";
import { EditorListState } from "../list-state";
import { Dialog, EditorListMetaProp, List } from "../types";
import produce from "immer";
import { ParsedQuery } from "../../../../../../../../../app/srv/api/built-in/_parsejs";

const defaultLoad = {
  "Static JSON": "{}",
  "DB Query": "",
  "JS Script": "return {}",
} as any;

export const LoadFrom: FC<EditorListMetaProp> = ({
  Field,
  update,
  value,
  comp,
  ed,
  page,
  config,
}) => {
  const { Btn, Coditor } = comp;
  const state = useGlobal(EditorListState);

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
      src: "",
      parsed: null as null | ParsedQuery,
    });

    onClose(() => {
      const fields: string[] = [];
      if (local.parsed && local.parsed.select) {
        const keys = Object.keys(local.parsed.select);
        if (keys.length > 0) {
          keys.map((e) => fields.push(e));
        }
      }

      update({
        ...value,
        fields,
        loadExt: {
          ...(value.loadExt || {}),
          [value.load]: { js: local.src, jsBuilt: "" },
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
            onChange={(val, parsed) => {
              local.src = val;
              local.parsed = parsed;
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
          update({ ...value, load: val as List["load"] });
        }}
        items={["Static JSON", "DB Query", "JS Script"].filter((e) => e)}
      />
      {(value.load === "JS Script" || value.load === "Static JSON") && (
        <Btn
          dialogMode="modal"
          dialog={jsDialog}
          dialogOnChange={(open) => {
            state.activeDialog = open ? jsDialog : null;
            state.render();
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
            state.activeDialog = open ? dbDialog : null;
            state.render();
          }}
          className={cx(
            "cursor-pointer bg-white border border-slate-400 text-xs select-none active:bg-blue-200 flex ml-1 min-w-[20px]",
            ext?.js && "has-code"
          )}
        >
          <>Edit</>
        </Btn>
      )}
      {value.fields && (
        <Btn
          className={cx(
            "ml-2 text-gray-500 flex items-center text-sm",
            css`
              padding: 0px 5px;
              min-width: auto;
            `
          )}
          dialog={() => {
            return (
              <div className="p-2 text-sm">
                {value.fields.map((e) => {
                  return <div key={e}>• {e}</div>;
                })}
              </div>
            );
          }}
        >
          <>
            {!value.fields.length ? "No" : value.fields.length} field
            {value.fields.length > 1 ? "s" : ""}
          </>
        </Btn>
      )}
    </>
  );
};
