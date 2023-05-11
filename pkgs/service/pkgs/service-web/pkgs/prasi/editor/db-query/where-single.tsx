import { FC } from "react";
import { WhereArg } from "./where-types";
import { WhereSingleString } from "./where-single-string";

export const SingleWhere: FC<WhereArg> = (prop) => {
  const { name, type, update, where } = prop;
  const cur: any = where[name];
  let key = "";
  if (type === "string") {
    key = Object.keys(cur).filter((e) => e !== "mode")[0];
  }
  let val = cur[key];

  return (
    <div className="flex items-stretch pl-1 border-b justify-between">
      <div>{name}</div>
      <div
        className={cx(
          "flex flex-wrap items-stretch",
          css`
            .select-list {
              position: fixed;
              width: 150px;
            }
            .field {
              &:hover {
                .field-input {
                  background: #dbe9fe !important;
                }
              }
            }
            .field-input {
              border: 0px !important;
              padding: 0px !important;
              margin: 0px !important;

              input {
                width: 100px;
                background-color: transparent;
              }

              button {
                svg {
                  display: none;
                }
              }
              .field-select {
                input {
                  text-align: center;
                  width: 60px;
                }
              }
            }
          `
        )}
      >
        {type === "string" && (
          <WhereSingleString {...prop} val={val} cur={cur} idx={key} />
        )}
        <div
          className="text-red-600 cursor-pointer hover:bg-red-100  px-1 flex items-center border-l"
          onClick={() => {
            const nwhere = { ...where };
            delete nwhere[name];
            update(nwhere);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};
