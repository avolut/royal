import { Button } from "@fluentui/react-components";
import { Fragment, isValidElement, memo, ReactElement, ReactNode } from "react";
import { pages } from "../../../../types/content";
import {
  FieldMeta,
  LayoutFieldProps,
  LayoutWrap,
  StataBind,
  StataDBDef,
  StataLayout,
  UpdateField
} from "./common";
import { StataMode } from "./mode";

export const suggestLayout = <T, K extends object>(bind: StataBind<T>) => {
  const result = [];

  if (bind._internal.dbdef) {
    for (const k of Object.keys(bind._internal.dbdef.columns)) {
      let lower = k.toLowerCase();
      if (lower.endsWith("_id") || lower.startsWith("id_") || lower === "id") {
        continue;
      }
      if (result.length < 8) {
        if (k === "pass" || k === "password") {
          result.push({ name: k, type: "password" });
        } else {
          result.push(k);
        }
      }
    }
  }

  return result as StataLayout<T, K>[];
};

export type Field<T> = (
  arg: LayoutFieldProps<T> & { children?: ReactElement }
) => ReactElement;

export const RenderLayout = memo(
  <T, K extends object>(arg: {
    idxkey?: any;
    layout: StataLayout<T, K>[];
    bind: StataBind<T>;
    data: T;
    Field: Field<T>;
    fieldMeta: Record<keyof T, FieldMeta>;
    bindLocalRender: () => void;
    owner: StataMode;
    dir?: "row" | "col";
    update: UpdateField<T>;
    wrap?: LayoutWrap<T>;
    flat?: boolean;
    idx?: number;
  }) => {
    const {
      idxkey: key,
      layout,
      data,
      Field,
      wrap,
      flat,
      bind,
      fieldMeta,
      bindLocalRender: render,
      owner,
      update,
    } = arg;

    const idx = arg.idx || 0;
    const dir = arg.dir || "col";
    const layoutField = [] as ReactElement[];

    const singles = Object.entries(layout);
    for (const [key, item] of singles) {
      if (flat && Array.isArray(item)) {
        const singles = Object.entries(flatten(item));
        for (const [k, sub] of singles) {
          const single = renderSingleLayout({
            idx,
            update,
            bind,
            key: `${key}-${k}`,
            keylen: singles.length,
            render,
            owner,
            fieldMeta,
            item: sub,
            data,
            Field,
            wrap,
            dir,
          });
          if (single) layoutField.push(single);
        }
        continue;
      }

      const single = renderSingleLayout({
        idx,
        bind,
        update,
        key,
        fieldMeta,
        keylen: singles.length,
        item,
        render,
        owner,
        data,
        Field,
        wrap,
        dir,
      });

      if (single) layoutField.push(single);
    }

    const wrapper: Required<typeof wrap> = {
      outer:
        wrap?.outer ||
        (({ child, dir, idx }) => {
          return (
            <div
              className={`flex flex-1 flex-${dir} justify-between`}
              key={idx}
            >
              {child}
            </div>
          );
        }),
      content: wrap?.content || ((e) => e),
    };

    const props = {
      key,
      bind,
      data,
      idx,
      owner,
      render,
      update,
    };

    return wrapper.outer({
      ...props,
      child: layoutField.map(wrapper.content),
      dir,
    });
  }
);

const flatten = <T, K extends object>(layout: StataLayout<T, K>[]) => {
  const result = [] as StataLayout<T, K>[];
  for (const item of layout) {
    if (Array.isArray(item)) {
      for (const sub of flatten(item)) {
        result.push(sub);
      }
    }
    result.push(item);
  }
  return result;
};

const renderSingleLayout = <T, K extends object>(arg: {
  key: any;
  keylen: number;
  bind: StataBind<T>;
  item: StataLayout<T, K>;
  render: () => void;
  data: T;
  Field: Field<T>;
  update: UpdateField<T>;
  fieldMeta: Record<keyof T, FieldMeta>;
  owner: StataMode;
  dir: "col" | "row";
  wrap?: LayoutWrap<T>;
  idx: number;
  dbdef?: StataDBDef;
}): ReactElement | null => {
  const {
    item,
    data,
    Field,
    key,
    wrap,
    dir,
    idx,
    bind,
    fieldMeta,
    owner,
    render,
    update,
    keylen,
  } = arg;

  const generateFieldMeta = (name: string) => {
    let type = "unknown";
    let required = false;

    if (bind._internal.dbdef) {
      if (bind._internal.dbdef.columns[name]) {
        type = bind._internal.dbdef.columns[name].type;
        required = !bind._internal.dbdef.columns[name].nullable;
      } else if (bind._internal.dbdef.rels[name]) {
        type =
          bind._internal.dbdef.rels[name].relation ===
          "Model.BelongsToOneRelation"
            ? "belongs-to"
            : "has-many";
      }
    }

    return {
      idx: parseInt(key) || 0,
      type,
      required,
      name,
      sibCount: keylen,
    } as FieldMeta;
  };

  const props = {
    key,
    bind,
    data,
    idx,
    owner,
    render,
    update,
    dir,
  };
  const renderProps = {
    key,
    bind,
    data,
    update,
    owner,
    fieldMeta,
    layout: item as any,
    wrap: wrap as any,
    Field: Field as any,
    bindLocalRender: render,
    dir: (dir === "col" ? "row" : "col") as any,
    idx,
  };

  if (typeof item === "string") {
    fieldMeta[item] = generateFieldMeta(item);
    return <Field {...props} name={item} field={fieldMeta[item] as any} />;
  } else if (typeof item === "object") {
    if (Array.isArray(item)) {
      return <RenderLayout {...(renderProps as any)} />;
    } else {
      if (isValidElement(item)) {
        return (
          <div className="field flex-1 a" key={key}>
            {item}
          </div>
        );
      } else {
        const meta = generateFieldMeta(item.name.toString());
        for (const [k, v] of Object.entries(item)) {
          (meta as any)[k] = v;
        }

        fieldMeta[item.name] = meta;

        if (item.children) {
          const child = item.children({
            idx,
            row: data,
            update,
            Field: (arg) => {
              return (
                <Field
                  {...props}
                  name={item.name}
                  field={meta as any}
                  {...arg}
                />
              );
            },
            field: meta as any,
            viewDetail: () => {
              const url = __CURPAGE__.url;
              const pk = bind._internal.dbdef.pk[0];
              const shouldNav = bind.state.crud.shouldNav;
              const base = getBaseUrl(url);
              if (base && data[pk]) {
                if (shouldNav) {
                  navigate(base + encodeURIComponent((data as any)[pk]));
                } else {
                  bind.state.crud.urlParts = (data as any)[pk];
                  bind.render("root");
                }
              }
            },
            Submit: generateSubmit(bind),
            layout: () => {
              return <RenderLayout {...(renderProps as any)} />;
            },
          });

          if (isValidElement(child)) {
            return <Fragment key={key}>{child}</Fragment>;
          }
        }

        return <Field {...props} name={item.name} field={meta as any} />;
      }
    }
  } else if (typeof item === "function") {
    const res = item({
      idx,
      row: data,
      update,
      viewDetail: () => {
        const url = __CURPAGE__.url;
        const pk = bind._internal.dbdef.pk[0];
        const shouldNav = bind.state.crud.shouldNav;
        const base = getBaseUrl(url);
        if (base && data[pk]) {
          if (shouldNav) {
            navigate(base + encodeURIComponent((data as any)[pk]));
          } else {
            bind.state.crud.urlParts = (data as any)[pk];
            bind.render("root");
          }
        }
      },
      Submit: generateSubmit(bind),
      layout: (layout) => {
        return <RenderLayout {...(renderProps as any)} layout={layout} />;
      },
    });

    if (isValidElement(res)) {
      return (
        <div className="field flex-1 c" key={key}>
          {res}
        </div>
      );
    }
  }
  return null;
};

const generateSubmit = <T,>(bind: StataBind<T>) => {
  return ({
    children,
    className,
  }: {
    children?: ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cx("flex-1 flex flex-col items-stretch", className)}>
        <Button type="submit" appearance="primary">
          {children ? children : "Save"}
        </Button>
      </div>
    );
  };
};

export const flattenLayout = <T, K extends object>(
  layout: StataLayout<T, K>[]
) => {
  const items: Exclude<StataLayout<T, K>, StataLayout<T, K>[]>[] = [];
  for (const [k, v] of Object.entries(layout) as any) {
    if (Array.isArray(v)) {
      const flat = flattenLayout(v);
      for (let f of flat) {
        items.push(f);
      }
    } else {
      items.push(v);
    }
  }
  return items;
};

const getBaseUrl = (url: string) => {
  if (url.endsWith("**")) {
    return url.substring(0, url.length - 2);
  }

  if (url.endsWith("*")) {
    return url.substring(0, url.length - 1);
  }
  return url;
};
