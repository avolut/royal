import formatDate from "date-fns/format";
import { isValidElement } from "react";
import { JSONTree } from "react-json-tree";
import { LayoutFieldProps } from "../common/common";
export const FieldView = <T extends unknown>(props: LayoutFieldProps<T>) => {
  const { data, name, field } = props;
  const value = data[name] as any;

  return (
    <div className="field-view flex items-stretch">
      <div className="label min-w-[200px]">
        {field.label || name.toString()}
      </div>
      <div className="value flex-1">
        <RenderValue {...props} />
      </div>
    </div>
  );
};

const RenderValue = <T extends unknown>(props: LayoutFieldProps<T>) => {
  const { data, name, field } = props;
  const value = data[name] as any;

  let content =
    typeof value === "object" ? (
      <JSONTree
        data={value}
        theme={jsontheme}
        shouldExpandNodeInitially={() => {
          return false;
        }}
      />
    ) : (
      value
    );

  if (
    field.type === "datetime" ||
    field.type === "date" ||
    field.type === "time"
  ) {
    let date =
      typeof value === "string" || typeof value === "number"
        ? new Date(value)
        : (value as Date);

    if (date) {
      if (field.type === "datetime") {
        content = formatDate(date, "dd MMM yyyy - H.mm");
      } else if (field.type === "date") {
        content = formatDate(date, "dd MMM yyyy");
      } else if (field.type === "time") {
        content = formatDate(date, "H.mm");
      }
    } else {
      content = "";
    }
  }

  if (isValidElement(props.children)) {
    content = props.children;
  }

  return (
    <div
      className={cx(
        css`
          ul {
            margin: 0px !important;
            li {
              padding-top: 0px !important;
            }
          }
        `,
        "relative flex flex-1 flex-wrap break-all items-center"
      )}
    >
      {content}
    </div>
  );
};

const jsontheme = {
  scheme: "google",
  author: "seth wright (http://sethawright.com)",
  base00: "transparent",
  base01: "#282a2e",
  base02: "#373b41",
  base03: "#969896",
  base04: "#b4b7b4",
  base05: "#c5c8c6",
  base06: "#e0e0e0",
  base07: "#ffffff",
  base08: "#CC342B",
  base09: "#F96A38",
  base0A: "#FBA922",
  base0B: "#198844",
  base0C: "#3971ED",
  base0D: "#3971ED",
  base0E: "#A36AC7",
  base0F: "#3971ED",
};
