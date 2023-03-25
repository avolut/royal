import chalk from "chalk";
import { dir } from "dir";
import { context } from "esbuild";
import { readAsync, writeAsync } from "fs-jetpack";
import padEnd from "lodash.padend";
import { dirname } from "path";
import { pkg } from "pkg";
import PrettyError from "pretty-error";
import { bundler } from "./global";

const pe = new PrettyError();

export const bundle = async (arg: {
  input: string;
  output: string;
  pkgjson?: { input: string; output?: string };
  tstart?: number;
  watch?: boolean;
  format?: "iife" | "cjs";
  event?: {
    onStart?: (arg: { isRebuild: boolean }) => any;
    onEnd?: (arg: { isRebuild: boolean }) => any;
  };
}): Promise<boolean> => {
  const { input, output, watch, pkgjson, tstart, event, format } = arg;

  let t0 = tstart || performance.now();
  if (!bundler.bundlers) {
    bundler.bundlers = new Set();
  }

  const printableName = chalk.cyan(
    dirname(input.substring(dir.root("").length + 1))
  );
  const tag = `Built ${padEnd(printableName, 23, " ")}`;

  return new Promise<boolean>(async (resolve) => {
    try {
      let externalJson: any = { dependencies: {} };
      if (pkgjson) {
        let json = await readAsync(pkgjson.input, "json");
        if (pkgjson.output) {
          externalJson = await pkg.extractExternal(json);
          await writeAsync(pkgjson.output, externalJson);
        }
      }
      const external = ["esbuild", ...Object.keys(externalJson.dependencies)];

      let isRebuild = false;
      const c = await context({
        entryPoints: [input],
        outfile: output,
        bundle: true,
        sourcemap: true,
        platform: "node",
        format,
        external,
        loader: {
          ".css": "text",
          ".png": "dataurl",
          ".webp": "dataurl",
          ".avif": "dataurl",
          ".mp4": "dataurl",
          ".jpg": "dataurl",
          ".jpeg": "dataurl",
          ".gif": "dataurl",
          ".svg": "dataurl",
          ".node": "dataurl",
        },
        plugins: [
          {
            name: "root",
            setup(build) {
              build.onStart(async () => {
                if (isRebuild) {
                  t0 = performance.now();
                }

                if (event && event.onStart) {
                  await event.onStart({ isRebuild });
                }
              });
              build.onEnd(async () => {
                if (event && event.onEnd) {
                  if (isRebuild) {
                    console.log(
                      `${padEnd(tag, 30, " ")} ${formatDuration(
                        performance.now() - t0
                      )}`
                    );
                  }

                  await event.onEnd({ isRebuild });
                }

                if (!isRebuild) {
                  console.log(
                    `${padEnd(tag, 30, " ")} ${formatDuration(
                      performance.now() - t0
                    )}`
                  );
                  isRebuild = true;
                  resolve(true);
                }
              });
            },
          },
        ],
      });
      bundler.bundlers.add(c);
      if (watch) {
        c.watch();
      } else {
        c.rebuild();
      }
    } catch (e: any) {
      console.log(pe.render(e));
      return false;
    }
  });
};

const formatDuration = (ms: number) => {
  if (ms > 1000) {
    return `${padEnd((ms / 1000).toFixed(3) + "", 6, " ")} s`;
  } else {
    return `${padEnd(ms.toFixed(2) + "", 6, " ")} ms`;
  }
};
