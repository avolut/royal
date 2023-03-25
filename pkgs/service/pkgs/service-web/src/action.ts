import { web } from "./glbweb";
import { initSSR } from "./init-ssr";

export const webAction = {
  refresh: async () => {
    await initSSR();
    web.ws.forEach((ws) => {
      ws.send("hmr");
    });
  },
  getEntry: () => {
    return web.entry;
  },
};
