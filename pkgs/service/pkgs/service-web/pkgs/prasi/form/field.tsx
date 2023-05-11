import { ReactNode, useCallback, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { PageGlobal } from "../../../../../../../app/web/src/base/global/page";
import { evalPluginScript } from "../editor/plugin-script";
import { FieldInput } from "./field/input";
import { FieldSelect } from "./field/select";
import {
  FAttr,
  FField,
  FieldAttributes,
  FieldComponent,
  PluginData,
} from "./global";
import { useForm } from "./use-form";
import { titleCase } from "../editor/form/editor-field/field-single";

const Field: FField = function (this: { formID: string }, prop) {
  const local = useLocal({
    component: null as FieldComponent | null,
    focused: false,
  });
  const page = useGlobal(PageGlobal);
  const form = useForm(this.formID);

  const onChange = useCallback(
    (fieldValue: any) => {
      const value = { ...form?.value, [prop.name]: fieldValue };
      if (prop.onChange) {
        prop.onChange(fieldValue);
      } else {
        form?.update(value, prop.name);
      }
    },
    [prop.onChange, form?.value, form?.render, form?.prop?.onChange]
  );

  let input: any = null;
  let value = null;
  if (form?.value) {
    value = form?.value[prop.name];
  }

  const jsxProp: any = { ...prop };
  const royal = form?.prop._element?.pluginData?.royal as PluginData;
  let component: FieldAttributes<any>["component"] = null;
  let formProp = {} as FAttr;

  if (royal?.form?.fields[prop.name]) {
    formProp = royal.form?.fields[prop.name];
    component = royal.form?.fields[prop.name].component;
  }

  if (prop.component) {
    component = prop.component;
  }

  const type = formProp.type || prop.type;

  if (type === "select") {
    input = (
      <FieldSelect
        value={value}
        {...jsxProp}
        {...formProp}
        _element={prop._element}
        onChange={onChange}
      />
    );
  } else {
    input = (
      <FieldInput
        value={value}
        {...jsxProp}
        {...formProp}
        _element={prop._element}
        onChange={onChange}
      />
    );
  }

  input = <div className={cx("field-input")}>{input}</div>;

  const Wrapper = useCallback(
    ({ children, className }: { children: ReactNode; className?: string }) => {
      return (
        <label
          className={cx(
            "field",
            local.focused && "focused",
            prop.className,
            className
          )}
        >
          {children}
        </label>
      );
    },
    []
  );

  const Label = useCallback(
    (arg: { children?: ReactNode }) => {
      return (
        <div className="field-label">
          {arg.children || prop.label || formProp.label || titleCase(prop.name)}
        </div>
      );
    },
    [prop.label, prop.name]
  );

  const ErrorMessage = useCallback(() => {
    return (
      <>
        {form?.errors.has(prop.name) && (
          <div className="field-error">{form?.errors.get(prop.name)}</div>
        )}
      </>
    );
  }, [form?.errors, form?.errors.size, form?.errors.get(prop.name), prop.name]);

  useEffect(() => {
    if (component) {
      if (typeof component === "object") {
        if (component.jsBuilt && form?.prop._element) {
          evalPluginScript({
            page,
            fnName: "render",
            script: component,
            eval(fn: FieldComponent) {
              local.component = fn;
              local.render();
            },
            item: prop._element,
          });
        } else {
          local.component = () => (
            <Wrapper>
              <label>
                <Label />
                {input}
              </label>
              <ErrorMessage />
            </Wrapper>
          );
          local.render();
        }
      } else {
        local.component = component;
        local.render();
      }
    }
  }, [component, typeof component === "object" ? component?.jsBuilt : null]);

  if (component) {
    let Component = null;

    if (local.component) {
      Component = local.component;
    } else {
      return null;
    }

    if (Component) {
      return (
        <Component
          Wrapper={Wrapper}
          Label={Label}
          input={input}
          ErrorMessage={ErrorMessage}
        />
      );
    }
  }

  return (
    <Wrapper>
      <Label />
      {input}
      <ErrorMessage />
    </Wrapper>
  );
};

export const createField = (formID: string) => {
  return Field.bind({ formID });
};
