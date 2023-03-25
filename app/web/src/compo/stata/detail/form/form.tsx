import produce from "immer";
import { useLocal } from "web-utils";
import { StataBaseProps, StataBind } from "../../common/common";
import { RenderLayout } from "../../common/layout";
import { Field } from "../../field/field";

interface StataFormProps<T> extends StataBaseProps<T> {}

export const Form = <T extends unknown>(
  prop: StataFormProps<T> & StataFormProps<unknown>
) => {
  const bind = prop.bind as StataBind<T> & StataBind<unknown>;
  const local = useLocal({});
  bind._internal.setRender("detail.form", local.render);

  return (
    <form
      className={bind.className.use(
        "detail.form",
        "detail-form flex flex-1 flex-col"
      )}
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        bind.data.detail = produce(bind.data.detail, (draft) => {
          const data = draft as any;
          for (const key of Object.keys(bind.state.detail.fieldMeta)) {
            if (typeof data[key] === "undefined") {
              data[key] = null;
            }
          }
        });

        const v = await bind.action.detail.validate();
        if (v.valid) {
          await bind.action.detail.save();
        } else {
          bind.state.detail.status = "save-error";
          bind.render("detail");
        }
      }}
    >
      <RenderLayout
        update={(row) => {
          bind.data.detail = produce(bind.data.detail, (draft) => {
            for (const [k, v] of Object.entries(row)) {
              (draft as any)[k] = v;
            }
          });
          bind.render("detail.form");
        }}
        bindLocalRender={local.render}
        bind={bind}
        layout={bind.layout.detail}
        data={bind.data.detail}
        Field={Field}
        fieldMeta={bind.state.detail.fieldMeta}
        owner="detail.form"
        wrap={{
          outer({ key, dir, child }) {
            return (
              <div
                key={key}
                className={bind.className.use(
                  `field-${dir}`,
                  `field-${dir} flex flex-${dir}`
                )}
              >
                {child}
              </div>
            );
          },
        }}
      />
    </form>
  );
};
