import { FC, ReactElement } from "react";

export const Wrapper = (arg: { child: ReactElement }) => {
  return (
    <div
      className={cx(
        "stata-wrap flex flex-1 flex-col",
        css`
          .field {
            padding: 5px 10px;
          }
        `
      )}
    >
      {arg.child}
    </div>
  );
};
