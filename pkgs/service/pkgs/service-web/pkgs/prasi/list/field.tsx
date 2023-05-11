import { ReactElement, ReactNode, isValidElement } from "react";
import { LField, LFieldProp } from "./global";
import { useList } from "./use-list";

const Field: LField = function (
  this: {
    listID: string;
    idx: number;
    wrap?: IWrap;
  },
  prop
) {
  const list = useList(this.listID);
  const item = list?.value[this.idx];

  const val = item[prop.name];
  let render = val;
  if (typeof val === "object") {
    if (!isValidElement(val)) {
      render = (
        <pre
          className={cx(
            css`
              font-size: 11px;
              line-height: 0.8rem;
            `
          )}
        >
          {JSON.stringify(val, null, 2)}
        </pre>
      );
    }
  }

  if (this.wrap) {
    return this.wrap({ children: render, prop });
  }
  return <>{render}</>;
};

export const createField = (listID: string, idx: number, wrap?: IWrap) => {
  return Field.bind({ listID, idx, wrap });
};

export type IWrap = (arg: {
  children: ReactNode;
  prop: LFieldProp;
}) => ReactElement;
