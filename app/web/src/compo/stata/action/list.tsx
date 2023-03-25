import { StataBind } from "../common/common";


export const ListAction = <T extends unknown>({
  bind,
}: {
  bind: StataBind<T>;
}) => {
  const actions = bind.state.list.action;
  return (
    <div
      className={cx(
        bind.className.use(
          "list.action",
          "filter-action flex-1 justify-end flex items-stretch"
        )
      )}
    >
      {actions.map((e, idx: number) => {
        return <Fragment key={idx}>{e}</Fragment>;
      })}
    </div>
  );
};
