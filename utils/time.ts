export function localTimeToUtc(local: string): string {
  const day = "2020-01-01";
  const date = new Date(day + "T" + local);
  return date.toLocaleString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function utcTimeToLocal(utc: string): string {
  const day = "2020-01-01";
  const date = new Date(day + "T" + utc + "+00:00");
  return date.toLocaleString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}