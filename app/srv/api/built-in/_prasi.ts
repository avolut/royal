import { dir } from "dir";
import { existsAsync, readAsync } from "fs-jetpack";
import { apiContext } from "service-srv";
import { lookup } from "mime-types";
const cache = {} as Record<string, string>;

export const _ = {
  url: "/_prasi/**",
  async api() {
    const { req, res, mode } = apiContext(this);
    res.setHeader("Access-Control-Allow-Origin", "*");

    let path = req.params._;
    if (!(await existsAsync(dir.path("srv/prasi/" + path)))) {
      const type = lookup(path);
      if (type) {
        res.setHeader("content-type", type);
      }
      path = "plugin.js";
      if (path.endsWith(".map")) {
        path = "plugin.js.map";
      }
    }

    if (mode === "dev" || typeof cache[path] === "undefined") {
      cache[path] =
        (await readAsync(dir.path("srv/prasi/" + path), "utf8")) || "";
    }

    res.send(cache[path]);

    res.end();
  },
};
