import { ParsedQuery } from "../../../../../../../../app/srv/api/built-in/_parsejs";

export const queryToCode = (query: ParsedQuery, columns?: string[]): string => {
  const hasWhere =
    typeof query.where === "object" &&
    query.where &&
    Object.keys(query.where).length > 0;

  const hasSelect =
    typeof query.select === "object" &&
    query.select &&
    Object.keys(query.select).length > 0;

  return `\
db.${query.table}.findMany({
  ${[
    hasSelect
      ? `select: ${JSON.stringify(query.select || {}, null, 2)
          .split("\n")
          .join("\n  ")}`
      : false,
    hasWhere
      ? `where: ${unquote(
          JSON.stringify(
            query.where || {},
            (key, value) => {
              if (typeof value === "string") {
                return `___[${value}]___`;
              }
              return value;
            },
            2
          )
        )
          .split("\n")
          .join("\n  ")}`
      : false,
    "take:1",
  ]
    .filter((e) => e)
    .join(",\n  ")}
})`;
};

const unquote = (str: string) => {
  const parts = str.split('"___[');

  for (let i = 0; i < parts.length; i++) {
    if (i > 0) {
      const ends = parts[i].split(']___"');

      let val = JSON.parse(`"${ends[0]}"`);
      const squote = val.endsWith('"') ? "`" : "";
      const equote = val.startsWith('"') ? "`" : "";

      if (squote && equote) {
        val = val.substring(1, val.length - 1);
      }

      parts[i] = squote + val + equote + ends[1];
    }
  }

  return parts.join("");
};
