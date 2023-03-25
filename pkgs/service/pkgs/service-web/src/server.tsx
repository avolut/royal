import chalk from "chalk";
import { dir } from "dir";
import HyperExpress, {
  MiddlewareHandler,
  Request,
  Response,
  Router,
} from "hyper-express";
import LiveDirectory from "live-directory";
import { basename, join } from "path";
import { renderToPipeableStream } from "react-dom/server";
import { liveReloadSrc } from "./live-reload";
import { initSSR } from "./init-ssr";
import trim from "lodash.trim";
import { web } from "./glbweb";
import { dirAsync } from "fs-jetpack";
import { readdir } from "fs/promises";

export const server = async ({
  mode,
  port,
  name,
  ssrMode,
}: {
  mode: "dev" | "prod" | "staging";
  name: string;
  port: number;
  ssrMode: "render" | "stream";
}) => {
  const server = new HyperExpress.Server({
    max_body_length: 250 * 1000 * 1000,
  });

  const publicPath = join(dir.path(`${name}/public`));
  await dirAsync(publicPath);
  const live = new LiveDirectory(publicPath, {
    static: mode === "dev" ? false : true,
  });

  web.name = name;
  const stamp = Date.now();

  await initSSR();

  const serveStatic: MiddlewareHandler = (req, res, next) => {
    try {
      let url = req.path;
      const asset = live.get(decodeURI(url));
      if (asset === undefined) next();
      else {
        res.setHeader("etag", asset.etag);
        if (mode == "dev" || !asset.cached) {
          const readable = asset.stream();
          return readable.pipe(res);
        } else {
          return res.send(asset.content);
        }
      }
    } catch (e) {}
  };

  let jsFile = "";
  let cssFile = "";
  live.files.forEach((e) => {
    const file = basename(e.path);
    if (file.startsWith("index")) {
      if (file.endsWith(".js")) jsFile = file;
      if (file.endsWith(".css")) cssFile = file;
    }
  });

  const renderSSR =
    (req: Request, res: Response, code: number, ssrMode: "stream" | "render") =>
    (props: any) => {
      return new Promise<string>(async (resolve) => {
        const { App } = web.ssr;

        if (!jsFile || !cssFile) {
          live.files.forEach((e) => {
            const file = basename(e.path);
            if (file.startsWith("index")) {
              if (file.endsWith(".js")) jsFile = file;
              if (file.endsWith(".css")) cssFile = file;
            }
          });
        }

        if (!App) {
          await initSSR();
        }

        if (App) {
          const { pipe } = renderToPipeableStream(
            <App
              name={name}
              initScript={web.ssr.initScript(
                `w.__SSR_PROP__=${JSON.stringify(
                  props
                )};w.__MODE__="${mode}";w.__ETAG__="${stamp}";w.__STATUS_CODE__=${code};${
                  mode === "dev" ? liveReloadSrc : ""
                };`
              )}
              etag={stamp.toString()}
              indexCSS={cssFile}
              props={props || {}}
              res={{ pathname: req.path, params: {}, statusCode: code }}
            />,
            {
              bootstrapScripts: [`/${jsFile}`],
              onShellReady() {
                if (ssrMode === "stream") {
                  try {
                    res.setHeader("content-type", "text/html");
                    if (!res.closed) pipe(new ProxyWritable(res) as any);
                  } catch (e) {}
                }
              },
              async onAllReady() {
                let result = "";
                if (ssrMode === "render") {
                  result = await new Promise<string>((resolve) => {
                    pipe(new ProxyWritable(resolve) as any);
                  });
                }
                resolve(result);
              },
            }
          );
        }
      });
    };
  const router = new Router();
  const pushed = new Set<string>();

  if (web.ssr.handler) {
    for (const [k, onRequest] of Object.entries(web.ssr.handler)) {
      if (pushed.has(k)) continue;
      pushed.add(k);
      router.get(k, [serveStatic], async (req, res) => {
        onRequest({
          req,
          res,
          ssr: {
            stream: renderSSR(req, res, 200, "stream"),
            render: renderSSR(req, res, 200, "render"),
          },
          asset: {
            list: live,
            send: (asset) => {
              if (mode == "dev" || !asset.cached) {
                const readable = asset.stream();
                return readable.pipe(res);
              } else {
                return res.send(asset.content);
              }
            },
          },
        });
      });
    }
  }

  if (web.pages) {
    const allPages = Object.values(web.pages);
    for (const page of allPages) {
      const urlParts = page.url.split("/");
      const cleanedUrl = trim(
        urlParts
          .map((e, idx) => {
            return idx === urlParts.length - 1 &&
              (e.startsWith(":") || e === "*" || e === "**")
              ? ""
              : e;
          })
          .join("/"),
        "/"
      );
      const urls = [page.url, `/${cleanedUrl}/`, `/${cleanedUrl}`];

      for (const url of urls) {
        if (pushed.has(url)) continue;
        pushed.add(url);

        const dup = router.routes.find((e) => e.pattern === url);
        if (dup) {
          const dupPages = allPages
            .filter((e) => e.url === url)
            .map((e) => {
              return ` ➥ ${chalk.underline(e.path)}`;
            });

          if (dupPages.length > 1) {
            console.log(
              `\
  Duplicate route: ${url} in 
  ${dupPages.join("\n")}
  `
            );
          }
          continue;
        }
        router.get(url, function (req, res) {
          serveStatic(req, res, async () => {
            const result = await renderSSR(req, res, 200, ssrMode)({});
            if (ssrMode === "render") res.send(result);
          });
        });
      }
    }
  }
  const dup = router.routes.find((e) => e.pattern === "/*");
  if (!dup) {
    router.get("/*", (req, res) => {
      serveStatic(req, res, async () => {
        res.status(404);
        const result = await renderSSR(req, res, 404, ssrMode)({});
        if (ssrMode === "render") res.send(result);
      });
    });
  }
  server.use(router);

  /** live reload ws -- only in dev */
  if (mode === "dev") {
    server.ws("/*", (ws) => {
      web.ws.add(ws);

      ws.on("close", () => {
        web.ws.delete(ws);
      });
    });
  }

  server.listen(port);
  return server;
};

const dec = new TextDecoder();

class ProxyWritable extends WritableStream {
  res: ((result: string | PromiseLike<string>) => void) | Response;
  output: string;

  constructor(
    res: ((result: string | PromiseLike<string>) => void) | Response
  ) {
    super();
    this.res = res;
    this.output = "";
  }

  flush() {}

  write(buf: Uint8Array) {
    if (typeof this.res !== "function") this.res.write(buf);
    else {
      this.output += dec.decode(buf);
    }
  }

  on(event: "drain" | "error" | "close", callback: any) {
    if (typeof this.res !== "function") this.res.on(event, callback);
  }

  end() {
    if (typeof this.res !== "function") this.res.end();
    else {
      this.res(this.output);
    }
  }
}
