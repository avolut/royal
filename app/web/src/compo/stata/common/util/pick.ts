export const pick = <T, K extends string>(value: K, options: Record<K, T>) => {
  return options[value];
};
