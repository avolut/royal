import { StataBind } from "../common/common";

import { ReactNode } from "react";
import { useLocal } from "web-utils";
import { BackIcon } from "../icons/back";

export const DetailTitle = <T extends unknown>({
  bind,
}: {
  bind: StataBind<T>;
}) => {
  const titleProp = bind.state.detail.title;
  const local = useLocal({ title: "" as ReactNode });

  if (typeof titleProp === "function") {
    if (local.title !== null) {
      const res = titleProp();
      if (res instanceof Promise) {
        local.title = null;
        res.then((r) => {
          local.title = r || "";
          local.render();
        });
      } else {
        local.title = res || "";
      }
    }
  } else {
    local.title = titleProp || "";
  }

  return (
    <div className="detail-title flex items-stretch">
      {bind.state.behavior === "crud" &&
        (history.length > 1 || bind.state.crud.shouldNav === false) && (
          <div
            onClick={() => {
              if (bind.state.crud.shouldNav) {
                history.back();
              } else {
                bind.state.crud.urlParts = "";
                bind.render("root");
              }
            }}
            className="detail-back cursor-pointer flex items-stretch p-1"
          >
            <BackIcon />
          </div>
        )}
      <h1
        className="detail-title-text text-lg flex items-center cursor-pointer"
        onClick={() => {
          if (bind.state.crud.shouldNav) {
            history.back();
          } else {
            bind.state.crud.urlParts = "";
            bind.render("root");
          }
        }}
      >
        {local.title || (
          <span className="capitalize">
            {typeof bind._internal.load === "string" ? bind._internal.load : ""}
          </span>
        )}
      </h1>
    </div>
  );
};
