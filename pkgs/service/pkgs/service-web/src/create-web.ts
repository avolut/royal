import chalk from "chalk";
import padEnd from "lodash.padend";
import { createRPC } from "rpc";
import { createService } from "service";
import { SERVICE_NAME } from "../../../src/types";
import { webAction } from "./action";
import { web } from "./glbweb";
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
    init: async ({ mode }) => {
      web.name = name;
      web.entry = entry;
      await web.init();

      await createRPC(name, webAction);

      web.server = await server({
        mode,
        port: port,
        name: name,
        ssrMode,
      });

      console.log(
        `${chalk.magenta("Started")} ${chalk.green(
          `${padEnd(name, 12, " ")}`
        )} http://localhost:${port}`
      );
      return webAction;
    },
  });
};
