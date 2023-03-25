import { ReactElement } from "react";

export const defaultStupaLocal = {
  menu: null as null | StupaSingleMenu,
};

export type StupaLocal = typeof defaultStupaLocal;

export const defaultStupaBind = {
  logo: { src: "", url: "" },
  state: [{} as StupaLocal, () => {}],
  menu: [] as StupaMenu,
  className: "",
  user: {
    loading: false,
    name: "Guest",
    avatar: "" as string | ReactElement,
    link: {
      profile: "/profile",
      logout: "/logout",
    },
  },
  header: {
    title: "",
    back: "",
    breadcrumb: [] as StupaBreadcrumb,
  },
};

export type StupaBind = typeof defaultStupaBind;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type StupaProp = DeepPartial<StupaBind>;

type StupaBreadcrumb = StupaSingleMenu[];
export type StupaSingleMenu =
  | ReactElement
  | {
      title: string;
      url: string;
      icon:
        | {
            normal: ReactElement;
            hover: ReactElement;
          }
        | ReactElement;
      child?: StupaSingleMenu[];
    };

export type StupaMenu = StupaSingleMenu[];
