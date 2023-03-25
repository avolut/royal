import { Input } from "@fluentui/react-components";
import { useLocal } from "web-utils";
import { LayoutFieldProps } from "../common/common";
export const FieldText = <T extends unknown>(prop: LayoutFieldProps<T>) => {
  const { bind, data, name, update, field } = prop;
  const value = data[name] as any;
  const local = useLocal(
    { value: value || "", typing: false, timeout: 0 as any },
    () => {
      if (!local.typing) local.value = value;
    },
    [value]
  );

  let type: any = field.type;
  if (!["text", "password"].includes(field.type)) {
    type = "text";
  }

  const upchange = async (text: string) => {
    if (field.onChange) {
      field.onChange({ value: text, field, update });
    } else {
      if (
        await bind._internal.behavior.detail.field.onChange({
          bind,
          value: text,
          update,
          field,
        })
      ) {
        update({ [name]: text } as any);
      }
    }
    local.typing = false;
  };

  return (
    <>
      <Input
        type={type}
        spellCheck={false}
        value={local.value || ''}
        onBlur={async () => {
          if (
            await bind._internal.behavior.detail.field.onChange({
              bind,
              value: typeof value === "undefined" ? null : value,
              update,
              field,
            })
          ) {
            update({ [name]: value } as any);
          }
        }}
        onChange={(_, text) => {
          local.value = text.value;
          local.typing = true;

          clearTimeout(local.timeout);
          local.timeout = setTimeout(() => {
            upchange(local.value);
          }, 200);
          local.render();
        }}
      />
    </>
  );
};
