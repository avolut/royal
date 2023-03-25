import { isValidElement, ReactElement } from "react";
import { baseBehavior, StataModeProps } from "../behavior/util/base";
import { StataBehavior, StataBind } from "./common";
import { StataModeMapping } from "./mode-map";

export type StataBasicMode = "list" | "detail" | "tab";

export type StataListMode =
  | "list"
  | "list.title"
  | "list.filter"
  | "list.table"
  | "list.grid"
  | "list.flat"
  | "list.action"
  | "list.paging";

export type StataDetailMode =
  | "detail"
  | "detail.title"
  | "detail.toolbar"
  | "detail.breadcrumb"
  | "detail.form.status"
  | "detail.form"
  | "detail.field"
  | "detail.view";

export type StataTabMode = "tab.bar" | "tab.content";

export type StataExtraMode = StataListMode | StataDetailMode | StataTabMode;

export type StataMode = StataBasicMode | StataExtraMode | "root";

export type StataObjectMode = {
  mode: StataMode;
  size?: number;
  params?: Record<string, string>;
};

export type StataAllMode =
  | StataMode
  | StataObjectMode
  | ReactElement
  | ((renderMode: (mode: StataAllMode) => ReactElement) => ReactElement)
  | StataAllMode[];

export const renderMode = <T extends unknown>(
  bind: StataBind<T> & StataBind<unknown>,
  elfn: (fn: StataBehavior<T>) => ReturnType<typeof baseBehavior>["element"],
  currentMode: StataMode
) => {
  const el = elfn(bind._internal.behavior);
  const element = el({ bind }) as StataModeProps;

  for (const [k, comp] of Object.entries(StataModeMapping())) {
    if (!(element as any)[k]) {
      const Component = comp as any;
      (element as any)[k] = <Component bind={bind} />;
    }
  }

  if (!bind.mode[currentMode]) {
    console.warn(`Mode untuk stata.${currentMode} belum di set.`);
  }

  return recurseMode(element, bind.mode[currentMode], bind);
};

export const recurseMode = <T extends unknown>(
  el: StataModeProps,
  mode: StataAllMode,
  bind: StataBind<T>
): ReactElement => {
  let basic: StataMode = mode as any;
  if (typeof mode === "object") {
    if (Array.isArray(mode)) {
      const allmode: StataAllMode[] = mode;
      return (
        <>
          {allmode.map((e, idx) => {
            if (typeof e === "string") {
              return <Fragment key={idx}>{el[e]}</Fragment>;
            } else if (typeof e === "function") {
              return (
                <Fragment key={idx}>
                  {e((rmode) => {
                    return recurseMode(el, rmode, bind);
                  })}
                </Fragment>
              );
            } else {
              if (!Array.isArray(e)) {
                return (
                  <Fragment key={idx}>
                    {isValidElement(e) ? e : el[e.mode]}
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={idx}>{recurseMode(el, e, bind)}</Fragment>
                );
              }
            }
          })}
        </>
      );
    }
    if (isValidElement(mode)) return mode;
    return el[mode.mode];
  }

  if (typeof basic === "string") {
    return el[basic];
  }
  return <></>;
};
