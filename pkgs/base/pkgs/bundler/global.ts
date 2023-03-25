import { BuildContext } from "esbuild";
import { IPty } from "utility/spawn";

export const bundler = globalThis as unknown as {
  runs: Record<string, Set<IPty>>;
  bundlers: Set<BuildContext>;
};

if (!bundler.runs) bundler.runs = {};
