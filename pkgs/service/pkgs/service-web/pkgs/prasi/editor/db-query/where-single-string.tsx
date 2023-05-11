import { FC } from "react";
import { PopCode } from "../pop-code";
import { WhereArg } from "./where-types";

export const WhereSingleString: FC<
  WhereArg & { val: string; cur: any; idx: string }
> = ({ name, Coditor, update, where, Btn, Field, val, cur, idx }) => {
  return (
    <>
      <div className="border-l flex items-stretch justify-center">
        <Btn
          tooltip={
            cur && cur.mode === `"insensitive"`
              ? "Case Insensitive"
              : "Case Sensitive (Default)"
          }
          onClick={() => {
            const nwhere = {
              ...where,
              [name]: {
                ...cur,
                mode:
                  cur && cur.mode === `"insensitive"`
                    ? `"default"`
                    : `"insensitive"`,
              },
            };
            update(nwhere);
          }}
          className={cx(
            "p-0 m-0 min-w-[25px] bg-white",
            css`
              svg {
                width: 12px;
              }
            `
          )}
        >
          <>
            {cur && cur.mode === `"insensitive"` ? (
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
                  d="M3.69 2.75a.5.5 0 01.467.32l3.21 8.32a.5.5 0 01-.933.36L5.383 9.025H2.01L.967 11.75a.5.5 0 01-.934-.358l3.19-8.32a.5.5 0 01.467-.321zm.002 1.893l1.363 3.532H2.337l1.355-3.532zm7.207.564c-1.64 0-2.89 1.479-2.89 3.403 0 2.024 1.35 3.402 2.89 3.402a3.06 3.06 0 002.255-.99v.508a.45.45 0 10.9 0V5.72a.45.45 0 00-.9 0v.503A3.01 3.01 0 0010.9 5.207zm2.255 4.591V7.302c-.39-.721-1.213-1.244-2.067-1.244-.978 0-2.052.908-2.052 2.552 0 1.543.974 2.552 2.052 2.552.883 0 1.685-.667 2.067-1.364z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
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
                  d="M1.038 9.98c-.103-.322.078-.603.362-.731.284-.129.695-.115.87.205.584 1.06 1.376 1.274 2.217 1.274 1.04 0 1.81-.466 1.81-1.274 0-.65-.385-.99-1.426-1.311l-.712-.221c-1.514-.473-2.27-1.23-2.27-2.466 0-1.659 1.387-2.769 3.354-2.769 1.674 0 2.731.648 3.195 1.624.133.278.138.602-.21.88s-.704.157-.995-.153c-.76-.811-1.238-.988-1.977-.988-1.116 0-1.709.586-1.709 1.23 0 .586.416.952 1.4 1.254l.732.227c1.55.473 2.295 1.199 2.295 2.41 0 1.601-1.28 2.92-3.513 2.92-1.595 0-3.061-.978-3.423-2.11zm10.811-1.2c-1.188-.385-1.684-.919-1.684-1.792 0-1.12.999-1.942 2.448-1.942 1.242 0 2.05.587 2.365 1.589.066.211-.019.345-.23.414-.209.068-.43.05-.51-.153-.302-.773-.886-1.133-1.638-1.133-.953 0-1.586.489-1.586 1.153 0 .535.332.834 1.233 1.128l.588.189c1.227.397 1.717.905 1.717 1.785 0 1.18-1.071 2.026-2.56 2.026-1.348 0-2.336-.763-2.572-1.708-.055-.217-.008-.307.28-.374.289-.067.371-.063.472.175.284.674.981 1.19 1.86 1.19.96 0 1.651-.547 1.651-1.264 0-.527-.287-.775-1.246-1.088l-.588-.195z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </>
        </Btn>
      </div>
      <div className="border-l">
        <Field
          name="type"
          type="select"
          label={<></>}
          value={idx}
          placeholder="Where"
          onChange={(value) => {
            let cval = val;
            if (
              ["notIn", "in"].includes(val) &&
              (!cval || (cval && cval[0] === '"'))
            ) {
              cval = `[${cval || '""'}]`;
            } else if (
              !["notIn", "in"].includes(val) &&
              (!cval || (cval && cval[0] === "["))
            ) {
              cval = "";
            }

            const nwhere = {
              ...where,
              [name]: {
                [value]: cval || `""`,
                mode: cur && cur.mode ? cur.mode : undefined,
              },
            };

            update(nwhere);
          }}
          items={[
            { value: "equals", label: "Equals" },
            { value: "contains", label: "Contains" },
            { value: "startsWith", label: "StartsWith" },
            { value: "endsWith", label: "EndsWith" },
            { value: "gt", label: ">" },
            { value: "gte", label: ">=" },
            { value: "lt", label: "<" },
            { value: "lte", label: "<=" },
            { value: "in", label: "In" },
            { value: "notIn", label: "Not In" },
          ]}
        />
      </div>
      {idx && (
        <div className="border-l w-[60px] flex items-stretch bg-white h-[20px] overflow-clip">
          <PopCode
            Coditor={Coditor}
            Btn={Btn}
            value={val || `""`}
            onChange={(val: string) => {
              const nwhere = {
                ...where,
                [name]: {
                  [idx]: val || `""`,
                  mode: cur ? cur.mode : undefined,
                },
              };
              update(nwhere);
            }}
          >
            {val && val.length > 5 ? val.substring(0, 5) + "…" : val || `""`}
          </PopCode>
        </div>
      )}
    </>
  );
};
