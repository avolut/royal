import { dir } from "dir";
import { removeAsync } from "fs-jetpack";
import { join } from "path";
import { baseGlobal } from "../action";
import { spawn } from "child_process";

export const buildPrasiPlugin = async () => {
  const entry = dir.root("pkgs/service/pkgs/service-web/pkgs/prasi/plugin.tsx");

  await removeAsync(dir.root(".output/app/srv/prasi"));
  const args = [
    join(..."node_modules/parcel/lib/bin.js".split("/")),
    baseGlobal.mode === "dev" ? "watch" : "build",
    entry,
    baseGlobal.mode === "dev" ? "--no-hmr" : "--no-optimize",
    "--dist-dir",
    dir.root(".output/app/srv/prasi"),
  ].filter((e) => e);

  const parcel = spawn("node", args, {
    cwd: dir.root(`pkgs/service/pkgs/service-web/pkgs/prasi/`),
    stdio: ["ignore", "inherit", "inherit"],
  });

  if (baseGlobal.mode === "dev") {
    baseGlobal.parcels.add(parcel);
  } else {
    await new Promise((resolve) => {
      parcel.on("exit", resolve);
    });
  }
};
