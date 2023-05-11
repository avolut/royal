import { FC } from "react";
import { FieldAttributes } from "../global";
import { useLocal } from "web-utils";

export type FieldInputArg = {
  type: "input";
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  format?: "text" | "password" | "email" | "phone";
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
};

export const FieldInput: FC<FieldAttributes<FieldInputArg>> = (arg) => {
  const local = useLocal({ focus: false });
  let type = arg.format || "text";

  return (
    <input
      type={type}
      spellCheck={false}
      onFocus={(e) => {
        if (arg.onFocus) arg.onFocus(e);
      }}
      onKeyDown={arg.onKeyDown}
      onBlur={(e) => {
        if (arg.onBlur) arg.onBlur(e);
      }}
      placeholder={arg.placeholder}
      value={arg.value || ""}
      onChange={(e) => {
        const value = e.currentTarget.value;
        if (arg.onChange) {
          arg.onChange(value);
        }
      }}
    />
  );
};
