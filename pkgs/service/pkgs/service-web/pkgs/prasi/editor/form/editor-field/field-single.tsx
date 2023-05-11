import { FC } from "react";
import { PrasiEditorArg } from "web-types/prasi";
import { useGlobal, useLocal } from "web-utils";
import { Form } from "../../../form/form";
import { FAttr } from "../../../form/global";
import { FieldJS } from "../../field-js";
import { FPanelInput } from "../../panel/input";
import { FPanelSelect } from "../../panel/select";
import { EditorFormState } from "../form-state";

export const FieldSingle: FC<{
  field: FAttr;
  update: (field: FAttr | null) => void;
  Btn: PrasiEditorArg["Btn"];
  idx: number;
  ed: ReturnType<PrasiEditorArg["useEditor"]>;
  Coditor: PrasiEditorArg["Coditor"];
  save: () => void;
}> = (arg) => {
  const state = useGlobal(EditorFormState);
  const { field, Btn, idx, ed, Coditor, save } = arg;
  const local = useLocal({
    field: field as FAttr,
  });
  const collapsed =
    typeof state.collapsed[local.field.name] === "undefined"
      ? true
      : state.collapsed[local.field.name];
  const update = (field: FAttr | null) => {
    if (field) {
      local.field = field;
    }
    arg.update(field);
  };
  const collapse = () => {
    state.collapsed[local.field.name] =
      typeof state.collapsed[local.field.name] === "undefined"
        ? false
        : !state.collapsed[local.field.name];
    local.render();
  };

  const onBlurInput = () => {
    if (local.field) update(local.field);
    setTimeout(() => {
      if (
        !document.activeElement ||
        (document.activeElement && document.activeElement.tagName !== "INPUT")
      ) {
        save();
      }
    }, 100);
  };
  return (
    <div
      className={cx(
        "border-b border-slate-300",
        idx % 2 !== 0 && "bg-blue-100"
      )}
    >
      <Form
        tag="div"
        formID={`field-${local.field.name}-${idx}`}
        value={local.field}
        onChange={(val) => {
          if (val.name !== local.field.name) {
            state.collapsed[val.name] = state.collapsed[local.field.name];
            delete state.collapsed[local.field.name];
          }

          if (val.name) {
            val.name = val.name.replace(/\W/g, "");

            if (val.label === local.field?.label) {
              if (
                typeof val.label === "string" &&
                (local.field?.name || "")
                  .toLowerCase()
                  .replace(/[^0-9a-z]/gi, "") ===
                  ((local.field?.label as string) || "")
                    .toLowerCase()
                    .replace(/[^0-9a-z]/gi, "")
              ) {
                val.label = titleCase(val.name);
              }
            }
          }

          local.field = val;
          local.render();
        }}
        className={cx(
          css`
            .field {
              padding: 0px;
            }
            label {
              display: flex;
              align-items: stretch;

              .field-label {
                border: 1px solid #d1d5db;
                border-right: 0px;
                font-size: 11px;
                padding: 0px 5px;
                background-color: #fafafa;
                text-transform: uppercase;
              }

              .field-box {
                display: flex;
                align-items: stretch;
              }
            }
          `
        )}
      >
        {({ Field, value }) => {
          return (
            <div className="flex flex-col items-stretch py-2 px-1 space-y-[2px]">
              <div className="flex justify-between items-center">
                <Btn
                  className="p-0 min-w-0"
                  onClick={() => {
                    collapse();
                  }}
                >
                  <div className="cursor-pointer bg-white hover:bg-slate-100 border border-slate-400 rounded-sm text-xs select-none active:bg-blue-200 min-w-[18px] flex items-center justify-center">
                    {collapsed ? (
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
                          d="M6.158 3.135a.5.5 0 01.707.023l3.75 4a.5.5 0 010 .684l-3.75 4a.5.5 0 11-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 01.023-.707z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
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
                          d="M3.135 6.158a.5.5 0 01.707-.023L7.5 9.565l3.658-3.43a.5.5 0 01.684.73l-4 3.75a.5.5 0 01-.684 0l-4-3.75a.5.5 0 01-.023-.707z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                  </div>
                </Btn>
                <Field type="input" name="name" onBlur={onBlurInput} />
                <Field
                  type="input"
                  name="label"
                  placeholder={titleCase(local.field?.name || "")}
                  onKeyDown={(evt) => {
                    if (
                      (evt.key === "S" || evt.key === "s") &&
                      (evt.ctrlKey || evt.metaKey) &&
                      !evt.shiftKey
                    ) {
                      evt.currentTarget.blur();
                    }
                  }}
                  onChange={(val) => {
                    if (local.field) update({ ...local.field, label: val });
                  }}
                  onBlur={() => {
                    save();
                  }}
                />
                <Field
                  onChange={(val) => {
                    update({ ...local.field, type: val } as FAttr);
                    save();
                  }}
                  type="select"
                  items={["input", "select"]}
                  name="type"
                />
                <Btn
                  className={cx(
                    "border border-slate-300 bg-white",
                    css`
                      display: flex;
                      align-items: center;
                      box-sizing: content-box;
                      height: 20px;
                      padding: 0px 6px;
                      cursor: default !important;
                      &:hover {
                        background: white;
                        border: 1px solid #ececeb;
                      }
                      input {
                        cursor: pointer;
                        height: 15px;
                      }
                    `
                  )}
                >
                  <label className="cursor-pointer flex items-center">
                    <input
                      type="checkbox"
                      checked={!!value.required}
                      onChange={(e) => {
                        const checked = e.currentTarget.checked;
                        update({
                          ...local.field,
                          required: checked,
                        } as FAttr);
                        save();
                      }}
                    />
                    <div className="pl-1">Required</div>
                  </label>
                </Btn>
                <div className="border h-[20px] box-content bg-white border-slate-300 flex items-stretch">
                  <FieldJS
                    Btn={Btn}
                    Coditor={Coditor}
                    ed={ed}
                    field={field}
                    name="component"
                    defaultValue={`\
render(({ Wrapper, Label, input, ErrorMessage }) => {
  return (
    <Wrapper>
      <Label />
      {input}
      <ErrorMessage />
    </Wrapper>
  );
});
`}
                    update={(val) => {
                      if (local.field) {
                        update({
                          ...local.field,
                          component: val || undefined,
                        } as any);
                        save();
                      }
                    }}
                  >
                    <div
                      className={cx(
                        css`
                          display: flex;
                          align-items: center;

                          svg {
                            opacity: 0.8;
                          }
                        `,
                        "space-x-[5px]"
                      )}
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 3C2.22386 3 2 3.22386 2 3.5V9.5C2 9.77614 2.22386 10 2.5 10H12.5C12.7761 10 13 9.77614 13 9.5V3.5C13 3.22386 12.7761 3 12.5 3H2.5ZM1 9.5C1 10.1531 1.4174 10.7087 2 10.9146V11.5C2 12.3284 2.67157 13 3.5 13H11.5C12.3284 13 13 12.3284 13 11.5V10.9146C13.5826 10.7087 14 10.1531 14 9.5V3.5C14 2.67157 13.3284 2 12.5 2H2.5C1.67157 2 1 2.67157 1 3.5V9.5ZM12 11.5V11H3V11.5C3 11.7761 3.22386 12 3.5 12H11.5C11.7761 12 12 11.7761 12 11.5ZM5.5 6C5.22386 6 5 6.22386 5 6.5C5 6.77614 5.22386 7 5.5 7H9.5C9.77614 7 10 6.77614 10 6.5C10 6.22386 9.77614 6 9.5 6H5.5Z"
                          fill="currentColor"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div>Component</div>
                    </div>
                  </FieldJS>
                </div>
                <div
                  className="cursor-pointer bg-white hover:bg-red-100 border  border-red-400 rounded-sm text-xs select-none active:bg-red-200 p-[3px]"
                  onClick={() => {
                    update(null);
                    save();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 16"
                  >
                    <path fill="red" d="M7 6H6v6h1V6zM10 6H9v6h1V6z"></path>
                    <path
                      fill="red"
                      d="M2 3v1h1v10a1 1 0 001 1h8a1 1 0 001-1V4h1V3H2zm2 11V4h8v10H4zM10 1H6v1h4V1z"
                    ></path>
                  </svg>
                </div>
              </div>
              {!collapsed && (
                <>
                  <div className="flex space-x-1 items-center">
                    {field.type === "input" && (
                      <FPanelInput
                        {...arg}
                        update={update}
                        save={save}
                        field={value as any}
                        Field={Field}
                        onBlurInput={onBlurInput}
                      />
                    )}
                    {field.type === "select" && (
                      <FPanelSelect
                        {...arg}
                        field={value as any}
                        Field={Field}
                        update={update}
                        Btn={Btn}
                        onBlurInput={onBlurInput}
                        Coditor={Coditor}
                        ed={ed}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          );
        }}
      </Form>
    </div>
  );
};

export function titleCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[^0-9a-z]/gi, " ")
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
