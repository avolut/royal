import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@fluentui/react-components";
import produce from "immer";
import capitalize from "lodash.capitalize";
import React, { isValidElement, memo } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { useLocal } from "web-utils";
import { OriginalBehavior } from "../../behavior/util/original";
import {
  LayoutFieldProps,
  LayoutWrap,
  ListItem,
  StataBaseProps,
  StataBind,
  StataLayout,
} from "../../common/common";
import { flattenLayout, RenderLayout } from "../../common/layout";

import { Field } from "../../field/field";

interface StataTableProps<T> extends StataBaseProps<T> {
  wrap?: LayoutWrap<T>;
}
export const ListTable = <T extends unknown>(prop: StataTableProps<T>) => {
  const bind = prop.bind as StataBind<T>;
  const local = useLocal({});
  bind._internal.setRender("list.table", local.render);

  const flatLayout = flattenLayout(bind.layout.list);
  const search = bind.state.list.filter.simple.search;
  const len = bind.data.list.length;

  const bhv = bind._internal.behavior as OriginalBehavior<T>;

  return (
    <div
      className={cx(
        bind.className.use(
          "list.table",
          "relative list-table flex flex-1 flex-col"
        ),
        css`
          .unclickable {
            background-color: transparent !important;
            cursor: default !important;
          }
        `
      )}
    >
      <TableVirtuoso
        ref={(el) => {
          if (el) bind.state.list.virt = el;
        }}
        data={bind.data.list}
        endReached={async () => {
          bind.action.list.nextPage();
        }}
        itemContent={(idx, row) => {
          return (
            <Row
              bind={bind as any}
              layout={flatLayout}
              row={row}
              idx={idx}
              key={idx}
            />
          );
        }}
        fixedHeaderContent={() => {
          return (
            <TableRow>
              {genHeader(flatLayout).map((column) => {
                const col = column.name as any;
                const params = bind.state.list.db.params;
                let dir;
                let by;
                if (params?.orderBy) {
                  by = Object.keys(params.orderBy)[0];
                  if (by) {
                    dir = (params.orderBy as any)[by];
                  }
                }

                return (
                  <div
                    key={col}
                    className={cx(
                      column.width
                        ? css`
                            width: ${column.width}px;
                          `
                        : css`
                            flex: 1;
                          `
                    )}
                  >
                    <TableHeaderCell
                      onClick={() => {
                        if (col) bind.action.list.sort(col);
                      }}
                      sortDirection={
                        dir && by == column.name
                          ? dir === "asc"
                            ? "ascending"
                            : "descending"
                          : undefined
                      }
                      className={cx(
                        dir &&
                          by == column.name &&
                          css`
                            background: #dbe9fe;
                            &:hover {
                              background: #dbe9fe;
                            }
                          `
                      )}
                    >
                      <span>{column.title}</span>
                    </TableHeaderCell>
                  </div>
                );
              })}
            </TableRow>
          );
        }}
        components={{
          Table: (props) => (
            <Table sortable size="small" {...props} noNativeElements />
          ),
          TableHead: React.forwardRef((props, ref) => (
            <TableHeader {...props} ref={ref} className="bg-slate-100" />
          )),
          TableRow: React.forwardRef((props, ref) => {
            return (
              <TableRow
                className={bind.state.list.className.row || "cursor-pointer"}
                onClick={(e) => {
                  bhv.list.onRowClick({
                    row: props.item,
                    idx: props["data-index"],
                    event: e,
                  });
                }}
                {...props}
              />
            );
          }),
          TableBody: React.forwardRef((props, ref) => (
            <TableBody {...props} ref={ref} />
          )),

          FillerRow: ({ height }) => (
            <div
              className={cx(css`
                height: ${height}px;
              `)}
            ></div>
          ),
        }}
      ></TableVirtuoso>

      <div
        className={cx(
          "absolute inset-0 bg-white flex items-center justify-center transition-all pointer-events-none",
          bind.state.list.status !== "loading" && len === 0
            ? "opacity-80"
            : "opacity-0 "
        )}
      >
        {search ? (
          <div className="text-center">
            Pencarian "{search}"<br /> tidak ditemukan
          </div>
        ) : (
          "Data Kosong"
        )}
      </div>
      <div
        className={cx(
          "absolute inset-0 bg-white flex items-center justify-center transition-all ",
          bind.state.list.status === "loading"
            ? " opacity-80"
            : "opacity-0 pointer-events-none"
        )}
      >
        {search ? `Mencari "${search}"...` : bind.loadingEl}
      </div>
    </div>
  );
};

const Cell = <T extends unknown>(
  arg: LayoutFieldProps<T, { width?: number }>
) => {
  return (
    <div
      className={cx(
        arg.field.width
          ? css`
              width: ${arg.field.width}px;
            `
          : css`
              flex: 1;
            `
      )}
    >
      <TableCell>
        <TableCellLayout
          className={cx(css`
            .field {
              padding: 0px;
              > div {
                padding: 0px;
              }
            }
          `)}
        >
          <Field {...arg} />
        </TableCellLayout>
      </TableCell>
    </div>
  );
};

const Row = memo(
  <T extends unknown>(arg: {
    bind: StataBind<T>;
    row: any;
    idx: number;
    layout: StataLayout<T, any>;
  }) => {
    const { bind, row, idx, layout } = arg;
    const fmeta = bind.state.list.fieldMeta;
    const meta = fmeta.get(row);
    const local = useLocal({});

    if (!meta) return null;

    return (
      <RenderLayout
        bind={bind as any}
        bindLocalRender={local.render}
        idx={idx}
        layout={layout}
        Field={Cell}
        data={row}
        fieldMeta={meta}
        wrap={{
          outer({ child }) {
            return child as any;
          },
        }}
        update={(row) => {
          const meta = fmeta.get(bind.data.list[idx]);
          if (meta) {
            fmeta.delete(bind.data.list[idx]);
            const item = produce(bind.data.list[idx], (draft) => {
              for (const [k, v] of Object.entries(row)) {
                (draft as any)[k] = v;
              }
            });
            fmeta.set(item, meta);
            bind.data.list[idx] = item;
          }
          bind.render("list.table");
        }}
        owner="list.table"
      />
    );
  }
);

const genHeader = <T extends unknown>(layout: StataLayout<T, ListItem>[]) => {
  const headers = [] as { name: string; title: string; width?: number }[];
  for (const item of layout) {
    if (typeof item === "string") {
      headers.push({
        name: item,
        title: capitalize(item.replace(/[\W_]+/g, " ")),
      });
    } else if (typeof item === "object") {
      if (Array.isArray(item)) {
        headers.push({
          name: "",
          title: "",
        });
      } else if (isValidElement(item)) {
        headers.push({
          name: "",
          title: "",
        });
      } else {
        headers.push({
          name: item.name.toString() || "",
          title: item.title || "",
          width: item.width,
        });
      }
    } else {
      headers.push({
        name: "",
        title: "",
      });
    }
  }
  return headers;
};
