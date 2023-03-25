import { StataBind } from "../../common/common";

export const FormSummary = <T extends unknown>({
  bind,
  excludeFieldError,
}: {
  excludeFieldError?: boolean;
  bind: StataBind<T>;
}) => {
  const errors = { ...bind.state.detail.errors };

  if (excludeFieldError) {
    for (const k of Object.keys(bind._internal.dbdef.columns)) {
      delete errors[k];
    }

    for (const k of Object.keys(bind._internal.dbdef.rels)) {
      delete errors[k];
    }
  }
  const status = bind.state.detail.status;

  const errorArray = Object.values(errors);
  if (status.includes("error") && errorArray.length > 0) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-2"
        role="alert"
      >
        <span className="block sm:inline">
          {errorArray.map((e, idx) => {
            return <Fragment key={idx}>{e}</Fragment>;
          })}
        </span>
      </div>
    );
  }
  return null;
};
