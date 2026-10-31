/**
 * Joins a number to its unit with a no-break space, so "100 Hz" or "0.25 ms"
 * never splits across two lines. Words such as "3 seeds" are left alone.
 * Numeric ranges such as "10.2–13.8" get a word joiner (U+2060) on both sides
 * of the en dash, so a range never breaks after or before the dash.
 */
export function keepUnits(text: string): string {
  return text
    .replace(/(\d) (ms|µs|Hz|GB|s)\b/g, "$1 $2")
    .replace(/(\d)–(\d)/g, "$1⁠–⁠$2");
}
