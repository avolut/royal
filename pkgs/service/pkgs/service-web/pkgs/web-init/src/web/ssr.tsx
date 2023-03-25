import { Request, Response } from "hyper-express";
import LiveDirectory from "live-directory";

export const ssr = (arg: {
  path: string;
  onRequest: (arg: {
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
}) => {
  return arg;
};
