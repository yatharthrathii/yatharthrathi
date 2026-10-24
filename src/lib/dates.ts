const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parse(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return { y: y ?? 0, m: m ?? 1 };
}

export function monthLabel(ym: string) {
  const { y, m } = parse(ym);
  return `${MONTHS[m - 1]} ${y}`;
}

/** Months between two year-months, counting both ends, the way LinkedIn does. */
export function monthsBetween(start: string, end: string) {
  const a = parse(start);
  const b = parse(end);
  return Math.max(1, (b.y - a.y) * 12 + (b.m - a.m) + 1);
}

export function durationLabel(months: number) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  const parts = [];
  if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
  if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
  return parts.join(" ");
}

export function currentYearMonth(now = new Date()) {
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}
