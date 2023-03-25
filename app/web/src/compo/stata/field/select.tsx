import { Combobox, Option } from "@fluentui/react-components";
import { LayoutFieldProps } from "../common/common";
export const FieldSelect = <T extends unknown>(prop: LayoutFieldProps<T>) => {
  const { bind, data, name, update, field } = prop;
  const value = data[name] as any;

  return (
    <>
      <Combobox
        className={cx(
          css`
            cursor: pointer !important;
          `,
          "cursor-pointer"
        )}
        value={
          (field.itemLabel && value ? field.itemLabel(value || {}) : value) ||
          ""
        }
        onOptionSelect={async (e, select) => {
          if (
            await bind._internal.behavior.detail.field.onChange({
              bind,
              value: select.optionValue,
              update,
              field,
            })
          ) {
            console.log(select);
            update({ [name]: select.optionValue } as any);
          }
        }}
      >
        {(field.items || []).map((item) => {
          const label = field.itemLabel ? field.itemLabel(item) : item;
          return (
            <Option value={item} key={label}>
              {label}
            </Option>
          );
        })}
      </Combobox>
    </>
  );
};
