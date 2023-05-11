import { InitPrasiArg } from "web-types/prasi";

declare global {
  const initPrasiPlugin: (arg: InitPrasiArg) => void;
}
