import trim from "lodash.trim";
import { FC, useCallback, useEffect, useRef } from "react";
import { PrasiEditorArg } from "web-types/prasi";
import { FieldSelectArg } from "../../form/field/select";
import { FAttr, FieldAttributes, FieldComponent } from "../../form/global";
import { DialogBtn } from "../dialog-js";
import { FieldJS } from "../field-js";
import { DataDialog } from "./select-data";
import { useLocal } from "web-utils";

export const FPanelSelect: FC<{
  field: FieldAttributes<FieldSelectArg>;
  update: (field: FieldAttributes<FieldSelectArg> | null) => void;
  Btn: PrasiEditorArg["Btn"];
  Coditor: PrasiEditorArg["Coditor"];
  ed: ReturnType<PrasiEditorArg["useEditor"]>;
  onBlurInput: () => void;
  Field: FC<FAttr>;
}> = ({ Field, field, update, Btn, Coditor, ed }) => {
  const local = useLocal({ refresh: Date.now(), codeClosed: false });
  const dataDialog = useCallback(
    (({ onClose, open }) => {
      if (!open) return null;

      return (
        <DataDialog
          update={update}
          onClose={(fn) => {
            onClose(() => {
              local.refresh = Date.now();
              local.render();
              fn();
            });
          }}
          field={field}
          data={field.loadExt?.data || []}
        />
      );
    }) as Exclude<Parameters<typeof Btn>[0]["dialog"], undefined>,
    [field.loadExt?.data, field]
  );

  useEffect(() => {
    if (local.codeClosed) {
      local.refresh = Date.now();
      local.render();
    }
  }, [field.loadExt?.js]);

  const loadFromComponent = useCallback(
    (({ Wrapper, ErrorMessage, Label, input }) => {
      return (
        <Wrapper
          className={cx(
            css`
              input {
                width: 60px;
              }
            `
          )}
        >
          <Label>ITEMS FROM</Label>
          {input}
          <div
            className={cx(
              "border border-slate-300 border-l-0 flex items-stretch",
              css`
                svg {
                  width: 13px;
                  height: 13px;
                  opacity: 0.8;
                }
              `
            )}
          >
            {(field.load === "JS" || !field.load) && (
              <FieldJS
                Btn={Btn}
                Coditor={Coditor}
                ed={ed}
                field={field.loadExt}
                wrap={(code) => `init(${trim(code.trim(), ";")})`}
                defaultValue={`\
async () => {
  const result: (string | { value: any; label: string })[] = [];
  
  return result;
};`}
                name="js"
                update={(val: any) => {
                  update({
                    ...field,
                    loadExt: {
                      ...field.loadExt,
                      js: !val ? { js: "", jsBuilt: "" } : val,
                    },
                  });
                }}
                onOpen={() => {
                  local.codeClosed = false;
                  local.render();
                }}
                onClose={() => {
                  local.codeClosed = true;
                  local.render();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M9.964 2.686a.5.5 0 10-.928-.372l-4 10a.5.5 0 10.928.372l4-10zm-6.11 2.46a.5.5 0 010 .708L2.207 7.5l1.647 1.646a.5.5 0 11-.708.708l-2-2a.5.5 0 010-.708l2-2a.5.5 0 01.708 0zm7.292 0a.5.5 0 01.708 0l2 2a.5.5 0 010 .708l-2 2a.5.5 0 01-.708-.708L12.793 7.5l-1.647-1.646a.5.5 0 010-.708z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </FieldJS>
            )}
            {field.load === "Data" && (
              <Btn
                className={cx("p-0 px-1 min-w-0")}
                dialogMode="popover"
                dialogPopoverPos="after"
                dialog={dataDialog}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M12.146 1.146a.5.5 0 01.707 0l2 2a.5.5 0 010 .708l-3.942 3.942a1 1 0 01-.26.188L6.724 9.947a.5.5 0 01-.671-.67l1.963-3.928a1 1 0 01.188-.26l3.942-3.943zm.354 1.061l-3.59 3.59-1.037 2.076.254.254 2.077-1.038L13.793 3.5 12.5 2.207zM10 2L9 3H4.9c-.428 0-.72 0-.944.019-.22.018-.332.05-.41.09a1 1 0 00-.437.437c-.04.078-.072.19-.09.41C3 4.18 3 4.472 3 4.9v6.2c0 .428 0 .72.019.944.018.22.05.332.09.41a1 1 0 00.437.437c.078.04.19.072.41.09.225.019.516.019.944.019h6.2c.428 0 .72 0 .944-.019.22-.018.332-.05.41-.09a1 1 0 00.437-.437c.04-.078.072-.19.09-.41.019-.225.019-.516.019-.944V7l1-1V11.12c0 .403 0 .735-.022 1.006-.023.281-.072.54-.196.782a2 2 0 01-.874.874c-.243.124-.501.173-.782.196-.27.022-.603.022-1.005.022H4.88c-.403 0-.735 0-1.006-.022-.281-.023-.54-.072-.782-.196a2 2 0 01-.874-.874c-.124-.243-.173-.501-.196-.782C2 11.856 2 11.523 2 11.12V4.88c0-.403 0-.735.022-1.006.023-.281.072-.54.196-.782a2 2 0 01.874-.874c.243-.124.501-.173.782-.196C4.144 2 4.477 2 4.88 2H10z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Btn>
            )}
            {field.load === "DB" && (
              <DialogBtn Btn={Btn} value="" update={() => {}}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="none"
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M7.289.797a.5.5 0 01.422 0l6 2.8A.5.5 0 0114 4.05v6.9a.5.5 0 01-.289.453l-6 2.8a.5.5 0 01-.422 0l-6-2.8A.5.5 0 011 10.95v-6.9a.5.5 0 01.289-.453l6-2.8zM2 4.806L7 6.93v6.034l-5-2.333V4.806zm6 8.159l5-2.333V4.806L8 6.93v6.034zm-.5-6.908l4.772-2.028L7.5 1.802 2.728 4.029 7.5 6.057z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </DialogBtn>
            )}
          </div>
          <ErrorMessage />
        </Wrapper>
      );
    }) as FieldComponent,
    [field.load, local.refresh]
  );
  return (
    <>
      <Field
        type="select"
        items={["Data", "JS", "DB"]}
        name="load"
        value={field.load || "JS"}
        component={loadFromComponent}
        onChange={(val) => {
          update({ ...field, load: val as any });
        }}
      />
    </>
  );
};
