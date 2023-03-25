import { Spinner } from "@fluentui/react-components";
import { isValidElement } from "react";
import { StupaBind, StupaSingleMenu } from "../common/common";
import { Shimmer } from "../common/shimmer";

export const SideDesktop = ({ bind }: { bind: StupaBind }) => {
  return (
    <div className="menu-bar side-menu desktop hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
      <a href={bind.logo.url} className="flex items-center flex-shrink-0 px-6">
        <img className="w-auto h-8" src={bind.logo.src} alt="Onechat" />
      </a>
      <div className="flex flex-col flex-1 h-0 mt-6 overflow-y-auto">
        <nav className="mt-6">
          <div
            className={cx(
              css`
                .no-url {
                  border-color: transparent;
                  background: transparent !important;
                }
              `,
              "space-y-1"
            )}
          >
            {bind.menu.length === 0 && (
              <Shimmer color={"#aaa"} className="ml-5" />
            )}
            {bind.menu.map((e, idx) => {
              return <Link e={e} key={idx} />;
            })}
          </div>
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex-shrink-0 group block">
          {bind.user.loading && <Spinner />}
          {bind.user.name && (
            <div className="flex items-center">
              {bind.user.avatar ? (
                bind.user.avatar
              ) : (
                <div
                  className={cx(css`
                    /* Center the content */
                    align-items: center;
                    display: flex;
                    justify-content: center;

                    /* Colors */
                    background-color: white;
                    color: #3771c1;

                    /* Rounded border */
                    border-radius: 50%;
                    height: 2.8rem;
                    width: 2.8rem;
                    border: 3px solid #83ace5;
                  `)}
                >
                  {bind.user.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div className="ml-3">
                <p className="text-base font-medium text-gray-700 group-hover:text-gray-900 capitalize">
                  {bind.user.name}
                </p>
                <p
                  className="text-sm font-medium text-gray-500 group-hover:text-gray-700 hover:text-red-500 cursor-pointer"
                  onClick={async () => {
                    await api.logout();
                    navigate("/login");
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Link = ({ e, depth }: { e: StupaSingleMenu; depth?: number }) => {
  if (isValidElement(e)) return e;

  return (
    <>
      <a
        href={e.url}
        className={cx(
          `link-item flex items-center px-2 text-sm font-medium border-l-4 `,
          !e.url ? `no-url pt-2 -mb-2` : `py-2`,
          depth ? "py-1" : "",
          location.pathname.startsWith(e.url)
            ? "bg-white border-l-[#3771c1] text-[#3771c1]"
            : "text-gray-700  border-l-transparent hover:text-[#3771c1] hover:border-l-[#aac9f5] group"
        )}
        aria-current="page"
      >
        {depth && (
          <div
            className={cx(css`
              padding-left: ${(depth || 0) * 25}px !important;
            `)}
          ></div>
        )}

        <div
          className={cx(
            css`
              svg {
                width: 20px;
                height: 20px;
              }
            `,
            "p-1 pr-2"
          )}
        >
          {isValidElement(e.icon) ? e.icon : e.icon.normal}
        </div>
        <span>{e.title}</span>
      </a>

      {e.child &&
        e.child.map((e, idx) => {
          return (
            <div key={idx}>
              <Link e={e} depth={(depth || 0) + 1} />
            </div>
          );
        })}
    </>
  );
};
