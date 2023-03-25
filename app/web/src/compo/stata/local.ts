import get from "lodash.get";
import { StataData } from "./common/common";

export const stata = <T extends unknown>(arg?: {
  list?: Partial<T>[];
  data?: Partial<T>;
}) => {
  return {
    _stata: true,
    mode: "",
    list: get(arg, "list", []) as T[],
    detail: get(arg, "data", {}) as T,
  } as StataData<T>;
};
