import { useEffect } from "react";
import { useLocal } from "web-utils";
import { OriginalBehavior } from "../behavior/util/original";
import { StataBind, StataListProps } from "../common/common";
import { suggestLayout } from "../common/layout";
import { renderMode } from "../common/mode";

export const List = <T extends unknown>(prop: StataListProps<T>) => {
  const bind = prop.bind as StataBind<T> & StataBind<unknown>;
  const bhv = bind._internal.behavior as OriginalBehavior<T>;
  const local = useLocal({});

  useEffect(() => {
    bhv.list.onInit({ bind });
  }, [pathname]);

  bind._internal.setRender("list", local.render);
  bind.layout.list =
    (prop.layout as any) ||
    bind._internal.behavior.list.suggestLayout({ bind }) ||
    suggestLayout(bind);

  if (!bind.state.list.db.params) {
    bind.state.list.db.params = {};
  }

  const params = bind.state.list.db.params;
  if (params && !params.take) {
    params.take = bind.state.list.paging.pageSize;
  }

  if (!bind.mode.list) {
    bind._internal.behavior.list.onInit({ bind });
  }

  return (
    <div
      className={bind.className.use(
        "list",
        "relative list flex flex-1 flex-col"
      )}
    >
      {bind.mode.list &&
        renderMode(bind, (bhv) => bhv.list.element as any, "list")}

      {!bind.mode.list && (
        <div className="absolute inset-0 bg-white opacity-80 flex items-center justify-center">
          {bind.loadingEl}
        </div>
      )}
    </div>
  );
};
