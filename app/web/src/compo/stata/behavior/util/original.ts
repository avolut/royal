// do not rename this file to .tsx, it will break typings !!!

import { ReactElement } from "react";
import { ActionResult } from "../../action/action";
import { FieldMeta, StataBind, UpdateField } from "../../common/common";
import { baseBehavior, baseFunc } from "./base";
import { Wrapper } from "./wrap";

export type OriginalBehavior<T> = ReturnType<typeof originalBehavior<T>>;

export const originalBehavior = <T>(bind: StataBind<T>) => {
  return {
    ...baseBehavior("root", bind),
    wrap: baseFunc<{ child: ReactElement }, ReactElement>(Wrapper),
    detail: {
      ...baseBehavior("detail", bind),
      form: {
        ...baseBehavior("detail.form", bind),
      },
      field: {
        ...baseBehavior("detail.field", bind),
        // jika return false, akan mencegah default update
        onChange: baseFunc<
          {
            value: any;
            field: FieldMeta;
            update: UpdateField<T>;
          },
          boolean
        >(async ({ field, value }) => {
          return true;
        }),
      },
      suggestLayout: baseFunc(),
      onSave: baseFunc<{}, ActionResult>(({}) => {
        return { valid: true };
      }),
      onBack: baseFunc(),
      onValidate: baseFunc<{ data: T; result: ActionResult }, ActionResult>(
        async ({ result }) => {
          if (result.valid) {
            if (bind.state.detail.status !== "saved") {
              bind.state.detail.status = "unsaved";
            }
          } else {
            bind.state.detail.status = "save-error";
          }
          bind.render("detail");
          return result;
        }
      ),
      onLoaded: baseFunc(),
    },
    list: {
      ...baseBehavior("list", bind),
      suggestLayout: baseFunc(),
      column: {
        onClick: baseFunc<
          T,
          {
            value: any;
            field: FieldMeta;
            update: UpdateField<T>;
          }
        >(),
        onHeaderClick: baseFunc<
          T,
          {
            value: any;
            field: FieldMeta;
            update: UpdateField<T>;
          }
        >(),
        onChange: baseFunc<
          T,
          {
            value: any;
            field: FieldMeta;
            update: UpdateField<T>;
          }
        >(),
      },
      onLoaded: baseFunc(),
      onRowClick: baseFunc<{ row: T; idx: number; event?: React.MouseEvent }>(
        ({ row }) => {}
      ),
    },
    tab: {
      ...baseBehavior("tab", bind),
      onTabClick: baseFunc(),
    },
  };
};

export const extendObject = (original: any, draft: any, extend: any) => {
  for (const [k, v] of Object.entries(original)) {
    if (!extend[k]) draft[k] = v;
    if (typeof extend[k] === "object") {
      extendObject(original[k], draft[k], extend[k]);
    }
  }
};
