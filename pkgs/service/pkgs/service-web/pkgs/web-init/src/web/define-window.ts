import React from "react";
import { apiClient } from "./api";
import { dbClient } from "./db";
export const defineWindow = async () => {
  const w = window as any;

  const host =
      0 === location.protocol.indexOf("http") ? location.hostname : "localhost",
    scheme =
      "https:" != location.protocol || /localhost|127.0.0.1|0.0.0.0/.test(host)
        ? "http"
        : "https";

  w.serverurl = __SRV_URL__;

  const port = location.port;
  w.baseurl = scheme + "://" + host + (port ? ":" + port : "") + "/";
  w.basepath = "/";
  w.React = React;

  w.pathname = location.pathname;

  w.Fragment = React.Fragment;

  w.cx = (...classNames: any[]) => {
    const result: string[] = [];

    classNames
      .filter((e) => !!e)
      .forEach((e) => {
        if (Array.isArray(e)) {
          for (const f of e) {
            result.push(f);
          }
        } else result.push(e);
      });
    return result.join(' ');
  };

  const apiEntry = await import(
    "../../../../../../../../app/gen/srv/api/entry-args"
  );
  w.db = dbClient("db");
  w.api = apiClient((apiEntry as any)["srv"]);
  w.navigate = (href: string) => {
    let _href = href;

    if (_href.startsWith("/")) {
      if (w.basepath.length > 1) {
        _href = `${w.basepath}${_href}`;
      }
    }

    history.pushState({}, "", _href);
    if (w.rootRes) w.rootRes.pathname = href;
    w.pathname = href;

    if (w.rootRender) {
      w.rootRender();
    }
  };

  window.addEventListener("popstate", () => {
    if (w.preventPopRender) {
      w.preventPopRender = false;
      return;
    }
    if (w.rootRender) {
      w.pathname = location.pathname;
      w.rootRender();
    }
  });
};
