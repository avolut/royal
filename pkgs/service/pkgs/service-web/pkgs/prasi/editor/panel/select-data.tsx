import { FC, forwardRef } from "react";
import { useLocal } from "web-utils";
import { FieldSelectArg, SelectItem } from "../../form/field/select";
import { FieldAttributes } from "../../form/global";

export const DataDialog: FC<{
  update: (field: FieldAttributes<FieldSelectArg> | null) => void;
  data: SelectItem[];
  onClose: (fn: () => void) => void;
  field: FieldAttributes<FieldSelectArg>;
}> = ({ update, data, onClose, field }) => {
  const local = useLocal(
    {
      dataMode: "value-only" as "value-only" | "value-label",
      dataFocus: { idx: -1, value: "", label: "" },
      data: [...data],
      dataNew: null as HTMLDivElement | null,
      refsValue: new Map<number, HTMLInputElement>(),
    },
    () => {
      if (data.length > 0 && typeof data[0] === "object") {
        local.dataMode = "value-label";
        local.render();
      }
    }
  );

  onClose(() => {
    update({
      ...field,
      loadExt: {
        ...field.loadExt,
        data: local.data,
      },
    });
  });

  return (
    <div
      className={cx(
        "text-xs flex-col items-stretch p-2",
        css`
          width: ${local.dataMode === "value-only" ? "300px" : "400px"};
          .input {
            border: 1px solid #cbd5e1;
            border-top: none;
            padding: 4px;
            width: 100%;
            input {
              display: flex;
              flex: 1;
              outline: none;
              border-radius: 0px;
            }
          }
        `
      )}
    >
      <div
        className={cx(
          "flex self-stretch",
          css`
            .btn {
              cursor: pointer;
              display: flex;
              padding: 3px 6px;
              flex: 1;
            }
            .btn:hover {
              background: #ececeb;
            }
            .btn.active {
              border-bottom: 2px solid green;
            }
          `
        )}
      >
        <div
          className={cx(
            "border border-slate-300 border-r-0 btn",
            local.dataMode === "value-only" && "active"
          )}
          onClick={() => {
            local.dataMode = "value-only";
            local.render();
          }}
        >
          Value Only
        </div>
        <div
          className={cx(
            "border border-slate-300 btn",
            local.dataMode === "value-label" && "active"
          )}
          onClick={() => {
            local.dataMode = "value-label";
            local.render();
          }}
        >
          Value + Label
        </div>
      </div>

      {(local.data || []).map((e, key) => {
        return (
          <DataInput
            key={key}
            value={e}
            mode={local.dataMode}
            onChangeValue={(ev) => {
              const item = local.data[key];
              if (typeof item === "object") {
                local.data[key] = {
                  label: item.label,
                  value: ev.currentTarget.value,
                };
              } else {
                local.data[key] = ev.currentTarget.value;
              }
              local.render();
            }}
            onChangeLabel={(ev) => {
              const item = local.data[key];
              if (typeof item === "object") {
                local.data[key] = {
                  value: item.value,
                  label: ev.currentTarget.value,
                };
              } else {
                local.data[key] = {
                  value: e as string,
                  label: ev.currentTarget.value,
                };
              }
              local.render();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                local.dataNew?.focus();
              }
              if (e.key === "Backspace" && e.currentTarget.value === "") {
                local.data.splice(key, 1);
                local.render();
                setTimeout(() => {
                  const input = local.refsValue.get(key);
                  if (input) input.focus();
                });
              }
            }}
            ref={(el) => {
              if (el) local.refsValue.set(key, el);
            }}
            onBlur={() => {}}
            onFocus={() => {
              local.dataFocus.idx = key;
              local.render();
            }}
          />
        );
      })}

      <DataInput
        mode={local.dataMode}
        value={local.dataFocus.idx === -1 ? local.dataFocus : ""}
        onChangeValue={(e) => {
          local.dataFocus.value = e.currentTarget.value;
          local.render();
        }}
        onChangeLabel={(e) => {
          local.dataFocus.label = e.currentTarget.value;
          local.render();
        }}
        ref={(el) => {
          if (el) {
            local.dataNew = el;
          }
        }}
        onFocus={() => {
          local.dataFocus.idx = -1;
          local.render();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        onBlur={(e, type) => {
          if (local.dataMode === "value-label" && type === "value") return;

          if (local.dataFocus.value) {
            if (local.dataMode === "value-only") {
              local.data.push(local.dataFocus.value);
            } else {
              local.data.push({
                value: local.dataFocus.value,
                label: local.dataFocus.label,
              });
            }

            local.dataFocus.value = "";
            local.dataFocus.label = "";
            local.render();
            setTimeout(() => {
              if (local.dataNew) local.dataNew.focus();
            });
          }
        }}
      />
    </div>
  );
};

const DataInput = forwardRef<
  HTMLInputElement,
  {
    value: SelectItem;
    mode: "value-only" | "value-label";
    onChangeValue: React.ChangeEventHandler<HTMLInputElement>;
    onChangeLabel: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
    onBlur: (
      e: Parameters<React.FocusEventHandler<HTMLInputElement>>[0],
      type: "value" | "label"
    ) => void;
    onFocus: React.FocusEventHandler<HTMLInputElement>;
  }
>((props, ref) => {
  const { onKeyDown, onBlur, onFocus, onChangeValue, onChangeLabel } = props;
  let value = typeof props.value === "object" ? props.value.value : props.value;
  let label = typeof props.value === "object" ? props.value.label : "";
  return (
    <div className="input flex items-stretch">
      <input
        type="text"
        spellCheck={false}
        ref={ref}
        value={value}
        placeholder="Value"
        onChange={onChangeValue}
        onKeyDown={onKeyDown}
        onBlur={(e) => {
          return onBlur(e, "value");
        }}
        onFocus={onFocus}
      />

      {props.mode === "value-label" && (
        <input
          type="text"
          spellCheck={false}
          placeholder={"Label"}
          value={label}
          onChange={onChangeLabel}
          onKeyDown={onKeyDown}
          onBlur={(e) => {
            return onBlur(e, "label");
          }}
          onFocus={onFocus}
        />
      )}
    </div>
  );
});
