import {
  CSSAttribute,
  extractCss as GooberExtractCSS
} from "goober";
import { RadixRouter } from "radix3";
import React, { FC, ReactNode } from "react";
import { Page } from "web-types";
import { PrismaClient } from "../../../../../../../app/db/node_modules/.gen";
import type * as SRVAPI from "../../../../../../../app/gen/srv/api/srv";

export type PageResponse = {
  pathname: string;
  params: Record<string, any>;
  statusCode: number;
};

type Api = typeof SRVAPI;
type ApiName = keyof Api;

declare global {
  const extractCss: typeof GooberExtractCSS;
  const router: RadixRouter<Page>;
  const navigate: (href: string) => void;
  const __WEB_NAME__: string;
  const __ETAG__: string;
  const __SRV_URL__: string;
  const __MODE__: "dev" | "prod" | "staging";
  const __SSR_PROP__: Record<string, any>;
  const __STATUS_CODE__: number;
  const __LAYOUTS__: Record<
    string,
    | FC<{ children: ReactNode }>
    | { default: Promise<{ default: FC<{ children: ReactNode }> }> }
  >;
  let __CURPAGE__: Page;
  const css: (
    tag: CSSAttribute | TemplateStringsArray | string,
    ...props: Array<string | number | boolean | undefined | null>
  ) => string;
  const db: PrismaClient;
  const api: { [k in ApiName]: Awaited<Api[k]["handler"]>["_"]["api"] };
  const basepath: string;
  const baseurl: string;
  const serverurl: string;
  const pathname: string;
  const Fragment: typeof React.Fragment;
  const params: any;
  const cx: (...classNames: any[]) => string;
}
