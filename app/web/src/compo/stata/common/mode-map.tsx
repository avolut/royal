import { Form } from "../detail/form/form";
import { FormSummary } from "../detail/form/status";
import { List } from "../list/list";
import { ListFlat } from "../list/mode/flat";
import { Detail } from "../detail/detail";
import { ListFilter } from "../list/filter";
import { ListTable } from "../list/mode/table";
import { ListAction } from "../action/list";
import { DetailTitle } from "../detail/title";

export const StataModeMapping = () => ({
  detail: Detail,
  "detail.title": DetailTitle,
  "detail.form": Form,
  "detail.form.status": FormSummary,
  list: List,
  "list.flat": ListFlat,
  "list.action": ListAction,
  "list.table": ListTable,
  "list.filter": ListFilter,
});
