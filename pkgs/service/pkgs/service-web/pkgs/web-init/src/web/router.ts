import { createRouter, RadixRouter } from "radix3";
import { Page } from "../types";

export const initRouter = () => {
  const g = (isSSR ? global : window) as unknown as {
    router: RadixRouter<Page>;
    navigate: (href: string) => void;
  };
  const router = createRouter();
  const routes = Object.values(__PAGES__);
  for (const r of routes) {
    router.insert(r.url, r);
  }

  g.router = router as any;
};
