export const r = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
export const pick = <T,>(a: readonly T[]): T => a[r(0, a.length - 1)];
export const pad = (n: number | string, l: number) => String(n).padStart(l, '0');
export const uuid = () => crypto.randomUUID();
export const phone = (cc = '09') => cc + pad(r(0, 999999999), 9);
export const daysAgo = (max: number) => new Date(Date.now() - r(0, max) * 864e5);

const PW = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
/** Clearly-a-test password: always starts with "Qa@". */
export const password = (len: number) =>
  'Qa@' + Array.from({ length: Math.max(len - 4, 4) }, () => pick([...PW])).join('') + r(0, 9);

/** Local date-time string in a given IANA time zone (throws on unknown zone). */
export const inZone = (d: Date, tz: string, withTime: boolean) => {
  const s = new Intl.DateTimeFormat('sv-SE', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
  }).format(d);
  return withTime ? s : s.slice(0, 10);
};
