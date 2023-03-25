export type DetailItem = {
  required?: boolean;
};

export type DetailAction = {
  submit: () => Promise<boolean>;
};
