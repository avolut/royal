import { waitUntil } from "web-utils";
import { createFrameCors } from "./iframe-cors";

export const dbClient = (name: string, dburl?: string) => {
  return new Proxy(
    {},
    {
      get(_, table: string) {
        if (table === "_tables") {
          return () => {
            return fetchSendDb(
              name,
              {
                name,
                action: "definition",
                table: "*",
              },
              dburl
            );
          };
        }

        if (table === "_definition") {
          return (table: string) => {
            return fetchSendDb(
              name,
              {
                name,
                action: "definition",
                table,
              },
              dburl
            );
          };
        }

        if (table.startsWith("$")) {
          return (...params: any[]) => {
            return fetchSendDb(
              name,
              {
                name,
                action: "query",
                table,
                params,
              },
              dburl
            );
          };
        }

        return new Proxy(
          {},
          {
            get(_, action: string) {
              return (...params: any[]) => {
                if (table === "query") {
                  table = action;
                  action = "query";
                }
                return fetchSendDb(
                  name,
                  {
                    name,
                    action,
                    table,
                    params,
                  },
                  dburl
                );
              };
            },
          }
        );
      },
    }
  );
};

export const fetchSendDb = async (
  name: string,
  params: any,
  dburl?: string
) => {
  const w = window as any;
  let url = `/_dbs/${name}`;
  let frm: Awaited<ReturnType<typeof createFrameCors>>;

  if (params.table) {
    url += `/${params.table}`;
  }
  if (!w.frmapi) {
    w.frmapi = {};
  }

  const _base = dburl || w.serverurl;

  if (!w.frmapi[_base]) {
    w.frmapi[_base] = await createFrameCors(_base);
  }

  frm = w.frmapi[_base];

  if (!frm) {
    await waitUntil(() => {
      frm = w.frmapi[_base];
      return frm;
    });
  }

  const res: any = await frm.send(url, params, w.apiHeaders);
  if (res && res._error && res.reason) {
    throw new Error(
      res.reason +
        `\n\n when executing db.${params.table}.${
          params.action
        }(${JSON.stringify(params.params, null, 2)})\n\n`
    );
  }
  return res;
};
