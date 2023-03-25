import { createRouter } from "web-init";

const w = window as any;
export const getPrefix = () => {
  const page = __CURPAGE__;
  if (page) {
    const prefix = page.url.replace("*", "");
    return prefix;
  }
};
export const parseUrl = (pattern: string) => {
  const router = createRouter({
    routes: {
      [pattern]: true,
    },
  });
  const page = __CURPAGE__;
  if (page) {
    const prefix = page.url.replace("*", "");
    if (page.url.includes("*")) {
      const pthname = location.pathname.substring(prefix.length);

      const found = router.lookup(pthname);

      return {
        params: found?.params || {},
        page: __CURPAGE__,
        prefix,
      };
    } else {
      console.warn(
        `STATA: Gagal parse url ${page.url}, page url harus diakhiri dengan * `
      );
    }
  }

  return {
    params: {},
    page: __CURPAGE__.name,
    prefix: "",
  };
};
