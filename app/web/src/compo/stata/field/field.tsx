import { Label } from "@fluentui/react-components";
import { LayoutFieldProps } from "../common/common";
import { FieldMapping } from "../common/field-map";

import { FieldView } from "./view";

export const Field = <T extends unknown>(arg: LayoutFieldProps<T>): any => {
  const { owner, bind, dir, field } = arg;

  const isList = owner.includes("list");
  let mode = bind.state.detail.mode;
  if (isList) {
    mode = "view";
  }

  let justify = false;
  if (mode === "form" && dir === "row") {
    justify = true;
  }

  return (
    <div
      className={bind.className.use(
        "field",
        cx(`field flex-1 flex flex-col`, justify && `justify-end`)
      )}
    >
      {isList ? (
        <ListItemView {...arg} />
      ) : (
        <>{mode === "form" ? <FieldForm {...arg} /> : <FieldView {...arg} />}</>
      )}
    </div>
  );
};

const FieldForm = <T extends unknown>(arg: LayoutFieldProps<T>): any => {
  let name = arg.name.toLocaleString() as string;
  const { bind, field, owner } = arg;
  const error = bind.state.detail.errors[name];

  if (!field) {
    console.warn(`Field Meta is undefined when rendering ${owner}`);
    return null;
  }

  const Component = FieldMapping[field.type]
    ? FieldMapping[field.type]
    : FieldMapping["unknown"];

  if (field.label) name = field.label;

  return (
    <>
      <label>
        <Label
          as={"div" as "label"}
          className="field-label  flex-1 flex items-stretch mb-0"
          required={error ? false : field.required}
        >
          <div
            className={cx(
              "field-label-text h-[25px] flex items-center",
              error && "text-red-600"
            )}
          >
            {error ? (
              <span>
                ⚠️ <span className="capitalize">{name}</span>: {error}{" "}
              </span>
            ) : (
              <span className="capitalize">{name}</span>
            )}
          </div>
        </Label>

        <div
          className={cx(
            "h-[35px] flex-1 flex flex-col items-stretch justify-center rounded-[4px] field-container",
            error &&
              css`
                > * {
                  border-color: red !important;
                  border-radius: 3px;
                  background: #ffe4e4;
                  &::after {
                    border-color: red;
                  }
                }
              `
          )}
        >
          <Component {...arg} />
        </div>
      </label>
    </>
  );
};

const ListItemView = <T extends unknown>(arg: LayoutFieldProps<T>): any => {
  // const name = arg.name.toLocaleString() as string;
  const Display = FieldMapping["unknown"];

  return <Display {...arg} />;
};
