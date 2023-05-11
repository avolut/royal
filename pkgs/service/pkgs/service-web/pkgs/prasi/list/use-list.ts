import { useGlobal } from "web-utils";
import { ListGlobal } from "./global";
import { ListState } from "./global";

export const useList = (id: string) => {
  const list = useGlobal(ListGlobal);

  return list.state[id] as ListState | null;
};
