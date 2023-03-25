import { globalize } from "dir";
import { Server, Websocket } from "hyper-express";
import React, { FC, ReactNode } from "react";
import { connectRPC } from "rpc";
import { RPCActionResult } from "rpc/src/types";
import { srvAction } from "service-srv/src/action";
import { Page, SSR } from "web-types";
import { dbs } from "../../service-db/export";
import { dbAction } from "../../service-db/src/action";

export const web = globalize({
  name: "web",
  value: {
    name: "",
    entry: "",
    ws: new Set<Websocket>(),
    server: null as unknown as Server,
    isSSR: true,
    ssr: null as unknown as SSR,
    pages: {} as Record<string, Page>,
    layouts: {} as Record<string, FC<{ children: ReactNode }>>,
    rpc: {
      db: null as unknown as RPCActionResult<typeof dbAction> & {
        connected: boolean;
      },
      srv: null as unknown as RPCActionResult<typeof srvAction>,
    },
    cx: (...classNames: any[]) => {
      return classNames.filter((e) => e).join(" ");
    },
    React: null as unknown as typeof React,
  },
  async init() {
    web.rpc.srv = await connectRPC<typeof srvAction>("srv");
    web.rpc.db = await connectRPC<typeof dbAction>("db");
    (global as any).db = dbs(web.rpc.db);
    (global as any).isSSR = web.isSSR;
    (global as any).__PAGES__ = web.pages;
  },
});
