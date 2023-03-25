import chalk from "chalk";
import padEnd from "lodash.padend";
import { createRPC } from "rpc";
import { createService } from "service";
import { SERVICE_NAME } from "../../../src/types";
import { srv } from "./glbsrv";
import { server } from "./server";
import { srvAction } from "./action";

export const createAPIServer = async ({
  name,
  port,
  serverURL,
  cookieKey,
}: {
  name: SERVICE_NAME;
  port: number;
  serverURL?: string;
  cookieKey: string;
}) => {
  return await createService({
    name,
    mode: "single",
    init: async ({ mode }) => {
      srv.name = name;
      srv.port = port;
      srv.cookieKey = cookieKey;
      if (serverURL) {
        srv.serverURL = serverURL;
      } else {
        srv.serverURL = `http://localhost:${port}`;
      }

      await createRPC(name, srvAction);
      await srv.init();

      const running = await server({
        mode,
        port: srv.port,
        name: srv.name,
        cookieKey: srv.cookieKey,
      });

      if (typeof running === "string") {
        console.log(
          `${chalk.red("Skipped")} ${chalk.green(
            `${padEnd(srv.name, 12, " ")}`
          )} ${running}`
        );
      } else {
        srv.server = running;
        console.log(
          `${chalk.magenta("Started")} ${chalk.green(
            `${padEnd(srv.name, 12, " ")}`
          )} http://localhost:${srv.port}`
        );
      }
      return srvAction;
    },
  });
};
