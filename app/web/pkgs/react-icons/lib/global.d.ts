import React from "react";

declare global {
  type FluentIcon = React.FC<
    React.SVGAttributes<SVGElement> & {
      primaryFill?: string | undefined;
      className?: string | undefined;
      filled?: boolean | undefined;
      title?: string | undefined;
    }
  >;
}
export {};
