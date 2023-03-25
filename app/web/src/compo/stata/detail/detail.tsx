import { useEffect } from "react";
import { useLocal } from "web-utils";
import { ActionResult } from "../action/action";
import { OriginalBehavior } from "../behavior/util/original";
import { StataBaseProps, StataBind, StataLayout } from "../common/common";
import { suggestLayout } from "../common/layout";
import { renderMode } from "../common/mode";
import { DetailAction, DetailItem } from "./type";

interface StataDetailProps<T> extends StataBaseProps<T> {
  layout?: StataLayout<T, DetailItem, DetailAction>;
  validate?: (value?: Partial<T>) => Promise<ActionResult>;
}

export const Detail = <T extends unknown>(prop: StataDetailProps<T>) => {
  const bind = prop.bind as StataBind<T> & StataBind<unknown>;
  const local = useLocal({});

  useEffect(() => {
    bind._internal.behavior.detail.onInit({ bind });
  }, [pathname]);

  bind._internal.setRender("detail", local.render);
  bind.layout.detail =
    (prop.layout as any) ||
    bind._internal.behavior.detail.suggestLayout({ bind }) ||
    suggestLayout(bind);

  if (!bind.action.detail.isReady) {
    bind.action.detail.isReady = true;
    bindActionDetail(bind, prop as any);
    bind._internal.behavior.detail.onInit({ bind });
  }

  return (
    <div
      className={bind.className.use("detail", "detail flex flex-1 flex-col")}
    >
      {bind.mode.detail
        ? renderMode(bind, (bhv) => bhv.detail.element as any, "detail")
        : bind.loadingEl}
    </div>
  );
};

const assignErrors = <T extends unknown>(bind: StataBind<T>, errors: any) => {
  for (const [k, v] of Object.entries(errors) as any) {
    bind.state.detail.errors[k] = v;
  }
};

const bindActionDetail = <T extends unknown>(
  bind: StataBind<T>,
  prop: StataDetailProps<T>
) => {
  bind.action.detail.save = async (data?: Partial<T>) => {
    let result: ActionResult = { valid: true };
    if (bind.state.detail.status === "saving") {
      result = {
        valid: false,
        reason: {
          stata:
            "Gagal memanggil onSave() lagi, status saat ini sedang 'saving'.",
        },
      };
    }

    if (!result.valid) {
      if (result.reason) console.warn(result.reason.stata);
      return result;
    }

    const bhv: OriginalBehavior<T> = bind._internal.behavior;

    return await bhv.detail.onSave({ data });
  };

  bind.action.detail.validate = async (val?: any) => {
    let result = { valid: false, reason: {} } as ActionResult;
    let errors = {} as any;
    let value: any = val;
    if (!value) {
      value = bind.data.detail;
    }

    if (prop.validate) {
      result = (await prop.validate(value)) as any;
      if (!result.valid) errors = result.reason;
      else errors = {};
    } else {
      for (const field of Object.values(bind.state.detail.fieldMeta)) {
        if (typeof value[field.name] !== "undefined") {
          if (field && field.required) {
            if (!value[field.name]) {
              errors[field.name] = `cannot be blank`;
            } else {
              errors[field.name] = ``;
            }
          }
        }
      }
    }

    if (
      Object.keys(errors).length === 0 ||
      Object.values(errors).filter((e) => !!e).length === 0
    ) {
      result.valid = true;
      delete (result as any).reason;
    } else {
      result.valid = false;
    }

    assignErrors(bind, errors);

    result = await bind._internal.behavior.detail.onValidate({
      bind,
      data: val,
      result,
    });

    return result;
  };
};
