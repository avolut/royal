import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { FC, useCallback, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { FieldAttributes } from "../global";
import { evalPluginScript } from "../../editor/plugin-script";
import { PageGlobal } from "../../../../../../../../app/web/src/base/global/page";

export type SelectItem = { label: string; value: string } | string;
export type FieldSelectArg = {
  type: "select";
  items: SelectItem[];
  load?: "Data" | "JS" | "DB";
  placeholder?: string;
  loadExt?: { data?: SelectItem[]; js?: { js: string; jsBuilt: string } };
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export type ITEM = { value: string; label: string };
export const FieldSelect: FC<FieldAttributes<FieldSelectArg>> = ({
  items,
  value,
  onChange,
  load,
  loadExt,
  _element,
  placeholder,
  onFocus,
  onBlur,
}) => {
  const local = useLocal({
    focused: false,
    items: [] as ITEM[],
    search: "",
    selected: null as null | ITEM,
    init: false,
  });
  const page = useGlobal(PageGlobal);

  const comboBoxOnChange = useCallback(
    (val: ITEM) => {
      local.search = val.value;
      if (onChange) onChange(local.search);
      local.render();
    },
    [onChange, local.search]
  );
  const init = useCallback(async () => {
    let loadItems: any[] = items || [];

    if (load === "Data") {
      loadItems = loadExt?.data || [];
    } else if (load === "JS") {
      await new Promise<void>((resolve) => {
        if (loadExt?.js) {
          evalPluginScript({
            page,
            script: loadExt.js,
            item: _element,
            async eval(fn) {
              try {
                loadItems = await fn();
              } catch (e) {}
              resolve();
            },
          });
        } else {
          resolve();
        }
      });
    }

    local.items = [];
    for (const item of loadItems) {
      if (typeof item === "object") {
        local.items.push(item);
        if (item.value === value) {
          local.selected = item;
        }
      } else if (typeof item === "string") {
        local.items.push({ label: item, value: item });

        if (item === value) {
          local.selected = local.items[local.items.length - 1];
        }
      }
    }
  }, [items, value]);

  useEffect(() => {
    if (local.init) {
      init();
    } else {
      local.init = true;
    }
  }, [init]);

  if (!local.init) {
    init();
  }

  const filteredItems =
    local.search === ""
      ? local.items
      : local.items.filter((item) =>
          (item.value + item.label)
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(local.search.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox
      as="div"
      value={!local.selected ? "" : local.selected}
      onChange={comboBoxOnChange}
      className="field-select relative flex items-stretch"
    >
      {({ open }) => (
        <>
          <Combobox.Input
            spellCheck={false}
            onFocus={(e) => {
              if (onFocus) onFocus();
              e.currentTarget.select();
              local.search = "";
              local.focused = true;
              local.render();
            }}
            placeholder={placeholder}
            onBlur={(e) => {
              if (onBlur) onBlur();
              local.focused = false;
              local.render();
            }}
            onChange={(event) => {
              local.search = event.target.value;
              local.render();
            }}
            displayValue={(item: ITEM) => {
              return item.label;
            }}
          />
          <Combobox.Button
            className={cx(
              "absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none select-btn",
              !open && "inset-x-0 justify-end"
            )}
          >
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {open && filteredItems.length > 0 && (
            <Combobox.Options className="select-list absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredItems.map((item) => (
                <Combobox.Option
                  key={item.value}
                  value={item}
                  className={({ active }) =>
                    cx(
                      "relative cursor-default select-none py-2 pl-3 pr-9",
                      active ? "bg-primary-600 text-white" : "text-gray-900"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={cx(
                          "block truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {item.label}
                      </span>

                      {selected && (
                        <span
                          className={cx(
                            "select-active-icon absolute inset-y-0 right-0 flex items-center pr-4",
                            active
                              ? "text-white"
                              : "text-primary-600 bg-white bg-opacity-90"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </>
      )}
    </Combobox>
  );
};
