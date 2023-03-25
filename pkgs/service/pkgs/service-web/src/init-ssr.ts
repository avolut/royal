import { initRouter } from "web-types/router";
import { web } from "./glbweb";
import { ssr } from "../pkgs/web-init/src/export";

const g = global as any;
export const initSSR = async () => {
  const srvURL = await web.rpc.srv.publicURL();

  const name = web.name;
  web.ssr = {
    App: null,
    handler: {},
    initScript: (inject: string) => {
      return `\
(() => {const w=window;w.__REACT_DEVTOOLS_GLOBAL_HOOK__={isDisabled:!0},w.__SRV_URL__="${srvURL}",w.__WEB_NAME__="${web.name}",w.isSSR=!1;${inject}})()`;
    },
  };
  g.__SSR__ = web.ssr;

  const pageImport = await import("../../../../../app/gen/web/page/entry-ssr");
  if ((pageImport as any)[name]) {
    web.pages = (pageImport as any)[name];
    await Promise.all(
      Object.entries(web.pages).map(async ([k, v]) => {
        if (v.ssr && v.component instanceof Promise) {
          const comp = await v.component;
          v.component = comp.default.component;
        }
      })
    );
    g.__PAGES__ = web.pages;
  }

  // import layouts
  const layoutImport = await import("../../../../../app/gen/web/layout/entry");
  if ((layoutImport as any)[name]) {
    const layouts = (layoutImport as any)[name];
    await Promise.all(
      Object.entries(layouts).map(async ([k, v]) => {
        web.layouts[k] = (await (v as any).default).default;
      })
    );
    g.__LAYOUTS__ = web.layouts;
  }

  // import ssr handler
  const handlerImport = await import("../../../../../app/gen/web/ssr/entry");
  if ((handlerImport as any)[name]) {
    const handler = (handlerImport as any)[name] as Record<
      string,
      [string, Promise<{ default: Parameters<typeof ssr>[0] }>]
    >;
    for (const h of Object.values(handler)) {
      const route = h[0];
      const im = await h[1];
      if (im) {
        const fn = im.default;
        web.ssr.handler[route] = fn.onRequest;
      }
    }
  }

  // import entry app
  const index = await import("../../../../../app/gen/web/entry");
  web.ssr.App = (index as any)[name];
  g.cx = web.cx;
  g.React = web.React;

  initRouter();
  return web.ssr;
};
