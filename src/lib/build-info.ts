/** Evaluated once when the static export is built. */
export const buildDate = new Date().toISOString().slice(0, 10);
export const buildYear = buildDate.slice(0, 4);
