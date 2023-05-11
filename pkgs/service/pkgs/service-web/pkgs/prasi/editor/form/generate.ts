import produce from "immer";
import { PrasiEditorArg } from "web-types/prasi";
import { IItem } from "../../../../../../../../app/web/src/compo/editor/panel/item/item";
import { ISection } from "../../../../../../../../app/web/src/compo/editor/panel/item/section";
import { findByID } from "../../../../../../../../app/web/src/compo/editor/util/find-by-id";
import { PluginData } from "../../form/global";
import { createId } from "@paralleldrive/cuid2";
import { IText } from "../../../../../../../../app/web/src/compo/editor/panel/item/text";

export const generateForm = async (
  ed: ReturnType<PrasiEditorArg["useEditor"]>
) => {
  if (ed.active) {
    const id = ed.active.id;
    const royal = ed.active.pluginData?.royal as PluginData;
    const form = royal.form;

    const jsForm = `\
<RoyalForm tag="${form?.tag || "form"}" _element={_element}>
  {({ Field, update, value }) => {
    return (
      <Props RField={Field} update={update} value={value}>
        {children}
      </Props>
    );
  }}
</RoyalForm>;
`;
    const jsField = `\
<RField 
  name={"[name]"} 
  type={"[type]"} 
  _element={_element}
  onChange={(val) => {
    update({ 
      ...value,
      "[name]": val
    });
  }} 
  className="w-full h-full" 
/>`;
    const jsSubmit = `<button type="submit">
  {children}
</button>;
`;

    ed.save.generate.adv = id;
    const jsBuilt = await api.compile_js([jsField, jsSubmit]);
    if (ed.undoRedo && form) {
      ed.undoRedo.action(
        "Generate Form",
        produce(ed.undoRedo.current, (draft) => {
          const found = findByID(id, draft);
          if (
            found &&
            (found.content.type === "section" || found?.content.type === "item")
          ) {
            const fel = found.content;
            if (fel.type === "section" || fel.type === "item") {
              fel.adv = { ...fel.adv, js: jsForm };
            }

            for (const ffield of Object.values(form.fields)) {
              let field = findField(`[${ffield.name}]`, fel);
              const sub = {
                '"[name]"': `"${ffield.name}"`,
                '"[type]"': `"${ffield.type}"`,
              };

              if (!field) {
                field = findField(ffield.name, fel);
              }

              if (field) {
                if (!field.pluginData) field.pluginData = {};
                field.pluginData.royal = {
                  field: { name: ffield.name },
                };

                field.adv = {
                  ...field.adv,
                  js: substitute(jsField, sub),
                  jsBuilt: substitute(jsBuilt[0], sub),
                };
              } else {
                fel.childs.push({
                  type: "item",
                  name: `[${ffield.name}]`,
                  id: createId(),
                  depth: fel.depth + 1,
                  childs: [],
                  pluginData: { royal: { field: ffield } },
                  adv: {
                    js: substitute(jsField, sub),
                    jsBuilt: substitute(jsBuilt[0], sub),
                  },
                });
              }
            }

            const submit = findField(`[submit]`, fel);

            if (submit) {
              if (!submit.pluginData) submit.pluginData = {};
              submit.pluginData.royal = {
                submit: true,
              };

              console.log(JSON.stringify(submit, null, 2));
              submit.adv = {
                js: jsSubmit,
                jsBuilt: jsBuilt[1],
              };
            } else {
              fel.childs.push({
                type: "item",
                name: `[submit]`,
                id: createId(),
                depth: fel.depth + 1,
                bg: {
                  pos: "center",
                  size: "cover",
                  color: "#3f88ff",
                },
                font: {
                  size: 15,
                  color: "#ffffff",
                  height: "auto",
                },
                childs: [
                  {
                    type: "text",
                    text: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Submit ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
                    html: ` <p class="text_paragraph" dir="ltr"><span>Submit&nbsp;</span></p>`,

                    padding: {
                      b: 5,
                      l: 27,
                      r: 27,
                      t: 5,
                    },
                    depth: fel.depth + 2,
                    id: createId(),
                    name: "Submit Text",
                  },
                ],
                pluginData: { royal: { submit: true } },
                adv: {
                  css: `\
& {
  display: flex;
  cursor: pointer;
  user-select: none;

  &:hover {
    display: flex;
  }
}`,
                  js: jsSubmit,
                  jsBuilt: jsBuilt[1],
                },
              });
            }
          }
        })
      );
    }
  }
};

const findField = (
  name: string,
  content: ISection | IItem
): false | ISection | IItem | IText => {
  if (content.pluginData && content.pluginData.royal) {
    const royal = content.pluginData.royal as PluginData;
    if (royal.field && royal.field.name === name) {
      return content;
    }
  }

  for (const child of content.childs) {
    if (child.name === name) {
      return child;
    }
    if (child.type !== "text") {
      const found = findField(name, child);
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
