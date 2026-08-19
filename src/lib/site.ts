export const ADMIN_EMAIL = "admin@nexation.ir";

export function toEnglishDigits(value: string) {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const arabic = "٠١٢٣٤٥٦٧٨٩";

  return value
    .replace(/[۰-۹]/g, (digit) => String(persian.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabic.indexOf(digit)));
}

export function normalizeIranianPhone(value: string) {
  return toEnglishDigits(value)
    .replace(/[\s()-]/g, "")
    .replace(/^\+98/, "0")
    .replace(/^98/, "0");
}

export function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
