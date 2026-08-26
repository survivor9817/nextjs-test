export function toEnDigits(input: string | number): string | number {
  if (typeof input === "number") return input;
  return input
    .toString()
    .trim()
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
}
