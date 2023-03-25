import { spawnSync } from "child_process";
import { dir } from "dir";
import { existsAsync, readAsync, removeAsync, writeAsync } from "fs-jetpack";
import { spawn } from "utility/spawn";

export const commitHook = async (args: string[]) => {
  const isMainRepo = async () => {
    const conf = await readAsync(dir.root(".git/config"), "utf8");
    if (conf?.includes("url = https://github.com/avolut/royal")) {
      return true;
    }
    return false;
  };

  if (args.includes("pre-commit")) {
    if (await isMainRepo()) {
      if (!(await existsAsync(dir.root(".husky/_/husky.sh")))) {
        spawnSync("pnpm husky install", { cwd: dir.root("") });
      }

      await writeAsync(dir.root(".output/.commit"), "");
    }
    if (process.send) {
      process.send("exit");
    } else {
      process.exit();
    }
    return true;
  }

  if (args.includes("post-commit")) {
    if (await isMainRepo()) {
      if (await existsAsync(dir.root(".output/.commit"))) {
        await removeAsync(dir.root(".output/.commit"));
        await writeAsync(dir.root("pkgs/version.json"), { ts: Date.now() });

        await new Promise((resolve) => {
          spawn("git", ["add", "./pkgs/version.json"], {
            cwd: dir.root(""),
          }).onExit(resolve);
        });

        await new Promise((resolve) => {
          spawn("git", ["commit", "--amend", "-C", "HEAD", "--no-verify"], {
            cwd: dir.root(""),
          }).onExit(resolve);
        });
      }
    }

    if (process.send) {
      process.send("exit");
    } else {
      process.exit();
    }
    return true;
  }
};
