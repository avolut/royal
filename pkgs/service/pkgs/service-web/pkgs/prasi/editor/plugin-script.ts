import { g } from "web-init/src/types";
import { PageGlobal } from "../../../../../../../app/web/src/base/global/page";
import { IContent } from "../../../../../../../app/web/src/compo/editor/panel/item/_type";
import { PluginID } from "../prasi";
import { apiClient, dbClient } from "web-init";

export const evalPluginScript = async (arg: {
  page: typeof PageGlobal;
  script: { js: string; jsBuilt: string } | string;
  eval: (fn: any) => void;
  item?: IContent;
  fnName?: string;
}) => {
  const { page, script, item, fnName } = arg;

  const apiURL = page.plugins[PluginID].info.site_config.royal_url;
  const api: (typeof g)["api"] = !apiURL
    ? (window as any).api
    : apiClient((window as any).apiEntry, apiURL);

  const db: (typeof g)["db"] = !apiURL
    ? (window as any).db
    : dbClient("db", apiURL);

  if (typeof script === "object" ? script.jsBuilt : script) {
    const nprops: any = {};
    if (item) {
      const parentLoopID = page.propTree[item.id];
      if (parentLoopID) {
        if (item.type !== "text") {
          for (const c of item.childs) {
            page.propTree[c.id] = parentLoopID;
          }
        }
      }
      const loopProp = page.propEntry[parentLoopID];

      if (loopProp) {
        for (const [k, v] of Object.entries(loopProp)) {
          nprops[k] = v;
        }
      }
    }

    const pageProp = { ...page.siteProps, ...page.scriptProps, ...nprops };
    const keyProps = Object.keys(pageProp);
    const valProps = Object.values(pageProp);
    const fn = new Function(
      fnName || "init",
      ...keyProps,
      typeof script === "string" ? script : script.jsBuilt
    );

    await fn(arg.eval, ...valProps);
  }
};
