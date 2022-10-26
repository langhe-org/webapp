export function timeDisplay(time: string): string {
  const day = "2020-01-01";
  const date = new Date(day + "T" + time);
  return date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function timeWithoutSeconds(time: string): string {
  const day = "2020-01-01";
  const date = new Date(day + "T" + time);
  return date.toLocaleString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function millisecondsToMinutes(milliseconds: number): number {
  return milliseconds / 60 / 1000;
}


export function minutesToMilliseconds(minutes: number): number {
  return minutes * 60 * 1000;
}
