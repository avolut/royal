import { useGlobal } from "web-utils";
import { FormGlobal } from "./global";
import { FormState } from "./global";

export const useForm = (id: string) => {
  const form = useGlobal(FormGlobal);

  return form.state[id] as FormState | null;
};
