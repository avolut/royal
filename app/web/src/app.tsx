import { Suspense } from "react";
import { SSR } from "service-web/pkgs/web-types";
import { Root, ServerScript, ServerStyle, setupEnv } from "web-init";
import { Loading } from "./compo/loading";

setupEnv();

export const App: SSR["App"] = ({
  initScript,
  name,
  props,
  res: req,
  onlyRoot,
  indexCSS,
}) => {
  const root = (
    <Root name={name} loading={<Loading />} props={props} res={req} />
  );

  if (onlyRoot) return root;

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Royal</title>
        <link rel="stylesheet" id="indexCSS" href={indexCSS} />
        {isSSR && (
          <Suspense>
            <ServerStyle />
          </Suspense>
        )}
      </head>

      <body className="flex flex-col flex-1 w-full min-h-screen">
        <div
          className={cx(
            "flex-1 flex flex-col",
            css`
              > div {
                flex: 1;
                display: flex;
                flex-direction: column;
              }
            `
          )}
          id="root"
        >
          {root}
        </div>
        <ServerScript source={initScript} />
      </body>
    </html>
  );
};
