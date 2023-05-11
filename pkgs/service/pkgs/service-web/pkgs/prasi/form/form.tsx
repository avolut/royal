import { createId } from "@paralleldrive/cuid2";
import { createElement, useCallback, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { FField, FormArg, FormGlobal, FormState, PluginData } from "./global";

import produce from "immer";
import { PageGlobal } from "../../../../../../../app/web/src/base/global/page";
import { evalPluginScript } from "../editor/plugin-script";
import "./form.css";
import { createField } from "./field";

export const w = window as unknown as {
  isEditor: boolean;
  royalFormLoad: Record<string, any>;
};

export const Form = <T extends Record<string, any>>(arg: FormArg<T>) => {
  const { className, children } = arg;

  const local = useLocal({
    id: arg._element?.id || arg.formID || createId(),
    field: null as unknown as FField,
  });
  const page = useGlobal(PageGlobal);

  const royal = arg._element?.pluginData?.royal as PluginData | undefined;
  const formGlobal = useGlobal(FormGlobal);
  const initForm = useCallback(async () => {
    const createFormState = () => {
      const lastForm = formGlobal.state[local.id];
      const form = {
        id: local.id,
        prop: { ...arg },
        value: produce(lastForm?.value || arg.value, () => {}),
        update(newValue, changedKey?: string) {
          form.value = produce(newValue, () => {});

          if (form.prop?.onChange) {
            form.prop.onChange(
              newValue,
              changedKey,
              (key, value) => {
                form.update({ ...form.value, [key]: value });
              },
              form.validate,
              form.errors
            );
          } else {
            form.validate();
          }

          form.render();
        },
        errors: new Map(),
        validate() {
          if (!this.errors) {
            this.errors = new Map();
          }
          this.errors.clear();
          for (const field of Object.values(royal?.form?.fields || {})) {
            if (field.required && !this.value[field.name]) {
              this.errors.set(field.name, `${field.name} is required.`);
            }
          }
        },
        render: local.render,
      } as FormState;
      return form;
    };

    formGlobal.state[local.id] = createFormState();

    if (royal && royal.form) {
      if (royal.form.onChangeExt) {
        await evalPluginScript({
          page,
          script: royal.form.onChangeExt,
          eval(fn: FormArg<any>["onChange"]) {
            formGlobal.state[local.id].prop.onChange = fn;
          },
          item: arg._element,
        });
      }

      if (royal.form.load === "JS Script" && royal.form.loadExt?.jsBuilt) {
        if (!w.royalFormLoad) w.royalFormLoad = {};
        if (w.isEditor && w.royalFormLoad[local.id]) {
          formGlobal.state[local.id].value = produce(
            w.royalFormLoad[local.id],
            () => {}
          );
          return;
        }

        evalPluginScript({
          page,
          script: royal.form.loadExt[royal.form.load],
          async eval(fn) {
            w.royalFormLoad[local.id] = await fn();
            if (!formGlobal.state[local.id]) {
              formGlobal.state[local.id] = createFormState();
            }
            formGlobal.state[local.id].value = produce(
              w.royalFormLoad[local.id],
              () => {}
            );
            local.render();
          },
          item: arg._element,
        });
      }
    }
  }, [local.id, arg.value, arg._element]);

  initForm();
  const form = formGlobal.state[local.id];

  useEffect(() => {
    return () => {
      delete formGlobal.state[local.id];
    };
  }, []);

  form.render = formGlobal.render;

  const submit = useCallback(
    (value: any) => {
      if (royal?.form?.submitExt) {
        if (w.isEditor) return false;

        try {
          evalPluginScript({
            page,
            script: royal?.form?.submitExt,
            async eval(fn: (value: any) => Promise<any>) {
              await fn(value);
            },
            item: arg._element,
          });
        } catch (e) {
          console.warn(e);
        }
      }
    },
    [royal?.form?.submitExt?.jsBuilt]
  );

  if (!local.field) {
    local.field = createField(local.id);
  }

  if (!form || !local.field) return null;

  return createElement(arg.tag || "form", {
    className: cx("flex flex-1 flex-col w-full h-full", className, arg),
    onSubmit: (e) => {
      e.preventDefault();
      submit(form.value);
    },
    children: children({
      Field: local.field,
      value: form.value,
      update: form.update,
      form,
    }),
  });
};
