import { bundler } from "bundler/global";
import { baseGlobal } from "./action";

export const attachCleanUp = () => {
  let exiting = false;
  function exitHandler(code: any) {
    if (!exiting) {
      exiting = true;
      if (bundler.bundlers) {
        bundler.bundlers.forEach((ctx) => {
          ctx.dispose();
        });
      }

      baseGlobal.parcels.forEach((e) => e.kill(9));

      if (bundler.runs) {
        for (const runs of Object.values(bundler.runs)) {
          runs.forEach(async (run) => {
            await run.kill();
          });
        }
      }
      process.exit(code);
    }
  }

  //do something when app is closing
  process.on("exit", exitHandler);

  //catches ctrl+c event
  process.on("SIGINT", exitHandler);

  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler);
  process.on("SIGUSR2", exitHandler);

  //catches uncaught exceptions
  process.on("uncaughtException", exitHandler);
};
