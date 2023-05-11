import { PrasiEditorArg } from "web-types/prasi";
import { PluginData } from "../../form/global";
import produce from "immer";
import { findByID } from "../../../../../../../../app/web/src/compo/editor/util/find-by-id";
import { ISection } from "../../../../../../../../app/web/src/compo/editor/panel/item/section";
import { IItem } from "../../../../../../../../app/web/src/compo/editor/panel/item/item";
import { createId } from "@paralleldrive/cuid2";

export const generateList = async (
  ed: ReturnType<PrasiEditorArg["useEditor"]>
) => {
  if (ed.active) {
    const id = ed.active.id;
    const royal = ed.active.pluginData?.royal as PluginData;
    const list = royal.list;

    const jsList = `\
<RoyalList _element={_element}>
  {({ Field, Row }) => {
    return (
      <Props Column={Field} Row={Row}>
        {children}
      </Props>
    );
  }}
</RoyalList>;
`;

    ed.save.generate.adv = id;

    if (ed.undoRedo && list) {
      const row = { js: `<Row>{children}</Row>`, jsBuilt: "" };
      const col = { js: `<Column name={"[name]"}/>`, jsBuilt: "" };
      const [jsRow, jsField] = await api.compile_js([row.js, col.js]);
      row.jsBuilt = jsRow;
      col.jsBuilt = jsField;

      ed.undoRedo.action(
        "Generate List",
        produce(ed.undoRedo.current, (draft) => {
          const found = findByID(id, draft);
          if (
            found &&
            (found.content.type === "section" || found?.content.type === "item")
          ) {
            const fel = found.content;
            if (fel.type === "section" || fel.type === "item") {
              fel.adv = { ...fel.adv, js: jsList };
            }

            let frow = findRow(fel);

            if (!frow) {
              fel.childs.push({
                type: "item",
                name: "Row",
                id: createId(),
                depth: fel.depth + 1,
                childs: [],
                pluginData: { royal: { row: true } },
                adv: row,
              });
              frow = fel.childs[fel.childs.length - 1] as IItem;
            }

            if (frow && royal.list) {
              for (const fname of Object.values(royal.list.fields)) {
                const field = findColumn(fname, frow);
                const sub = {
                  '"[name]"': `"${fname}"`,
                };

                if (field) {
                  if (!field.pluginData) field.pluginData = {};
                  field.pluginData.royal = {
                    column: { name: fname },
                  };
                  field.name = `[${fname}]`;

                  field.adv = {
                    ...field.adv,
                    js: substitute(col.js, sub),
                    jsBuilt: substitute(col.jsBuilt, sub),
                  };
                } else {
                  frow.childs.push({
                    type: "item",
                    name: `[${fname}]`,
                    id: createId(),
                    depth: fel.depth + 2,
                    childs: [],
                    pluginData: { royal: { column: { name: fname } } },
                    adv: {
                      js: substitute(col.js, sub),
                      jsBuilt: substitute(col.jsBuilt, sub),
                    },
                  });
                }
              }
            }
          }
        })
      );
    }
  }
};

const findRow = (content: ISection | IItem): false | ISection | IItem => {
  if (content.pluginData && content.pluginData.royal) {
    const royal = content.pluginData.royal as PluginData;
    if (royal.row) {
      return content;
    }
  }

  for (const child of content.childs) {
    if (child.type !== "text") {
      const found = findRow(child);
      if (found) return found;
    }
  }
  return false;
};

const findColumn = (
  name: string,
  content: ISection | IItem
): false | ISection | IItem => {
  if (content.pluginData && content.pluginData.royal) {
    const royal = content.pluginData.royal as PluginData;
    if (royal.column && royal.column.name === name) {
      return content;
    }
  }

  for (const child of content.childs) {
    if (child.type !== "text") {
      const found = findColumn(name, child);
      if (found) return found;
    }
  }
  return false;
};

const substitute = (str: string, withStr: Record<string, string>) => {
  let res = str;
  for (const [k, v] of Object.entries(withStr)) {
    res = res.replaceAll(k, v);
  }
  return res;
};
