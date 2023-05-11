import produce from "immer";
import { FC, useCallback, useEffect } from "react";
import { PrasiEditorArg } from "web-types/prasi";
import { useLocal } from "web-utils";
import { findByID } from "../../../../../../../../app/web/src/compo/editor/util/find-by-id";
import { Form } from "../../form/form";
import { PluginData } from "../../form/global";
import { FormCSS } from "../editor-css";
import { EditorListMeta } from "./editor-list";

export const EditorList: FC<{
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
    list: undefined as PluginData["list"],
    undoIndex: ed.undoRedo?.cursor || 0,
  });

  const curUndoIndex = ed.undoRedo?.cursor || 0;
  if (local.undoIndex <= curUndoIndex) {
    local.undoIndex = curUndoIndex;
  } else {
    local.list = undefined;
  }

  if (!local.list) {
    local.list = ed.active?.pluginData?.royal?.list;

    if (!local.list) local.list = BlankList;
  }

  useEffect(() => {
    local.list = ed.active?.pluginData?.royal?.list;
    local.render();
  }, [ed.active?.pluginData?.royal]);

  const update = useCallback(
    (value: PluginData["list"]) => {
      local.list = value;
      local.render();

      if (ed.undoRedo) {
        ed.undoRedo.action(
          "Setup Royal List",
          produce(ed.undoRedo.current, (draft) => {
            if (ed.active) {
              const found = findByID(ed.active.id, draft);
              if (found && found.content && found.content.type !== "root") {
                if (!found.content.pluginData) {
                  found.content.pluginData = {};
                }
                found.content.pluginData.royal = { list: value };
              }
            }
          })
        );
      }
    },
    [ed.active, ed.undoRedo?.current, ed.active?.pluginData?.royal, local.list]
  );

  return (
    <Form
      formID="editor-form"
      value={BlankList}
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
            {local.list && (
              <EditorListMeta
                update={update}
                value={local.list}
                comp={comp}
                page={page}
                config={config}
                ed={ed}
                Field={Field}
              />
            )}
          </div>
        );
      }}
    </Form>
  );
};

const BlankList: PluginData["list"] = {
  load: "DB Query",
  loadExt: undefined,
  onChangeExt: undefined,
  fields: [],
  mode: "live",
};
