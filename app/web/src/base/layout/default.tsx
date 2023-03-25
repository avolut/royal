import { Button, FluentProvider, webLightTheme } from "@fluentui/react-components";
import { FC, useEffect } from "react";
import { useLocal } from "web-utils";
import { Loading } from "../../compo/loading";

const layout: FC<{ children: any }> = ({ children }) => {
  const local = useLocal({ loaded: false });

  useEffect(() => {
    if (!isSSR) {
      local.loaded = true;
      local.render();
    }
  }, []);

  if (!local.loaded) return <Loading />;

  return (
    <FluentProvider theme={webLightTheme} dir="ltr" className="border-2">
      <div className="bg-red-300">{children}</div>
    </FluentProvider>
  );
};

export default layout;
