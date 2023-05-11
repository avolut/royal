import produce from "immer";
import { FC, useCallback, useEffect } from "react";
import { PrasiEditorArg } from "web-types/prasi";
import { useGlobal, useLocal } from "web-utils";
import { findByID } from "../../../../../../../../app/web/src/compo/editor/util/find-by-id";
import { Form } from "../../form/form";
import { FAttr, PluginData } from "../../form/global";
import { FormCSS } from "./../editor-css";
import { FieldSingle } from "./editor-field/field-single";
import { EditorFormMeta } from "./editor-form";
import { EditorFormState } from "./form-state";

export const EditorForm: FC<{
  open: boolean;
  config: { royal_url: string };
  ed: ReturnType<PrasiEditorArg["useEditor"]>;
  page: ReturnType<PrasiEditorArg["usePage"]>;
  comp: {
    Btn: PrasiEditorArg["Btn"];
    BtnBox: PrasiEditorArg["BtnBox"];
    Coditor: PrasiEditorArg["Coditor"];
  };
  onClose: (fn: () => void) => void;
}> = ({ ed, comp, page, onClose, config }) => {
  const local = useLocal({
    form: undefined as PluginData["form"],
    undoIndex: ed.undoRedo?.cursor || 0,
  });

  const curUndoIndex = ed.undoRedo?.cursor || 0;
  if (local.undoIndex <= curUndoIndex) {
    local.undoIndex = curUndoIndex;
  } else {
    local.form = undefined;
  }

  if (!local.form) {
    local.form = ed.active?.pluginData?.royal?.form;
    if (!local.form) local.form = BlankForm;
  }

  useEffect(() => {
    local.form = ed.active?.pluginData?.royal?.form;
    local.render();
  }, [ed.active?.pluginData?.royal]);

  const update = useCallback(
    (value: PluginData["form"]) => {
      local.form = value;

      if (ed.undoRedo) {
        const royalForm = produce(ed.undoRedo.current, (draft) => {
          if (ed.active) {
            const found = findByID(ed.active.id, draft);
            if (found && found.content && found.content.type !== "root") {
              if (!found.content.pluginData) {
                found.content.pluginData = {};
              }
              found.content.pluginData.royal = { form: value };
            }
          }
        });
        ed.undoRedo.action("Setup Royal Form", royalForm);
      }
    },
    [
      ed.active,
      ed.undoRedo?.current,
      ed.active?.pluginData?.royal,
      local.form,
      onClose,
    ]
  );

  const fields = (
    local.form?.fields ? Object.values(local.form.fields || {}) : []
  ).sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <Form
      formID="editor-form"
      value={BlankForm}
      className={cx("flex flex-col", FormCSS)}
    >
      {({ Field }) => {
        return (
          <div
            className={cx(
              "flex flex-col items-stretch flex-1",
              css`
                .has-code {
                  border-bottom: 2px solid green;
                }

                .btn {
                  &:hover {
                    border: 1px solid #aaa;
                  }

                  svg {
                    width: 12px;
                  }
                }
              `
            )}
          >
            {local.form && (
              <>
                <EditorFormMeta
                  update={update}
                  value={local.form}
                  comp={comp}
                  page={page}
                  Field={Field}
                  config={config}
                  ed={ed}
                />

                <div className="flex relative flex-1">
                  <div className="absolute inset-0 flex flex-col items-stretch ">
                    {fields.map((e, idx) => {
                      return (
                        <FieldSingle
                          field={e}
                          Btn={comp.Btn}
                          Coditor={comp.Coditor}
                          ed={ed}
                          idx={idx}
                          key={e.name}
                          save={() => {
                            setTimeout(() => {
                              update(local.form);
                            });
                          }}
                          update={(v: FAttr | null) => {
                            if (local.form) {
                              const fields = {
                                ...local.form.fields,
                              };
                              delete fields[e.name];
                              if (v) {
                                fields[v.name] = v;
                              }
                              local.form = produce(local.form, (draft) => {
                                draft.fields = fields;
                              });
                              local.render();
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      }}
    </Form>
  );
};

const BlankForm: PluginData["form"] = {
  load: "Static JSON",
  submit: "Save To DB",
  loadExt: undefined,
  submitExt: undefined,
  onChangeExt: undefined,
  tag: "form",
  fields: {},
};
