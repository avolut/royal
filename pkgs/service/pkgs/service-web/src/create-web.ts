import chalk from "chalk";
import padEnd from "lodash.padend";
import { createRPC } from "rpc";
import { createService, serviceModule } from "service";
import { SERVICE_NAME } from "../../../src/types";
import { webAction } from "./action";
import { web } from "./glb-web";
import { server } from "./server";

export const createWeb = async ({
  name,
  port,
  entry,
  ssrMode,
}: {
  name: SERVICE_NAME;
  port: number;
  entry: string;
  ssrMode: "render" | "stream";
}) => {
  return await createService({
    name,
    mode: "single",
    init: async ({ mode, onServiceReady }) => {
      onServiceReady(async () => {
        web.name = name;
        web.entry = entry; 
        web.mode = mode;
        web.ssrMode = ssrMode;
        web.module = serviceModule({ mode, name });

        await createRPC(name, webAction);

        web.server = await server({
          mode,
          port: port,
          name: name,
        });

        console.log(
          `${chalk.magenta("Started")} ${chalk.green(
            `${padEnd(name, 12, " ")}`
          )} http://localhost:${port}`
        );
      });
      return webAction;
    },
  });
};
