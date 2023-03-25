import get from "lodash.get";
import { ReactNode } from "react";
import { useLocal } from "web-utils";
import { MobileBar } from "./bottom/bottom-bar-mobile";
import {
  defaultStupaBind,
  defaultStupaLocal,
  StupaBind,
  StupaProp,
} from "./common/common";
import { SideMenu } from "./side/side";
export const stupa = () => {
  return { ...defaultStupaLocal };
};

export const Stupa = (prop: StupaProp & { children: ReactNode }) => {
  const local = useLocal({ bind: null as null | StupaBind });
  local.bind = generateBind(prop);

  return (
    <div
      className={cx("flex flex-1 min-h-full flex-col", get(prop, "className"))}
    >
      <SideMenu bind={local.bind} />

      <div className="flex flex-col lg:pl-64 flex-1 lg:mb-0 mb-16">
        <main className="flex-1 flex">{prop.children}</main>
      </div>
      <MobileBar bind={local.bind} />
    </div>
  );
};

const generateBind = (prop: StupaProp) => {
  const result = { ...prop } as StupaBind;
  const defbind = { ...defaultStupaBind };

  const recurse = (draft: any, target: any) => {
    for (const [k, v] of Object.entries(target)) {
      if (!draft[k]) {
        if (typeof v === "object") {
          draft[k] = {};
          recurse(draft[k], v);
        } else {
          draft[k] = v;
        }
      }
    }
  };
  recurse(result, defbind);

  return result;
};
