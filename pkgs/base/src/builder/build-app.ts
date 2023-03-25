import { bundle } from "bundler";
import { dir } from "dir";
import { readAsync, writeAsync } from "fs-jetpack";

export const buildMainApp = async (app: { input: string; output: string }) => {
  await bundle({
    input: app.input,
    output: app.output,
    format: "iife",
    pkgjson: {
      input: dir.root("app/package.json"),
      output: dir.root(".output/app/package.json"),
    },
  });

  const src = await readAsync(app.output, "utf8");
  await writeAsync(
    app.output,
    `\
/*
▄▄▄         ▄· ▄▌ ▄▄▄· ▄▄▌
▀▄ █·▪     ▐█▪██▌▐█ ▀█ ██•
▐▀▀▄  ▄█▀▄ ▐█▌▐█▪▄█▀▀█ ██▪
▐█•█▌▐█▌.▐▌ ▐█▀·.▐█ ▪▐▌▐█▌▐▌
.▀  ▀ ▀█▄▀▪  ▀ •  ▀  ▀ .▀▀▀
 */
(async () => {
  const { spawn } = require("child_process");
  const { existsSync } = require("fs");
  if (!existsSync(join(process.cwd(), "node_modules"))) {
    await new Promise((resolve) => {
      const pnpm = spawn("pnpm", ["i"], { stdio: "inherit", shell: true });
      pnpm.on("exit", resolve);
    });
  }

${src}
})()`
  );
};
