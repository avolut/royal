import { FC, useEffect } from "react";
import { PrasiEditorArg } from "web-types/prasi";
import { useGlobal, useLocal } from "web-utils";
import { w } from "../form/form";
import { FormGlobal } from "../form/global";

export const EditorCode: FC<{
  formID: string;
  value: string;
  onChange: (value: { js: string; jsBuilt: string }) => void;
  setOpen: (open: boolean) => void;
  Coditor: PrasiEditorArg["Coditor"];
  onClose: (fn: () => void) => void;
  wrap: (str: string) => string;
  type?: "js" | "json";
}> = ({ Coditor, value, setOpen, onChange, onClose, formID, wrap, type }) => {
  const local = useLocal({
    value,
  });
  const formGlobal = useGlobal(FormGlobal);

  useEffect(() => {
    local.value = value;
    local.render();
  }, [value]);

  onClose(async () => {
    console.log("closing");
    delete formGlobal.state[formID];
    if (w.royalFormLoad) delete w.royalFormLoad[formID];
    if (type !== "json") {
      const res = await api.compile_js([wrap(local.value)]);
      onChange({ js: local.value, jsBuilt: res[0] });
    } else {
      onChange({ js: local.value, jsBuilt: local.value });
    }
  });

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div
      className={cx("fixed inset-0 flex items-center justify-center")}
      onClick={() => {
        setOpen(false);
      }}
    >
      <div
        className={cx(
          "flex items-stretch justify-stretch bg-white",
          css`
            width: 80vw;
            height: 80vh;
          `
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onKeyDown={async (evt) => {
          if (evt.key === "Escape") {
            evt.stopPropagation();
            evt.preventDefault();
          }
          if (
            (evt.key === "S" || evt.key === "s") &&
            (evt.ctrlKey || evt.metaKey) &&
            !evt.shiftKey
          ) {
            const res =
              type === "json"
                ? [local.value]
                : await api.compile_js([wrap(local.value)]);
            onChange({ js: local.value, jsBuilt: res[0] });
          }
        }}
      >
        <Coditor
          value={local.value}
          onChange={async (value) => {
            local.value = value;
            local.render();
          }}
          lang={type || "js"}
        />
      </div>
    </div>
  );
};
