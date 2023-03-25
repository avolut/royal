import LiveDirectory from "live-directory";
import { FC } from "react";
import { Request, Response } from "hyper-express";

export type PageResponse = {
  pathname: string;
  params: Record<string, any>;
  statusCode: number;
};

export type OnRequestSSR = (arg: {
  req: Request;
  res: Response;
  ssr: {
    stream: (props?: Record<string, any>) => Promise<string>;
    render: (props?: Record<string, any>) => Promise<string>;
  };
  asset: {
    list: LiveDirectory;
    send: (
      file: Exclude<
        ReturnType<InstanceType<typeof LiveDirectory>["get"]>,
        undefined
      >
    ) => void;
  };
}) => any;

export type SSR = {
  App: FC<{
    initScript: string;
    name: string;
    props: Record<string, any>;
    res: PageResponse;
    etag: string;
    indexCSS?: string
    onlyRoot?: boolean;
  }> | null;
  handler: Record<string, OnRequestSSR>;
  initScript: (inject: string) => string;
};

export type Page = {
  name?: string;
  url: string;
  ssr?: boolean;
  layout?: string;
  path?: string;
  component:
    | FC<Record<string, any> & { res: PageResponse }>
    | PromisedComponent;
};

export type PromisedComponent = () => Promise<{
  default: { component: FC<any>; layout?: string };
}>;

declare global {
  const isSSR: boolean;
  const __SSR__: SSR;
  const __PAGES__: Record<string, Page>;
}
