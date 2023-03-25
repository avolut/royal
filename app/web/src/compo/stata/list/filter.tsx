import { Input } from "@fluentui/react-components";
import get from "lodash.get";
import { useLocal } from "web-utils";
import { StataBaseProps, StataBind } from "../common/common";

import { IconSearch } from "../icons/search";

interface StataFilterProps<T> extends StataBaseProps<T> {
  type?: "simple";
  simple?: {
    placeholder: string;
  };
}

export const ListFilter = <T extends unknown>(prop: StataFilterProps<T>) => {
  const bind = prop.bind as StataBind<T>;
  const local = useLocal({ focus: false });
  bind._internal.setRender("list.filter", local.render);

  return (
    <div
      className={cx(
        bind.className.use(
          "list.filter",
          "list-filter flex items-stretch flex-col transition-all"
        ),
        local.focus ? "focus" : ""
      )}
    >
      <Input
        value={bind.state.list.filter.simple.search}
        contentBefore={<IconSearch className="w-4 h-4" />}
        type="search"
        spellCheck={false}
        onFocus={() => {
          local.focus = true;
          local.render();
        }}
        onBlur={() => {
          local.focus = false;
          local.render();
        }}
        placeholder={get(prop, "simple.placeholder", "Search...")}
        onChange={(_, data) => {
          bind.state.list.filter.simple.search = data.value;
          bind.action.list.simpleFilter();
        }}
      />
    </div>
  );
};
