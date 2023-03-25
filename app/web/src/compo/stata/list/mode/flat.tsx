import produce from "immer";
import { memo } from "react";
import { Virtuoso } from "react-virtuoso";
import { useLocal } from "web-utils";
import { OriginalBehavior } from "../../behavior/util/original";
import { LayoutWrap, StataBaseProps, StataBind } from "../../common/common";
import { RenderLayout } from "../../common/layout";
import { Field } from "../../field/field";

interface StataFlatProps<T> extends StataBaseProps<T> {
  wrap?: LayoutWrap<T>;
}
export const ListFlat = <T extends unknown>(prop: StataFlatProps<T>) => {
  const bind = prop.bind as StataBind<T>;
  const local = useLocal({});
  bind._internal.setRender("list.flat", local.render);

  const bhv = bind._internal.behavior as OriginalBehavior<T>;
  const search = bind.state.list.filter.simple.search;

  return (
    <div
      className={bind.className.use(
        "list.flat",
        "relative list-flat flex flex-1 flex-col"
      )}
    >
      <Virtuoso
        ref={(el) => {
          if (el) bind.state.list.virt = el;
        }}
        data={bind.data.list}
        endReached={async () => {
          bind.action.list.nextPage();
        }}
        itemContent={(idx, row) => {
          return (
            <div
              className={
                bind.state.list.className.row
                  ? bind.state.list.className.row
                  : cx(
                      "border-b flex flex-col items-stretch justify-center",
                      idx % 2 ? "bg-slate-50" : "",
                      "cursor-pointer"
                    )
              }
              onClick={(e) => {
                bhv.list.onRowClick({
                  row: row,
                  idx: idx,
                  event: e,
                });
              }}
            >
              <Row
                bind={bind as any}
                row={row}
                idx={idx}
                key={idx}
                deps={bind.deps}
              />
            </div>
          );
        }}
        components={{
          Footer: () => {
            const len = bind.data.list.length;
            return (
              <div
                style={{
                  padding: "2rem",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {len === 0 ? (
                  search ? (
                    <div className="text-center">
                      Pencarian "{search}"<br /> tidak ditemukan
                    </div>
                  ) : (
                    "Data Kosong"
                  )
                ) : (
                  ""
                )}
              </div>
            );
          },
        }}
      ></Virtuoso>

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

const Row = memo(
  <T extends unknown>(arg: {
    bind: StataBind<T>;
    row: any;
    idx: number;
    deps: any[];
  }) => {
    const { bind, row, idx } = arg;
    const fmeta = bind.state.list.fieldMeta;
    const meta = fmeta.get(row);
    const local = useLocal({});

    if (!meta) return null;

    return (
      <RenderLayout
        bind={bind as any}
        bindLocalRender={local.render}
        idx={idx}
        layout={bind.layout.list}
        Field={Field}
        data={row}
        fieldMeta={meta}
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
          bind.render("list.flat");
        }}
        owner="list.flat"
      />
    );
  }
);
