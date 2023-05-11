import { FC } from "react";
import { FAttr, FieldAttributes } from "../../form/global";
import { PrasiEditorArg } from "web-types/prasi";
import { FieldInputArg } from "../../form/field/input";

export const FPanelInput: FC<{
  field: FieldAttributes<FieldInputArg>;
  update: (field: FieldAttributes<FieldInputArg> | null) => void;
  Btn: PrasiEditorArg["Btn"];
  save: () => void;
  Field: FC<FAttr>;
  onBlurInput: () => void;
}> = ({ Field, field, update, save, onBlurInput }) => {
  return (
    <>
      <Field type="input" name="placeholder" onBlur={onBlurInput} />
      <Field
        type="select"
        name="format"
        value={field.format || "text"}
        onChange={(val) => {
          update({ ...field, format: val as any });
          save();
        }}
        items={["text", "password", "email", "phone"]}
      />
    </>
  );
};
