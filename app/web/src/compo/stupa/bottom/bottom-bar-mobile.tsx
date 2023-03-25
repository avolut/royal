import {
  Dialog,
  DialogBody,
  DialogSurface
} from "@fluentui/react-components";
import { isValidElement } from "react";
import { useLocal } from "web-utils";
import { StupaBind, StupaSingleMenu } from "../common/common";
import { Shimmer } from "../common/shimmer";

export const MobileBar = ({ bind }: { bind: StupaBind }) => {
  return (
    <div
      className={cx(
        css`
          a {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            outline: none !important;
          }
        `,
        "flex lg:hidden items-stretch justify-around border-t h-16"
      )}
    >
      {bind.menu.length === 0 && (
        <div className="flex flex-1 items-stretch  justify-center">
          <Shimmer color={"#ececeb"} />
        </div>
      )}
      {bind.menu.map((e, idx) => {
        return <Link e={e} bind={bind} key={idx} />;
      })}
    </div>
  );
};

const Link = ({ e, bind }: { e: StupaSingleMenu; bind: StupaBind }) => {
  const local = useLocal({
    popup: false,
  });
  if (isValidElement(e)) return e;

  const showLabel = bind.menu.length <= 2;
  let active = location.pathname.startsWith(e.url);
  if (e.child) {
    for (let i of e.child) {
      if (!isValidElement(i) && location.pathname.startsWith(i.url)) {
        active = true;
      }
    }
  }
  if (local.popup) active = true;

  return (
    <>
      <div
        className="menu-bar bottom-menu mobile flex flex-1 items-stretch  justify-center"
        onClick={(ev) => {
          if (e.child) {
            ev.preventDefault();
            ev.stopPropagation();
            local.popup = true;
            local.render();
          } else {
            navigate(e.url);
          }
        }}
      >
        <div
          className={
            `link-item flex self-stretch items-center px-1 py-2 text-sm font-medium border-b-4 ` +
            cx(
              active
                ? " border-b-[#3771c1] text-[#3771c1]"
                : "text-gray-700 hover:text-gray-900 border-b-transparent"
            )
          }
          aria-current="page"
        >
          <div
            className={cx(
              showLabel ? "pr-2" : "px-3",
              css`
                svg {
                  width: 20px;
                  height: 20px;
                }
              `
            )}
          >
            {isValidElement(e.icon) ? e.icon : e.icon.normal}
          </div>
          {showLabel && <span>{e.title}</span>}
        </div>
      </div>

      {e.child && (
        <Dialog
          open={local.popup}
          onOpenChange={(_, ctx) => {
            local.popup = ctx.open;
            local.render();
          }}
        >
          <DialogSurface
            backdrop={
              <div
                className={cx(
                  "absolute inset-0 transition-all",
                  css`
                    background: rgba(255, 255, 255, 0.5);
                    backdrop-filter: blur(3px);
                  `
                )}
              />
            }
            className={cx(css`
              max-width: 80vw !important;
              padding: 0px;
            `)}
          >
            <DialogBody
              className={cx(css`
                display: flex !important;
              `)}
            >
              <div className="flex flex-col flex-1 items-stretch w-full">
                {e.child.map((e, idx) => {
                  if (isValidElement(e))
                    return <Fragment key={idx}>{e}</Fragment>;
                  return (
                    <Fragment key={idx}>
                      {idx > 0 && (
                        <div className="border-b border-slate-300 "></div>
                      )}
                      <div
                        tabIndex={idx}
                        className="flex items-center justify-center outline-none space-x-2 py-4 px-5"
                        onClick={() => {
                          navigate(e.url);
                          local.popup = false;
                          local.render();
                        }}
                      >
                        <span className="pl-1">
                          <>{e.icon}</>
                        </span>
                        <span>
                          <>{e.title}</>
                        </span>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      )}
    </>
  );
};
