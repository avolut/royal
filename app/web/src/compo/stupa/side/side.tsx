import { StupaBind } from "../common/common";
import { SideDesktop } from "./side-desktop";
// import { SideMobile } from "./side-mobile";

export const SideMenu = ({ bind }: { bind: StupaBind }) => {
  return (
    <>
      {/* <SideMobile /> */}
      <SideDesktop bind={bind} />
    </>
  );
};
